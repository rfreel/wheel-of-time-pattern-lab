# Equal-token ensemble control

Status: reproducible descriptive measurement, not proof of an abrupt phase transition or authorship mechanism.

Using the **main 14 novels only**, excluding 24 non-character `Quote` segments, the curated POV source supplies **4,239,677 POV words**. Partition in reading order into **42 disjoint windows of 100,000 POV words**, with a **39,677-word remainder**. POV segments crossing boundaries contribute their *counts* to both adjacent windows; this does not imply an exact token-level alignment to EPUB text.

First full window: **2 distinct viewpoints**, **1.118302** effective voices; Rand receives **97.6380%** of POV words. Final nonoverlapping full window: **32 viewpoints**, **22.750125** effective voices, Mat **12.2600%**. A separate 100,000-word window anchored at the series end yields **40 viewpoints** and **25.864610** effective voices. That terminal window overlaps the last disjoint window and must not be treated as an independent observation.

Effective voices: `2 ** (-sum(p_i * log2(p_i)))`. Equal-token windows control sample size but do not control narrative position, editorial segmentation, book identity, or authorship. This is a within-series comparison, not an external literary benchmark.

Source: `data/aggregate/pov_segments.csv`; reproduction: `python scripts/equal_token_voices.py`; independent assertions: `tests/test_equal_windows.py`. The historical five-repair acceptance result remains unchanged.
