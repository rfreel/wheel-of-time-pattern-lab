# The Pattern Lab

Reproducible computational research across fifteen *Wheel of Time* novels. Independent fan project.

**Status:** scaffold only; prior datasets have not been imported or rerun here.

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
