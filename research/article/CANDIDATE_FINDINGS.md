# Article candidates and evidence

The numbers below are independently verified on the stated source and definitions. The proposed article angles remain candidates, not validated causal or aesthetic conclusions. Source bytes and normalized character offsets are provided in the JSON and echo/witness tables.

## AC01 · One included chapter occupies more than one fifth of A Memory of Light.

| Quantity | Value |
|---|---|
| chapter_word_tokens | 78393 |
| book_word_tokens | 353730 |
| share_of_book_percent | 22.161818336 |
| all_chapter_median_words | 5716 |
| multiple_of_all_chapter_median | 13.7146606018 |
| share_of_New_Spring_words_percent | 64.329323333 |
| next_longest_included_unit_words | 36637 |

Counterexample: The next-longest included unit is a prologue, so a ranking limited to numbered chapters is a different comparison.

Confounds: Word counts measure textual allocation, not reading time, action density or merit. Included prologues/epilogues affect the median; edition-specific headings and previews are excluded.

Source chapters: b14:c37, b11:cPrologue

Evidence rows: chapter_metadata:chapter_id=b14:c37; book_metadata:book=14; chapter_metadata:all 704 rows

## AC02 · Crossroads of Twilight has the largest prologue share in the included novels.

| Quantity | Value |
|---|---|
| prologue_words | 32627 |
| book_words | 264692 |
| share_percent | 12.3264020069 |
| included_prologues | 13 |
| Knife_of_Dreams_prologue_share_percent | 11.6631542757 |
| EotW_prologue_share_percent | 0.871419053964 |

Counterexample: Knife of Dreams has a longer prologue in absolute words, but a lower share of its longer novel.

Confounds: The additional Ravens prologue is absent from the supplied edition; this is available-edition coverage, not a claim about every publication. A prologue can contain multiple viewpoints.

Source chapters: b10:cPrologue, b11:cPrologue, b01:cPrologue

Evidence rows: chapter_metadata:chapter_key=Prologue; book_metadata:books=1,10,11

## AC03 · The token accepted is overrepresented but unevenly distributed in New Spring.

| Quantity | Value |
|---|---|
| accepted_count | 159 |
| accepted_reference_count | 731 |
| accepted_G2_natural_log | 343.468001166 |
| accepted_rate_per_million | 1304.75455843 |
| accepted_reference_rate_per_million | 172.669306861 |
| accepted_DP | 0.452582357051 |
| accepted_chapters_present | 17 |
| accepted_chapters_total | 27 |
| novices_count | 59 |
| novices_reference_count | 525 |
| novices_G2_natural_log | 69.4870287459 |
| novices_rate_per_million | 484.154207218 |
| novices_reference_rate_per_million | 124.010104107 |
| novices_DP | 0.553415658557 |
| novices_chapters_present | 13 |
| novices_chapters_total | 27 |
| focal_tokens | 121862 |
| reference_tokens | 4233526 |

Counterexample: The related token novices has a different frequency and greater DP concentration, so a single institutional word is not a full thematic signature.

Confounds: Lowercasing merges a capitalized rank with the ordinary verb. No sense disambiguation or stopword removal. G2 is descriptive, not proof of theme or a valid independent-token significance test.

Source chapters: b00:c2, b00:c3

Evidence rows: keyness_v2:book=0,token=accepted|novices; lexical_dispersion:book=0,token=accepted|novices

## AC04 · Similar token totals in A Memory of Light conceal markedly different chapter spread.

| Quantity | Value |
|---|---|
| battle_count | 516 |
| battle_reference_count | 1055 |
| battle_G2_natural_log | 781.036808883 |
| battle_rate_per_million | 1458.73971673 |
| battle_reference_rate_per_million | 263.640720921 |
| battle_DP | 0.226250247364 |
| battle_chapters_present | 48 |
| battle_chapters_total | 51 |
| androl_count | 468 |
| androl_reference_count | 110 |
| androl_G2_natural_log | 1806.53989212 |
| androl_rate_per_million | 1323.0429989 |
| androl_reference_rate_per_million | 27.4886059728 |
| androl_DP | 0.563896192011 |
| androl_chapters_present | 15 |
| androl_chapters_total | 51 |

