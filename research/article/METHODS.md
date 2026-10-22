# Definitions and limits

## Source and units

The authoritative frozen source is the user-supplied WOT.zip, identified in `provenance/frozen_archives.json`. EPUB edition-date metadata is not asserted to be the original publication date. Novel chapter order comes from the original reading spine. Prologues and epilogues available in that edition are included; headings, previews, front/back matter and the Companion are excluded from narrative lexical totals.

A word token is a Unicode alphabetic sequence, optionally containing internal ASCII/curly apostrophes or ASCII/Unicode U+2010 hyphens. Tokens are lowercased, curly apostrophes become ASCII apostrophes, and U+2010 becomes an ASCII hyphen. Digits, underscores and other punctuation are not tokens. There is no lemmatization, stopword removal, name masking or sense disambiguation. The exact pattern is in `contract/numerical_specifications.json`.

## HD-D correction

For counts f_i, total N and draw size k=42:

`HD-D = sum_i [1 - C(N-f_i,k)/C(N,k)] / k`.

The production correction evaluates the absence probability as a product of k ratios with 80-digit Decimal arithmetic. The independent reference forms an exact integer numerator over `k*C(N,k)` and reduces it to a Fraction before decimal rendering. Frequency multiplicities allow this computation from a histogram rather than word labels. The methods agree after rounding to the exported binary64 values for every book. The old SciPy-derived values and the old product estimates remain in separate columns. No rank or downstream literary interpretation is claimed from the tiny precision correction. No old tolerance or terminal status is changed.

## Keyness and comparator

For a focal token count a in N tokens and reference count b in M tokens, the observed 2x2 table is `(a, N-a; b, M-b)`. Let E be the expected cell count from row total times column total divided by N+M.

`G2 = 2 * sum(O * ln(O/E))`, with zero observed cells contributing zero.

This is a dimensionless likelihood-ratio statistic calculated with natural logarithms. It is not bits or a magnitude of semantic difference. There is NO smoothing for G2. Every type seen in the focal novel is included, even a singleton. The direction compares a/N with b/M.

For focal book 0, the reference contains books 1..14 and has 4,233,526 tokens. For a main-sequence focal novel, the reference contains the other thirteen main novels plus New Spring. All comparisons pool tokens, not equally weighted books. Reference membership is explicit per row. The Companion is never a reference novel.

Added rates are `1,000,000*a/N` and `1,000,000*b/M`. The added log ratio is `log2(((a+0.5)/(N+1))/((b+0.5)/(M+1)))`: 0.5 is added to each of the four binomial cells. These derived fields do not alter the original G2 values or counts. No multiple-testing-adjusted significance or independent-token null model is asserted.

## Lexical dispersion

`DP = 0.5 * sum_c abs(f_c/f_book - N_c/N_book)`.

Partitions are all included chapters of the focal novel, including chapters where the term occurs zero times. Chapter weight is its token count divided by the book token count. DP is a dimensionless total-variation distance from the token-length distribution. A high value means concentration in a subset of this partition, not narrative importance. The producer uses one minus overlapping probability mass; the independent verifier uses the dense half-L1 expression.

## Adjacent Jensen-Shannon divergence

`JSD(P,Q) = 0.5*KL(P || (P+Q)/2) + 0.5*KL(Q || (P+Q)/2)`.

P and Q are empirical word distributions of adjacent included chapters within the same novel. Mixture weights are exactly one half, regardless of chapter length. The vocabulary is the union; no smoothing is applied and zero terms contribute zero. Values are divergences in bits on [0,1]. The independent calculation uses `H((P+Q)/2) - (H(P)+H(Q))/2`.

Sparse, short sections tend to have disjoint empirical vocabularies. The both-chapters-at-least-2,000-token filter in the candidates is an exploratory sensitivity check, not a matched-length correction. Adjacent pairs also share observations and are not independent samples.

## Echoes and provenance

The core groups exact, case-sensitive, whitespace-normalized paragraph hashes and admits a group only when occurrences belong to different chapters. The primary cutoff is at least 80 normalized Unicode characters; 40, 120, 200 and 400 are reported as sensitivity cutoffs. It is exhaustive for this exact-paragraph predicate only. Initial candidate grouping uses SHA-256; the independent source audit recovers the actual strings, compares them directly and groups them again with SHA-512. This does not establish an allusion, foreshadowing, shared intent or a causal dependency.

Source byte ranges are zero-based half-open offsets into uncompressed UTF-8 XHTML. Decode and HTML-unescape EACH range, concatenate them, then normalize whitespace. Normalized character offsets in the small term-witness index are separate Unicode coordinates, not source byte offsets. Chapter envelopes may include headings or gaps; paragraph ranges identify the included source characters precisely.

## Verification and interpretation

All chapter bags are reconciled with the original source; book counts, comparator counts, chapter lengths and histograms agree. All G2 and DP rows, all adjacent JS values and all 72 article numeric claims have independent reference calculations. The source check additionally confirms exact repeated paragraphs and limited term witnesses. Fixed mathematical/parser regressions and tamper controls are supplied. None of these checks adjudicates literary meaning or the quality of the novels. The original research completion status stays INCOMPLETE.