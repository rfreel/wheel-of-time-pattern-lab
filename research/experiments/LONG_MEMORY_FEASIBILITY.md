# The Long Memory of the Pattern: held-out POV-return benchmark

**Status:** source-defined forecasting completed; narrative information and reader-memory hypotheses **NOT VALIDATED**.

## Frozen scope
- Source: 704 chapter records, 1,379 curated POV segments. Main-series books 1–14 only; exclude New Spring, Quote, Narrator, Seanchan Rider and unaligned Ravens.
- Prediction unit: a previously observed character's ownership of a POV in the *next* chapter. First-time POV debuts are outside the candidate set.
- Train: main books 1–10, 19,316 character-chapter decisions, 619 positives.
- Held out: main books 11–14, 24,462 decisions, 401 positives, 201 chapter boundaries; 50 first-time POV debuts not predicted.
- Frozen GitHub input blobs: chapters `6d4dbfa99a9be009a27dddf6e026e8a369130c8a`; POV segments `fe7d3c3b553ac87473f9bd349c9e0555b7cdad92`.
- A canonical field-level comparison of all 704 chapter rows and 1,379 POV rows against the local working copies passed (FNV-1a UTF-16: `39dbc594` and `b18f1293` respectively). Local serialization/line endings differ from GitHub blob bytes.

## Predeclared models and outcomes

| Model | Brier ↓ | Log loss bits ↓ | Mean chapter AP ↑ | Top-3 hit ↑ |
|---|---:|---:|---:|---:|
| Constant training prevalence | 0.016369 | 0.127588 | 0.01634 | 0% |
| Past character frequency | 0.014810 | 0.092264 | 0.32100 | 53.30% |
| Past-only logistic recurrence | **0.014558** | **0.086832** | **0.39616** | **60.41%** |

Logistic features: log historical chapter count, log gap, recent-5 and recent-20 rates, current-chapter POV indicator, log elapsed chapter index. StandardScaler + LogisticRegression(C=1,max_iter=500), fitted only on training books. Historical frequency baseline uses past-only Laplace smoothing.

Chapter-block bootstrap (1,000, seed 20261021): logistic minus constant Brier 95% interval **[-0.002256, -0.001324]**; logistic minus past-frequency interval **[-0.000583, +0.000123]**, **includes zero**. The logistic model loses on Brier to the frequency baseline in **two of four held-out books**. A within-chapter shuffled-label control increases logistic Brier to **0.018042**.

## Scientific interpretation and limitations

The sequence of prior viewpoints contains predictive signal about later viewpoint ownership. The richer model is **not demonstrably superior to a simple past-frequency baseline** under the reported bootstrap. This is **not** evidence of reader recall, proposition retention, causal dependency, suspense, literary merit, or authorship effects. Four test books do not provide reliable cross-series generalization. The experiment was designed after prior exploration of this corpus, so it is not an external preregistered replication.

## Reproducible private/public-safe package

The separate, text-free archive `WOT_Long_Memory_Feasibility_v1.zip` (SHA-256 `0f15626b6b9a480ca8218c7f7a8a061bef255241bda1f24bf38bc50d6ea22375`) contains the executable code, input CSVs, all model results, exact-echo candidate source locators, independent structural checks, preregistration, annotation protocol, and residuals. The archive was clean-extracted; rerunning the model produced identical JSON; a deliberately altered file was rejected by its integrity checker. The archive has not been uploaded to this repository. No copyrighted novel prose is included.

## Required evidence before a publishable cognitive claim

1. Independently adjudicated introduction-to-payoff proposition links and annotation reliability.
2. Consented reader recall/comprehension measurements with controlled exposure.
3. External novels and genre-matched controls with leave-series-out evaluation.
4. Stronger baselines, uncertainty estimates respecting serial/book dependence, and replication.
5. Adjudicated POV aliases and anonymous narrators.

These are **unmet prerequisites**, not unfinished numerical calculations. The historical five-repair run remains **INCOMPLETE** and unchanged.
