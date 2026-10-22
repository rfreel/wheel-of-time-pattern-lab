# Identity-concordance candidate audit (NOT identity resolution)

An independent read of the preserved `WOT_Completion_Pass5_Atlas_v1.zip` appearance-name inventory found **1,652 appearance names**. Comparing against **155 distinct POV labels** (excluding `Quote`) yields **134 exact string matches** and **21 unresolved labels**. The 21 rows in `identity_alignment_candidates.csv` show nearest lexical suggestions only; **none** is accepted as a canonical identity merge.

Input archive SHA-256: `5b62403d21ab9da561d4bd2ccd9c86dab60bb9d4ac5d75a69bb82b1b2a8c7e8d`.
Archive member: `WOT_Completion_Pass5_Atlas_v1/baseline/results/appearance_characters.json`.
POV input: `data/aggregate/pov_segments.csv` (Git blob `fe7d3c3b553ac87473f9bd349c9e0555b7cdad92`).
Reproduce locally: `python scripts/audit_identity_alignment.py --appearance-json /path/to/appearance_characters.json --output /tmp/identity_candidates.csv`.

**Important counterexample:** `Narrator` (8 segments, 1,869 POV-source words) is a non-character label; `Seanchan Rider` (1 segment, 129 words) is an anonymous role, not a uniquely resolved character. Excluding these two labels in addition to `Quote` reduces distinct POV labels from **155 to 153**, and the main-series POV-word total from **4,239,677 to 4,237,679**. The first and final book's effective-voice results are unchanged because these labels do not occur there. The previously published metrics remain historical, with this sensitivity documented separately.

Nearest-string matching can be catastrophically misleading (e.g. `Isam` → `Ishamael`); an alias must not be accepted without direct source support. First-appearance-to-first-POV delay remains **blocked** until names and chapter identity are independently reconciled.
