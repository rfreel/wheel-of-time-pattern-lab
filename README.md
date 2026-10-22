# The Pattern Lab

Reproducible computational research across fifteen *Wheel of Time* novels. Independent fan project.

**Status:** curated chapter/POV metadata imported; full numerical source archives remain external. GitHub Actions verifies the imported records.

## Research

- [R01](research/questions.yaml): **Recurring architecture**. Do structural motifs recur across books?
- [R02](research/questions.yaml): **Cast expansion**. How do POV concentration and cast size change?
- [R03](research/questions.yaml): **Long-range echoes**. How far apart are exact and approximate echoes?
- [R04](research/questions.yaml): **Plot-thread convergence**. When do independent plot threads converge?
- [R05](research/questions.yaml): **Predictable transitions**. Can earlier features predict later transitions?
- [R06](research/questions.yaml): **Structural returns**. Do later scenes repeat earlier configurations?
- [R07](research/questions.yaml): **Geography and movement**. Does travel constrain narrative scheduling?
- [R08](research/questions.yaml): **Bridge characters**. Who connects otherwise separate plot threads?
- [R09](research/questions.yaml): **Author-era changes**. What changes survive position and genre controls?
- [R10](research/questions.yaml): **Predictive grammar**. Can a compact grammar predict withheld chapters?

## Research discipline

- Every result needs frozen source hashes, denominators, independent checks, counterexamples and explicit limitations.
- Execution is not validation. Coappearance is not interaction; temporal order is not causation.
- Public files contain no EPUBs, novel prose, or reconstructable token sequences.
- Prior five-repair research run remains **INCOMPLETE**, without retroactive modification.

## Verify

`python scripts/check.py` and `python -m unittest discover -s tests -v`

## License

MIT for code only; source texts and third-party data have separate rights.

## Imported results and explorer

- [Open the offline Pattern explorer](explorer/index.html) (download/open locally; GitHub Pages deployment not yet enabled).
- [704 chapter records](data/aggregate/chapters.csv), totaling 4,355,388 word-like tokens and 82,094 paragraphs.
- [1,379 POV segments](data/aggregate/pov_segments.csv), of which 1,378 align to the 704 included chapters. The remaining *Ravens* segment is outside the supplied EPUB chapter set.
- [Chapter-level POV metrics](data/aggregate/pov_chapter_metrics.csv), reproducible with `python scripts/analyze_pov.py`.
- [Eight article candidate findings](research/article/CANDIDATE_FINDINGS.md), [methods](research/article/METHODS.md), and [source-linked candidate evidence](research/article/candidates.json).

### Whole-series observation

*The Last Battle* (book 14, chapter 37) has 72 POV segments from 30 viewpoint characters, including 11 first-time viewpoints in the supplied index. The next-highest chapter has 21 segments. Word-weighted POV entropy gives 22.511231 effective voices. This measures narrative attention, not plot causality or authorial intent.

### Provenance and limits

The imported CSVs were reconstructed from previously uploaded, parsed text files. Their row counts and aggregates were rechecked, but the imported CSV byte streams are **not asserted byte-identical** to their original archive members. The full article numerical core is not yet hosted in GitHub. The previous five-repair research run retains its historical **INCOMPLETE** result.
