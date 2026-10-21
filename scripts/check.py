from pathlib import Path
import json
r=Path(__file__).resolve().parents[1]
a=json.loads((r/"data/source_manifest.json").read_text())
assert a["status"]=="REFERENCES_ONLY_NOT_IMPORTED"
assert all(not s["imported"] for s in a["sources"])
q=(r/"research/questions.yaml").read_text()
assert all(f"id: R{i:02}" in q for i in range(1,11))
assert len(list((r/"experiments").glob("EXP-*/experiment.json")))==4
assert not list(r.rglob("*.epub"))
print("PASS: scaffold, 10 questions, 4 experiments, source boundaries")
