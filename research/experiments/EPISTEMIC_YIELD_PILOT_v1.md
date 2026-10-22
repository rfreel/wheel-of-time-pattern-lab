# Epistemic-yield pilot: stages 1–4 audit

**Status: INCOMPLETE_HUMAN_SEMANTIC_EVIDENCE.** This is a measured boundary-alignment and sampling result, not a finding about reader knowledge or literary quality.

## Completed source processing

- Replayed the unchanged private `WOT.zip` (SHA-256 `833b39c562b05271714c0edba15fb95286452b8fea685c7bda6276031d61372d`), including ZIP CRC.
- In `A Memory of Light`, chapter 37, the source XHTML `OEBPS/Text/part0045.xhtml` has **72 explicit scene separators and 73 nonempty scene blocks**. The independently curated POV index has **72 segments**. These are not automatically one-to-one.
- Recovered **eight exact source-byte scene ranges** for the appearance-index-consistent first-POV candidates: Uno, Logain, Tam, Rhuarc, Silviana, Juilin, Gerard Arganda, and Mazrim Taim. The source name anchors and paragraph hashes pass a second, BeautifulSoup-based parser check. **No independent narrator adjudication was performed.**
- Constructed a **44-row candidate queue**: eight Last Battle debuts, twelve other long-debt debuts, twelve shorter-debt debuts, twelve returning POV candidates. The other 36 remain at chapter/curated-segment granularity; the returning controls are only approximately length-matched, not position-matched.
- Created an empty annotation schema and a conditional comparison contract. **Zero independently adjudicated semantic propositions** and **zero observed reader judgments** exist.

## Acceptance gates

| Stage | Result | Exact blocker |
|---|---|---|
| 1. Focalization boundaries | PARTIAL | Independent narrator identity; 73/72 reconciliation; remaining source spans |
| 2. Sample frame | PROVISIONAL | Verify 36 source spans and position/length matching |
| 3. Linguistic annotation | BLOCKED | Two independent annotators, adjudicated propositions, reliability |
| 4. Controlled inference | BLOCKED | Valid semantic outcomes, matched eligible cohort, cluster-aware tests |

**Do not estimate the epistemic-yield effect** from this dataset. Missing annotations are not zero disclosures. Scene delimiters are not automatically focalization boundaries. First-time POV is not automatically reader-new information.

## Reproducible package

`WOT_Epistemic_Yield_Pilot_v1.zip` SHA-256: `7c075dff52867a4b091fcf37598c9703826dc99ef81cb342064c6b7a2621a759`. Contains eight text-free scene locators, the 44-row queue, empty annotation schema, stage residuals, frozen source digests, producer, independent verifier, and clean-readback manifest. Replaying the producer reproduces the output byte hashes. Private EPUBs and novel prose are excluded. The package requires the original private source archives for source-dependent replay.

This experiment does not change the historical five-repair `INCOMPLETE` result or prior numerical studies.
