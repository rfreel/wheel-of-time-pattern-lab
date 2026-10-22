# Knowledge pipeline v2: local execution and acceptance record

**Date:** 2026-10-22. **Status:** source-integrity and local infrastructure milestones completed; narrative semantics and reader effects remain **UNVERIFIED**. This report is prose-excluded. The private and public-safe archival packages were generated separately, with checked inventories. The prior v1 packages and historical five-repair `INCOMPLETE` record are unchanged.

## Frozen-source defects reproduced and repaired

- Prior v1 review queue: 1,600 prefix-selected candidates from an 8,010-entry, at-most-two-per-chunk pool. The queue represented books 0–3 only.
- Prior v1 span offsets: 1,238 of 1,600 SHA-256 hashes did not match literal untrimmed source slices; all matched after whitespace trimming.
- New full regex-sentence enumeration: **310,403** candidate locations, including **39,412** epistemic/magic cue-bearing and **270,991** no-configured-cue spans. These are syntactic approximations and lexical search locations, **not labeled propositions**.
- All **39,412 cue-bearing** v2 Unicode-codepoint and UTF-8 byte ranges verified independently against the original private chunk SHA-256. A 1,600-row v1→v2 correction ledger preserves prior IDs.
- New stratified review queue: **1,200 spans**, 80 from each of 15 novels, with 420 epistemic-only, 330 magic-only, 150 both, and 300 no-cue candidate passages. Book-level split: 0–9 training, 10–12 development, 13–14 held out.

## Downstream source-only controls

- **Focalization:** eight original Last Battle XHTML scene ranges independently rechecked; 73 source scene blocks versus 72 curated POV segments is unresolved. Among the sampled candidates 768 have exactly one chapter-level curator POV owner; that does not adjudicate the narrator at each sentence.
- **Annotation:** a source-linked offline review interface, schema, two-reviewer agreement checker, and model proposal adapter are present. **Zero observed independent human annotations**, zero proposition labels, zero adjudicated semantic facts, zero model requests. No model endpoint was authorized.
- **Timeline:** 384 curated events, 1,133 unverified retrieval candidates, 380 events with at least one candidate passage, four unmatched/malformed; 57 stratified review tasks. Candidate passages are not synchronized chronology.
- **Graph:** 6,713 nodes and 30,817 edges, an increase of 1,200 expressly *unadjudicated* annotation-task nodes/edges over 5,513/29,617. **No KNOWS, CAUSES, FORESHADOWS, MAGIC_RULE or other semantic fact edges were promoted.**
- **Retrieval:** spoiler-filtered private FTS5 search recovers expected source chunks for 33/33 lexical index probes across all 15 novels. That is **index consistency**, not human relevance or generative answer accuracy.

## Verification

- Source-independent v1 regressions: **63 public** and **73 private** checks passed.
- V2 source-hash tests: **39,412/39,412** cue offsets; **1,200/1,200** sample positions; **1,600/1,600** historical corrections.
- V2 unit tests: **12 passed**.
- Public package: **31 file hashes verified**, archive SHA-256 `692a3a8e287b04cc0d4802b82ea56e7390677309590b6f87f334de038fe09b99`.
- Private package: **45 file hashes verified**, archive SHA-256 `8817ddef9f393efa8457805746e6f8b65ae1531bb958f8984382d7ae88775634`.
- Clean-extraction replay: six generated datasets reproduced **byte-identically**. Deliberately corrupted manifest member was rejected. No exact 90-byte matches from 250 sampled private passages appeared in public files. This is a targeted privacy test, not a legal rights clearance.
- The HTML reviewer passed JS syntax validation; browser screenshot validation was unavailable in this environment.

## Residual acceptance predicates

1. Independent POV owner/spatial boundary adjudication and alias reconciliation.
2. Two blinded human proposition annotators, disagreements, third-person adjudication, and independently checked prior reader context.
3. Authorized model credentials or local checkpoint for optional *proposals*; held-out precision/recall/calibration before promotion.
4. Independently checked timeline event-to-passage links; explicit correction of malformed curator sources.
5. Genuine foreshadowing, magic-rule, voice, and tension annotations, independently verified.
6. Reader studies and outside-series replication for cognitive/general claims.

These require new evidence. Automated completions must **not** silently satisfy them. The source-defined computation is complete, the research programme is **not**.
