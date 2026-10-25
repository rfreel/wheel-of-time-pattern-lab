# Methods and evidence ledger

**Scope:** An exploratory, descriptive feature, not a confirmatory psychological or authorship study. Complete-series structural spoilers.

## Data and provenance

- `WOT_Article_Core_v1.zip`: `data/chapter_metadata.csv` (704 included chapter IDs) and `data/adjacent_chapter_js.csv` (689 within-book adjacent chapter pairs; Jensen–Shannon divergence in bits from unordered token frequencies). These are privately generated research aggregates based on user-held novels. This bundle itself is not republished.
- `frozen_pov_segments.csv`: 1,379 source-defined POV entries (including *New Spring*, pseudolabels, and a single unaligned *Ravens* segment). It was reconciled to the internal chapter IDs.
- `WOT_EXPOSURE_STUDY/last_battle_exposure.csv`: ten exact-name-matched, first-time POV debut entries in *A Memory of Light* 37, derived by crossing the independently curated POV and appearance indexes. Original fan-wiki sources: [POV statistical analysis](https://wot.fandom.com/wiki/Statistical_analysis) and [character appearances](https://wot.fandom.com/wiki/List_of_character_appearances). See the original exposure audit for source-index disagreements and conditional-null experiments.
- [Prior community POV analysis (2022)](https://www.reddit.com/r/WoT/comments/wp7224/character_pov_charts_and_analysis_11_images/) and [chapter-structure observations (2024)](https://www.reddit.com/r/WoT/comments/1bdw4mq) mean neither raw POV proliferation nor the perception of different chapter pacing is novel.

## Exposure-debt calculation

- Use chronological main-series book indices 1..14. Do not insert `New Spring`, because doing so distorts gap durations.
- For each exact-matched character, let `a` be first indexed appearance chapter and `v` be first recorded POV chapter. The number of **intervening included chapters** is `index(v) - index(a) - 1`, not a count of chapters in which a person is absent. `prior_appearance_chapters` counts recorded chapter appearances strictly before `v`.
- The ten matches sum to **270 prior appearances**; the sorted 10 gaps have median **592 chapters**. Tam's recorded interval is **661**, with **31** earlier chapter appearances. Of 11 first-time POV labels in chapter 37, Berelain does not resolve to an exact appearance-name match in this source pair. Hurin and Ila lack an appearance entry *in that first-POV chapter*; retain that contradiction.
- This is **not** a verified first experience of private thought in the prose, nor an estimate of the character's actual time in-world.

## Chapter-seam calculation

- For each within-book adjacent chapter pair from the Jensen–Shannon source, identify the final eligible POV label of the earlier chapter and the first eligible POV label of the later chapter.
- Exclude the `Quote`, `Narrator`, and `Seanchan Rider` labels from individual-character POV handoffs. Require both chapters to have at least **2,000 source word-like tokens** and recorded eligible POV labels.
- Predefined grouping for this exploratory feature: main books **1–11** vs **12–14**. Included boundaries **496** and **143** respectively, with **206** and **9** same-POV handoffs (41.532% and 6.294%). Mean Jensen–Shannon divergence **0.257533832** and **0.294350592** bits respectively.
- Exploratory OLS: `JS ~ intercept + late_12_14 + same_pov + log(mean_chapter_words) + abs(log(word_ratio))`, with errors clustered by the 14 book IDs. Late-group coefficient **+0.020241 bits**, clustered SE **0.008183**. Same-POV coefficient **−0.032864 bits**, SE **0.003001**. Chapter boundaries are not independent literary experiments. The late group has only three book clusters. The grouping and reported results were selected during earlier exploration, not independently preregistered.
- Sensitivity already recorded in the internal independent audit: omitting book 12 gives late coefficient ~+0.01607; omitting 13 gives ~+0.01529; excluding 14 gives +0.02901. These are observational estimates, not effects attributable to Sanderson.

## Confidence boundaries and falsifiers

1. The two findings are *juxtaposed*, not causally joined: exposure debt is individual-character/chapter-37 level; seam statistics are book-boundary level.
2. POV segment labels come from a fan-maintained taxonomy. Quote labels, unnamed roles, aliases and scene splits can change counts. The XHTML scene breaks and curated POV segments disagree by one in *The Last Battle* (73 vs 72), so no individual scene boundary is presented as independently verified focalization.
3. Lexical divergence captures word distribution, not direct judgments of suspense, comprehension or emotional continuity.
4. A `first POV` can expose new facts, repeat known facts or change rhetorical perspective; no independent semantic annotation decides among them.
5. An alternate book grouping, different length threshold, alternative tokenizer, different POV segmentation, or external literary controls could change the size of the associations. The most important missing test is replication outside this one series.
6. The Last Battle debut concentration is **not robust across null models**: opportunity models predict ~3.50 to 9.09 expected debuts in chapter 37 among a restricted eligible cohort; corresponding one-sided p estimates vary from ~0.00244 to ~0.86753.

## Reproduction and verification

Run `python methods/reproduce.py --core /private/path/WOT_Article_Core_v1.zip --pov /private/path/frozen_pov_segments.csv --exposure /private/path/last_battle_exposure.csv --output data/evidence.json`. Requires `numpy` and `statsmodels`; the script checks exact totals and summary values and refuses silently divergent data. The private source archives are not included with the public feature. The source tables and counts were independently regenerated in this working session; the publication bundle contains only text-free derived evidence.

## Rights

The published essay and visualization are original commentary. Numerical tables are derived from multiple fan indexes that may carry different licenses. Link to and credit the original wiki/data authors; consult their current licensing conditions before redistributing their full indexes. Do not ship original novel text, EPUB content, or the private FTS database.