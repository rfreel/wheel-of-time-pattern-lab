# Source notes and reproducibility

This is an **exploratory descriptive fan feature**, not an authorship or reader-cognition study. Structural spoilers for all fourteen main novels. No EPUB prose is included.

## The two source indexes

The main [WoT Wiki POV dataset](https://wot.fandom.com/wiki/Statistical_analysis) independently reports 1,379 POV segments across the prequel and fourteen novels. The separate [character-appearance index](https://wot.fandom.com/wiki/List_of_character_appearances) records chapter-level appearances. A character's appearance is not their POV, dialogue, or interior thought.

The exposure crosswalk uses **exact-name joins only**. In *A Memory of Light* chapter 37, eleven curated POV owners first receive viewpoints; ten have exact appearance-index matches. Their 270 earlier indexed appearances and **592-chapter median interval** were independently recomputed from the ten-character table. The intervals count **chapters strictly between** first appearance and first recorded POV in the fourteen-book main series. They do *not* count chapters where a character was absent.

The remaining eleventh label, Berelain, is not an exact appearance-name match. Hurin and Ila appear in the POV index in chapter 37 but lack a corresponding appearance-index entry **in that chapter**. This conflict is retained rather than silently reconciled. New Spring is excluded from these delays because prequel insertion changes book-order gaps.

The raw fan source indexes may be subject to attribution and share-alike conditions. Credit their authors and follow links above. This published ten-row table is a derived numerical subset; original novels and complete fan indexes are not redistributed.

## The chapter-boundary comparison

Private research source: `WOT_Article_Core_v1.zip`, files `data/adjacent_chapter_js.csv` (689 within-book neighbor records) and `data/chapter_metadata.csv` (704 included chapter IDs); and a reconciled 1,379-segment `frozen_pov_segments.csv`. The reproducible producer accompanies the downloadable feature archive.

For every adjacent chapter pair *within one main-series book*, take the final eligible POV label of the earlier chapter and first eligible POV label of the later. Exclude `Quote`, `Narrator`, and `Seanchan Rider`. Require both chapters to contain at least 2,000 source word-like tokens.

Early (books 1–11): **206/496** same-POV chapter handoffs (**41.532%**); mean lexical Jensen–Shannon divergence **0.257533832** bits.

Late (books 12–14): **9/143** same-POV chapter handoffs (**6.294%**); mean lexical Jensen–Shannon divergence **0.294350592** bits.

Lexical divergence is from unordered word distributions; it does not measure emotional disorientation, suspense, comprehension or scene quality.

Exploratory pooled OLS model:
`JS ~ late_12_14 + same_pov + log(mean_length) + abs(log(length_ratio))`, with standard errors clustered by book. The late coefficient is **+0.020241 bits** (book-cluster SE 0.008183); same-POV coefficient **−0.032864 bits** (SE 0.003001). These are *associations*, not effects. The comparison is a single series with three late-book clusters, and the grouping follows prior exploration rather than independent preregistration.

Across alternative nulls, the expected count of eligible first-POV debuts in The Last Battle ranges from 3.50 to 9.09; tail probabilities vary substantially. Consequently **no robust rarity claim** is advanced for its debut clustering. The two findings are juxtaposed as distinct views of narrative perspective, not joined causally.

## Prior work and interpretation

The basic proliferation of POV segments and perceived chapter-pacing shifts were already visible in [community POV charts (2022)](https://www.reddit.com/r/WoT/comments/wp7224/character_pov_charts_and_analysis_11_images/) and [reader discussion (2024)](https://www.reddit.com/r/WoT/comments/1bdw4mq). [Publisher information](https://us.macmillan.com/series/wheeloftime) confirms the final books' bibliographic history; final-volume structure and authorship are confounded, not statistically separable by these comparisons.

## Verification

Use the full download's `methods/reproduce.py` with the private original research source bundle, the POV CSV and the ten-character crosswalk to re-run all primary estimates. The script asserts 10 matches, 270 appearances, median 592, boundaries 496/143, handoffs 206/9, and the lexical/OLS coefficients. Public `data/evidence.json` and `data/exposure.csv` are **text-free evidence**, not copyrighted excerpts. The original private files are intentionally excluded from this public feature.
