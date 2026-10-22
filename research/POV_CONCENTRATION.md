# POV concentration across the series

The curated POV index records 1,379 segments, including 24 `Quote` entries that are not character viewpoints. The 15-book comparison excludes those non-character entries and the unaligned *Ravens* segment.

In *The Eye of the World*, five character POVs account for 57 aligned segments; word-weighted Shannon entropy corresponds to **1.808404 effective voices**, and Rand receives **82.3014%** of the source's character-POV word count. In *A Memory of Light*, 48 character POVs account for 256 aligned segments, corresponding to **22.561752 effective voices**; the largest character POV share is **11.8034%** (Mat). The ratio of effective voices is approximately 12.48×, but the books differ in length, segmentation, and narrative purpose. This is not a measure of literary quality or authorial intention.

Formula: `p_i = POV_words_i / sum_j POV_words_j`, `H = -sum_i p_i log2(p_i)`, `effective_voices = 2**H`. Values are descriptive and use the POV source's word-count convention, not the EPUB tokenizer's convention. Recompute: `python scripts/analyze_book_pov.py`.
