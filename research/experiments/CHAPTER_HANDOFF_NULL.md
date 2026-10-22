# The chapter-boundary POV handoff experiment

**Exploratory structural result; not an authorship-causality claim.**

A first test that randomly permuted individual POV segment labels was **rejected** as a valid null: the curated source splits repeated same-character viewpoints into segments that are never adjacent **within a chapter**. Segment shuffling violates that segmentation invariant and produces invalid comparisons.

The revised null permutes **entire chapter blocks within each book**, preserving every chapter's internal POV sequence and its owner frequencies. It excludes non-individual labels `Quote`, `Narrator`, and `Seanchan Rider`. Ten thousand deterministic shuffles per book (seed 20261021).

**Measured statistic:** the last POV owner of chapter `t` equals the first POV owner of the next chapter. Main books 1–11 have **206/502 = 41.04%** same-owner handoffs; books 12–14 have **10/159 = 6.29%**. The rate difference is **34.75 percentage points**. The shuffle baseline has an expected rate difference of **13.43 percentage points**; the observed contrast exceeds all 10,000 shuffled contrasts (one-sided empirical p = 0.00009999). The observed late rate is not by itself significantly below its within-book null in all three volumes.

For example, *The Dragon Reborn* has 32 same-owner chapter handoffs versus null mean 13.9965; *A Memory of Light* has 1 versus 3.3153. This suggests a **shift in chapter-to-chapter viewpoint scheduling** between earlier and final volumes. It does **not** establish that the writer's identity caused the change: series position, narrative climax, editorial conventions, and source segmentation are confounded.

The group split was explored after seeing the series data. The p-value tests the declared permutation statistic **conditional on that chosen grouping**, not a preregistered discovery with familywise error control. Replication on other series and predeclared groupings is required before a general claim.

Reproduce: `python scripts/chapter_handoff_null.py`. The results JSON preserves book-level values, seed, exclusions, and exact denominators. Historical packages remain unchanged.
