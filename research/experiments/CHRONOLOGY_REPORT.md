# Chronology-sensitive POV silence: completed experiment

**Status:** validated source-defined calculations, **not** validated claims about character absence, story causality or reader experience.

## Prewalk and dependency gates

1. Freeze inputs: Git blob `6d4dbfa99a9be009a27dddf6e026e8a369130c8a` (704 chapter records) and `fe7d3c3b553ac87473f9bd349c9e0555b7cdad92` (1,379 POV segments). No source file was modified.
2. Define orders before measuring: `prequel_first=[0,1..14]`, `publication=[1..10,0,11..14]`, `main_series=[1..14]`. The expanded *New Spring* novel was published in January 2004 after *Crossroads of Twilight* (2003) and before *Knife of Dreams* (2005): https://www.encyclopaedia-wot.org/Wiki.jsp?page=New+Spring .
3. Treat a POV return as consecutive **distinct chapters** with that character's curated POV. Count intervening included chapters and sum their EPUB word-like tokens. Exclude `Quote` and the one unaligned *Ravens* segment. A character with one POV chapter has no observed return interval; it is not a zero gap.
4. Compare three orders, both units, and negative cases. Do not infer actual story-time order from the book-level prequel placement.
5. Repeat the ensemble comparison in equal 100,000 POV-word windows, then stop where semantic or external-control prerequisites are missing.

## Source-defined findings

| Character | Prequel-first maximum gap | Publication maximum gap | Main-series-only maximum gap |
|---|---:|---:|---:|
| Lan Mandragoran | 568 chapters (3,555,357 intervening EPUB tokens) | 92 (611,637) | 18 (99,155) |
| Moiraine Damodred | 369 (2,491,365) | 204 (1,439,758) | 369 (2,491,365) |
| Mesaana | 326 | 353 | 326 |
| Demandred | 219 | 246 | 219 |

The 568-chapter Lan result is **not invariant**: excluding the prequel reduces the longest observed return gap to 18 chapters. Moiraine provides a contrasting case: the main-series gap persists, while inserting *New Spring* in publication order interrupts it. These are **POV gaps**, not character disappearance.

The analysis emits **3,143 interval rows** and **465 character/order summary rows**. Main-series-only has 677 included chapters; the other two orders have 704. Recompute with `python scripts/chronology_silence.py`. Python tests compare every exported row to fresh recomputation.

## Equal-token ensemble control

Excluding the prequel and 24 non-character `Quote` segments leaves **4,239,677 curated POV words**. There are 42 disjoint windows of 100,000 POV words, with a 39,677-word remainder.

- First 100k: 2 viewpoints; 1.118302 word-weighted effective voices; Rand 97.6380%.
- Last **complete nonoverlapping** 100k: 32 viewpoints; 22.750125 effective voices; Mat 12.2600%.
- Separately anchored **terminal** 100k: 40 viewpoints; 25.864610 effective voices; Mat 12.5740%. This terminal window overlaps the last complete one and is not independent.

This controls token count, not book position, writing era, narrator segmentation, or plot function. Recompute with `python scripts/equal_token_voices.py`.

## Premortem / residuals

- **Unverified story chronology:** the three book orders are not a chapter-level in-world chronology. Requires event concordance and disputed/overlapping-event treatment.
- **Narrative exposure debt:** first *appearance* needs a vetted character-name/alias concordance with the separate appearance index. No unsupported name merges.
- **Plot-thread convergence:** requires independently annotated plot-thread identity and geography. High POV count is not evidence of thread convergence.
- **Publication-quality inference:** outside-series matched controls, human context review, and sensitivity to narrator segmentation remain absent.
- **Fan usability:** an interactive chronology prototype can be tested for task success, but no user-study result is claimed.

The historical five-repair `INCOMPLETE` package and its tolerance are not altered.
