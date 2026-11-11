#!/usr/bin/env python3
"""Refresh QBench's non-index Hugging Face official benchmark feed."""
from __future__ import annotations

import datetime as dt
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "data" / "external-benchmarks.json"
HF_API = "https://huggingface.co/api"
USER_AGENT = "QBench-Daily-Benchmark-Sync/1.0 (+https://github.com/nden14800/qbench)"
TODAY = dt.datetime.now(dt.timezone.utc).date().isoformat()


def get_json(url: str):
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT, "Accept": "application/json"})
    with urllib.request.urlopen(request, timeout=45) as response:
        return json.loads(response.read().decode("utf-8"))


def slug(value: str) -> str:
    value = value.lower().replace("/", "-")
    return re.sub(r"[^a-z0-9-]+", "-", value).strip("-")


def short_description(value: str, limit: int = 420) -> str:
    value = re.sub(r"\s+", " ", value or "").strip()
    return value[:limit].rstrip()


def main() -> int:
    data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    if not isinstance(data.get("benchmarks"), list) or not isinstance(data.get("benchmarkCatalog"), list):
        raise ValueError("Unexpected QBench data schema")

    datasets = get_json(f"{HF_API}/datasets?filter=benchmark%3Aofficial&limit=1000")
    if not isinstance(datasets, list):
        raise ValueError("Hugging Face official benchmark registry did not return a list")

    by_source = {item.get("source"): item for item in data["benchmarks"] if item.get("source")}
    catalog_by_source = {item.get("source"): item for item in data["benchmarkCatalog"] if item.get("source")}
    updated = 0
    added = 0
    leaderboard_rows = 0
    failures = []

    for ds in datasets:
        dataset_id = ds.get("id")
        if not dataset_id or ds.get("private") or ds.get("disabled"):
            continue
        dataset_url = f"https://huggingface.co/datasets/{dataset_id}"
        leaderboard_url = f"{HF_API}/datasets/{urllib.parse.quote(dataset_id, safe='/')}/leaderboard"
        last_modified = (ds.get("lastModified") or TODAY)[:10]
        tags = ds.get("tags") or []
        description = short_description(ds.get("description", ""))
        try:
            board = get_json(leaderboard_url)
            if not isinstance(board, list):
                board = []
        except (urllib.error.URLError, TimeoutError, ValueError) as exc:
            board = []
            failures.append(f"{dataset_id}: {type(exc).__name__}")
        rows = []
        for entry in board:
            model_id = entry.get("modelId") or entry.get("model_id")
            score = entry.get("value")
            if not model_id or not isinstance(score, (int, float)) or isinstance(score, bool):
                continue
            author = entry.get("author") or {}
            provider = author.get("fullname") or author.get("name") or model_id.split("/", 1)[0]
            source_info = entry.get("source") or {}
            row = {
                "model": model_id,
                "provider": provider,
                "score": score,
                "rank": entry.get("rank"),
                "verified": bool(entry.get("verified", False)),
                "configuration": "Not reported",
                "harness": entry.get("filename") or "Hugging Face .eval_results submission",
                "source": source_info.get("url") or f"https://huggingface.co/{model_id}",
                "sourceType": "official-huggingface-leaderboard",
                "snapshotDate": last_modified,
                "evidence": f"Hugging Face official benchmark leaderboard API; dataset={dataset_id}; verified={str(bool(entry.get('verified', False))).lower()}.",
                "lowerIsBetter": bool(entry.get("lower_is_better", False)),
            }
            if entry.get("filename"):
                row["resultFile"] = entry["filename"]
            if entry.get("pullRequest") is not None:
                row["pullRequest"] = entry["pullRequest"]
            if entry.get("num_parameters") is not None:
                row["parameters"] = entry["num_parameters"]
            if entry.get("notes"):
                row["notes"] = short_description(entry["notes"], 240)
            rows.append(row)
        leaderboard_rows += len(rows)

        # Reuse an existing empty research candidate only when its source URL matches exactly.
        record = by_source.get(dataset_url)
        if record is None:
            record_id = f"hf-official-{slug(dataset_id)}"
            record = next((x for x in data["benchmarks"] if x.get("id") == record_id), None)
        else:
            record_id = record.get("id")
        if record is None:
            record_id = f"hf-official-{slug(dataset_id)}"
            record = {
                "id": record_id,
                "name": f"Hugging Face · {dataset_id}",
                "domain": next((t.split(":", 1)[1] for t in tags if t.startswith("modality:")), "General"),
                "version": "Hugging Face official registry",
                "source": dataset_url,
                "unit": "Publisher-defined score; see source leaderboard",
                "models": [],
                "indexEligible": False,
            }
            data["benchmarks"].append(record)
            added += 1
        record["snapshotDate"] = TODAY
        record["datasetLastModified"] = ds.get("lastModified")
        record["source"] = dataset_url
        record["models"] = rows
        record["indexEligible"] = False
        record["hfDatasetId"] = dataset_id
        record["hfLastModified"] = ds.get("lastModified")
        record["hfLeaderboardApi"] = leaderboard_url
        record["quality"] = (
            "Scores synchronized from Hugging Face's official benchmark leaderboard API. "
            "Model IDs, publisher values, rank, verification flag and result-file metadata are retained. "
            "Not eligible for QBench Index 1.6; benchmark-specific scoring and evaluation conditions remain separate."
        )
        if description:
            record["description"] = description
        if any("lower-is-better" in t for t in tags):
            record["note"] = "Check the publisher's lower-is-better flag before interpreting rank direction."
        updated += 1

        catalog = catalog_by_source.get(dataset_url)
        if catalog is None:
            catalog_id = record_id
            catalog = next((x for x in data["benchmarkCatalog"] if x.get("id") == catalog_id), None)
        if catalog is None:
            catalog = {"id": record_id, "name": record["name"], "group": record.get("domain", "General"), "source": dataset_url}
            data["benchmarkCatalog"].append(catalog)
        catalog["source"] = dataset_url
        catalog["status"] = "results-imported" if rows else "research-pipeline"
        catalog["note"] = f"Daily sync: {len(rows)} leaderboard rows; {last_modified} dataset update. Excluded from QBench Index 1.6."

    data["hfOfficialSync"] = {
        "provider": "Hugging Face official benchmark registry and leaderboard API",
        "lastSyncDate": TODAY,
        "datasetsDiscovered": len(datasets),
        "datasetsUpdated": updated,
        "newBenchmarkRecords": added,
        "leaderboardRows": leaderboard_rows,
        "failedLeaderboards": failures,
        "policy": "Imported rows remain outside QBench Index 1.6 until separately audited for compatible task, score direction, model variant, effort and harness.",
    }
    DATA_PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    # Parse again before allowing the workflow to commit.
    checked = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    if len(checked["benchmarks"]) < updated:
        raise ValueError("Post-write validation failed")
    print(json.dumps(data["hfOfficialSync"], ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f"QBench benchmark sync failed: {exc}", file=sys.stderr)
        raise
