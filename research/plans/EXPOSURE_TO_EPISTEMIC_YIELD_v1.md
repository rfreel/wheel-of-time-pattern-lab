# Next-phase prewalk: Does first focalization reveal previously inaccessible information?

**Status: prewalk only. No new semantic experiment or reader study has run.** Companion full protocol: `WOT_Next_Research_Prewalk_v1.md` (SHA-256 `299238060eae0ac41251053f6dddb32251a903f65ecad16ee0913d87977e8cf7`, local research artifact). Full-series spoilers are private.

## Decision

Move from **exposure debt** (first appearance → first POV) to **epistemic yield** (what the first POV lets a reader know that earlier external appearances did not). Do not infer new knowledge from POV switching alone.

### Frozen starting point

- 704 included chapters, 1,379 curated POV segments; 1,652 appearance names and 9,069 indexed appearances.
- Of 155 POV labels, 134 match appearances exactly; 21 are unresolved. `Narrator` and `Seanchan Rider` are not unique character identities.
- *The Last Battle*: 11 first POVs; ten exact appearance matches with 270 earlier recorded appearances; eight also agree about the first-POV chapter. Appearance-index disagreement for Hurin and Ila is unresolved.
- Last Battle first-POV clustering depends strongly on the opportunity/length null (expected 3.496, 4.574, or 9.089 among the restricted 16-character cohort). Preserve all three.
- Private novel source `WOT.zip`: SHA-256 `833b39c562b05271714c0edba15fb95286452b8fea685c7bda6276031d61372d`, CRC checked; **never publish the EPUBs or prose**.
- Previous exposure package SHA-256 `2fd8b484ccc474704486135f5bd1fff435c10cf313b1d92d86254289375a39bc`. Historical five-repair INCOMPLETE state remains unchanged.

## Rival hypotheses

- **H1:** delayed first POV reveals more previously reader-inaccessible character-private beliefs, goals or intentions than comparable returning POVs.
- **H0:** first POV redistributes or recaps information already accessible to the reader.
- **H2:** climax location, passage length and chapter POV density explain any apparent difference.
- **H3:** inferred motivation, reported speech and narratorial description are misclassified as private information.
- **H4:** readers reconstruct apparently novel information from context; actual memory may not update as an automated textual classifier predicts.

## Execution gates (do not skip)

1. **Replay/freeze** source archives, source IDs, chapter/paragraph offsets and parser regressions. Require exact source agreement and no public prose.
2. **POV span alignment:** verify *within-chapter* focalization boundaries against private EPUB spans. Chapter-level POV records and estimated word offsets alone are insufficient. Begin with the eight index-consistent Last Battle first-POV cases. Retain unresolved cases.
3. **Sample frame:** target 44 segments only if independently available: 8 index-consistent Last Battle debuts; 12 non-finale long-debt debuts; 12 shorter-debt debuts; 12 length/position-matched returning POVs. Freeze eligible universe and deterministic selection seed. No invented sample members.
4. **Independent annotation:** distinguish explicit reader-new private beliefs/intents, new public facts, earlier-known information, recaps and inferable propositions. Record narrator, epistemic holder, modality, proposition/evidence spans, reader-availability-before and ambiguity. Two independent annotators, third-party disagreement adjudication; model annotations are proposals, not ground truth. Preserve disagreement and prevalence.
5. **Controlled comparison:** primary fraction of adjudicated propositions classified as *genuinely reader-inaccessible character-private information*; secondary any-new, recap and reframe flags. Match chapter position, segment length, prior appearances and POV density. Cluster inference by character/chapter, and conduct leave-final-book-out sensitivity. Baselines: position only, length only, occurrence count, naive textual novelty, stratified label permutations. Never interpret observational difference causally.
6. **Reader study:** only if consented participants and appropriate source rights are available. Compare recall, recognition, comprehension and reconstruction after later context. Reuse the existing private `ANNOTATION_PROTOCOL.md`; do not invent reader outcomes.
7. **External replication:** cross-work validation with appropriate public-domain works; [LitBank](https://github.com/dbamman/litbank) provides entity/event/coreference/quote annotations but not the full-novel first-focalization or reader-memory ground truth needed here.

## Predeclared halt conditions

- Source or narrator alignment fails → preserve audit, stop semantic attribution.
- Independent annotation unreliable/unavailable → publish no comparative linguistic claim; status `ANNOTATION_PENDING`.
- Reader observations unavailable → `BLOCKED_HUMAN_EVIDENCE`; do not substitute language models for readers.
- External independent corpus unavailable → `INCOMPLETE_EXTERNAL_VALIDATION`; do not claim general laws.
- Successful descriptive analysis alone never changes the original research run's historical status.

## Deliverables

Private: span locators, temporary source excerpts and participant outcomes, gitignored. Public: aggregate rows, source hashes, positional IDs, methods, disagreements, controls, tests and residuals, **no copyrighted prose or reconstructable token sequences**. Fan UI follows validated linguistic evidence, not before.

## Nearest evidence precedents

- [LitBank](https://github.com/dbamman/litbank): ~210k annotated literary tokens across 100 works.
- [Graesser et al. (1999)](https://doi.org/10.1016/S0304-422X(98)00016-3): knowledge-attribution judgments are influenced by both retrieval and reconstruction.
- [Gerrig et al. (2001)](https://doi.org/10.1006/jmla.2000.2740): reader projection of character knowledge is revisable.

**First executable handoff:** stages 1–2 (source replay and exact narrator-span concordance). The subsequent gates require evidence not currently established. Research issues [#12](https://github.com/rfreel/wheel-of-time-pattern-lab/issues/12) and [#13](https://github.com/rfreel/wheel-of-time-pattern-lab/issues/13) remain open.