Counterexample: Androl has the larger G2 score but occurs in far fewer chapters than battle; keyness and spread answer different questions.

Confounds: One token is a proper name and the other a common noun. Counts are mentions, not character presence or explicit fighting. Chapter lengths vary sharply.

Source chapters: b14:cPrologue, b14:c37

Evidence rows: keyness_v2:book=14,token=battle|androl; lexical_dispersion:book=14,token=battle|androl

## AC05 · The largest adjacent lexical divergence borders a very short epilogue.

| Quantity | Value |
|---|---|
| maximum_JS_bits | 0.586876324318 |
| left_words | 10885 |
| right_words | 327 |
| minimum_both_chapter_words_filter | 2000 |
| eligible_pairs_after_filter | 665 |
| filtered_maximum_JS_bits | 0.395099601973 |
| filtered_left_words | 2667 |
| filtered_right_words | 2368 |

Counterexample: The largest boundary after the length filter remains substantial and occurs between two longer chapters, so shortness does not explain every large divergence.

Confounds: Unsmoothed empirical distributions are sparse for short chapters. This length filter is a sensitivity analysis selected after inspection, not a matched-length experiment or causal adjustment.

Source chapters: b10:c30, b10:cEpilogue, b12:c48, b12:c49

Evidence rows: adjacent_chapter_js:all rows; chapter_metadata:paired lengths

## AC06 · Removing very short chapter pairs changes the median less than it changes the extreme.

| Quantity | Value |
|---|---|
| all_adjacent_pairs | 689 |
| all_pair_median_JS_bits | 0.2664190681 |
| filtered_pairs | 665 |
| filtered_median_JS_bits | 0.264308297533 |
| minimum_JS_bits | 0.182129139418 |

Counterexample: The large change in the maximum contrasts with the small shift in the median; outlier anecdotes are not a summary of the full sequence.

Confounds: Adjacent pairs share chapters and are not independent samples. These are observed dataset medians, without population or reader-response inference.

Source chapters: b05:c43, b05:c44, b10:c30, b10:cEpilogue

Evidence rows: adjacent_chapter_js:all 689 rows; chapter_metadata:minimum of both lengths >=2000

## AC07 · An exact normalized paragraph links The Eye of the World prologue and A Memory of Light epilogue.

| Quantity | Value |
|---|---|
| normalized_characters | 668 |
| word_tokens | 136 |
| occurrences | 2 |
| distinct_books | 2 |

Counterexample: Another exact match occurs between two chapters of The Dragon Reborn, so an exact repeat need not span the series.

Confounds: Whitespace is normalized, but case and punctuation must match. Paragraph framing or epigraphs can repeat without demonstrating causal setup/payoff. Attribution and intent remain unadjudicated.

Source chapters: b01:cPrologue, b14:cEpilogue

Evidence rows: echo_groups:echo:ab9e41d46f6b0b725a6c1052; echo_occurrences:echo:ab9e41d46f6b0b725a6c1052

## AC08 · Three first chapters share one exact normalized paragraph; the census depends on its minimum-length rule.

| Quantity | Value |
|---|---|
| normalized_characters | 436 |
| word_tokens | 85 |
| occurrences | 3 |
| groups_at_80_characters | 10 |
| occurrences_at_80_characters | 21 |
| pairs_at_80_characters | 12 |
| groups_at_40_characters | 15 |
| occurrences_at_40_characters | 39 |

Counterexample: Another longer shared opening paragraph appears in only two different first chapters; repeated framing is not unique to the three-way match.

Confounds: This is exhaustive only for exact normalized paragraph matches across different included chapters, not substring, paraphrase, quotation or allusion discovery. Threshold chosen exploratorily.

Source chapters: b01:c1, b03:c1, b14:c1

Evidence rows: echo_groups:echo:82f561f8eb3a8ae9a4edf7d2; echo_cutoff_sensitivity:cutoffs=40,80
