# The Unheard: first appearance to first POV in *The Wheel of Time*

**Status:** reproducible descriptive finding; the concentration of debuts in the Last Battle is sensitive to the null model. Full-series spoilers.

## Measurement

The original curated indexes contain 1,652 named appearance entities (9,069 character–chapter entries) and 1,379 ordered POV segments. Excluding the non-character `Quote` label, **134 of 155 POV owner labels match an appearance name exactly**; the other 21 labels are not automatically equated to aliases. The supplied EPUB-based chapter index covers 704 chapters. The main-series interval counts included chapters **strictly between** the first recorded appearance chapter and first indexed POV chapter.

The Last Battle (A Memory of Light ch. 37) has **11 first-time POV labels** among **27** that first receive POVs in book 14. **Ten** have exact appearance-name matches; those ten had **270 earlier indexed character–chapter appearances**, with a **592-chapter median intervening delay** (range 252–661). The eleventh (`Berelain`) is unresolved by exact name. Hurin and Ila are absent from the appearance index *in their recorded first POV chapter* despite being indexed earlier. Across the full exact-matched index, Ellorien Traemane is a third mismatch. Source disagreement is retained, not silently repaired.

## Competing nulls: one statistic, different scientific answers

A broad chapter-length-only model holds 27 book-14 debuts fixed and allocates them across book-14 chapters proportional to chapter EPUB tokens. Last Battle occupies ~22.16% of that book's tokens, giving an expected **5.984** debuts; one-sided P(X≥11)=**0.02326**. This model ignores character-specific appearance opportunities.

A narrower, appearance-consistent subset includes **16** book-14 debut labels that match the appearance index and whose first POV chapter is listed there. **Eight** debut in ch. 37. Hold each name's eligible recorded appearance chapters fixed, and consider three probability models:

| Opportunity model | Expected debuts in Last Battle | P(X≥8) |
|---|---:|---:|
| Uniform among eligible chapters | 3.496 | 0.00244 |
| Length-to-the-power-α, α learned on books 1–13 (α=0.21439) | 4.574 | 0.02489 |
| Proportional to chapter length (α=1) | 9.089 | 0.86753 |

The fitted model uses **72 earlier-book multi-option examples**. Its 40,000-simulation max-chapter (selection-aware) exploratory p-value is **0.02502**. Changing the length weighting can reverse the interpretation; no claim of authorial causality or literary quality survives all specifications. The Last Battle was selected after seeing prior results, so these are **exploratory, model-conditional** p-values.

**Surviving fact:** Many long-established characters receive their first indexed internal viewpoints extremely late in the series. **Unresolved inference:** whether that clustering reflects special narrative design beyond chapter length and appearance opportunities.

## Source/verification

- [Appearance index](https://wot.fandom.com/wiki/List_of_character_appearances) and [POV statistics](https://wot.fandom.com/wiki/Statistical_analysis), independently curated; derived aggregate data reproduced from the original private frozen archive.
- Exact input member SHA-256: appearance CSV `55e5a1e76e495cdf8536b1f5fcea839b578711888dde57cf78ff46f76afba566`; POV CSV `00ad940bf817cb7fa1b7ea31f6b6b21552e24c5e89a6d56caa0bf55fb0dfe577`; chapter CSV `93638f0da3f983c9ff0c2be1e69c76cdd17dd514d1a8f36ded32683adc681284`.
- Producer: Python standard-library exact string join, convex likelihood fit, Poisson-binomial recurrence, and chapter-max permutations (seed 20261021).
- Independent reference: pandas chronological grouping, SciPy likelihood fit and exhaustive Bernoulli enumeration. Cleanly extracted research package replays the results, with no EPUB or full prose.
- Raw fan-wiki-derived names/chapter-index data have separate content licenses from this repository's MIT-licensed code. Preserve attribution and applicable share-alike requirements. Do not treat the research as an official Wheel of Time project.

**Research status:** descriptive computations complete; annotated identities, narrative function and independent-series replication remain open. Historical five-repair `INCOMPLETE` record unchanged.
