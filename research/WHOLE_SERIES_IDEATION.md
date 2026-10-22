# Whole-series ideation: research opportunities

Status: **exploratory hypotheses**, not certified narrative interpretations. Source basis: the committed 704-chapter EPUB metadata and 1,379 curated POV segments (1,378 aligned), with no novel prose used. This memo applies P02, P05, P06, P09, P10, P12, P15, P18, P20, P24, P30, P31, P32 and B04/B06 to different parts of the possibility space.

## Search object

Known: chapter order, length, curated POV owner/word counts, candidate exact echoes, ten open research issues, an offline explorer, and passing CI. Unknown: verified scene boundaries, appearance-to-POV identity resolution, independent causal/event annotations, complete timeline concordance, reader response, comparable outside-series corpus. Essential constraints: preserve source definitions, no public prose, no causal/quality claims from lexical counts. Conventional constraint to question: treating chapters, POV segments, and publication order as a single privileged unit of analysis.

## Empirical probe (computed from committed data)

Distinct character POV labels (excluding non-character Quote segments): **155**. Maximum between-POV-chapter gaps in the provided prequel-first order (number of intervening included chapters): Lan 568, Moiraine 369, Mesaana 326, Suroth 313, Gareth Bryne 307, Padan Fain 261, Semirhage 253, Egeanin 221, Demandred 219. These are **POV silences**, not character absences. First-time POV owners per chapter: The Last Battle 11; Lord of Chaos prologue 6; next highest 5. Lan's extreme gap depends on placing the prequel first and cannot be read as a main-series POV return without order sensitivity analysis.

## Family A: Attention, voice, and absence

### I01 — Narrative exposure debt
- **Origin:** P02/P15.
- **Transformation:** Replace character popularity with lag between first *appearance* and first *internal viewpoint*.
- **Mechanism:** Resolve chapter-appearance names against POV identities, compute waiting time and censor never-POV characters.
- **Distinction:** Quantifies how long established characters are observed externally before narration grants interiority.
- **Dependencies:** Appearance index, alias concordance, reading-order selection.
- **Uncertainty:** Character presence is not equivalent to reader familiarity.
- **Discriminator:** Compare waiting-time distribution to matched first-appearance times, with ambiguous identities excluded.

### I02 — The silent return
- **Origin:** P05/P24.
- **Transformation:** Treat missing POV as an interval rather than missing narrative presence.
- **Mechanism:** Compute within-character POV return gaps under main-series, prequel-first and publication-order arrangements.
- **Distinction:** Separates narrative silence from textual absence and ordering artifacts.
- **Dependencies:** Curated POV chronology and identity labels.
- **Uncertainty:** Gaps in chapter units ignore uneven chapter length.
- **Discriminator:** Recalculate by intervening tokens and chapter units, with *New Spring* excluded and included. Lan's 568-chapter prequel-first gap is a predeclared sensitivity case.

### I03 — Ensemble phase transitions
- **Origin:** P10/P18.
- **Transformation:** Replace total cast size with effective voice diversity over sliding book/word windows.
- **Mechanism:** Shannon effective POV voices, change-point detection, segment-length and sample-size controls.
- **Distinction:** Detects transitions in concentration rather than merely counting names.
- **Dependencies:** Ordered POV words and a stable segment policy.
- **Uncertainty:** Different book lengths and scene granularity alter estimates.
- **Discriminator:** Equal-token windows, rarefaction, prequel inclusion sensitivity, and within-book shuffled baselines.

### I04 — The anchoring braid
- **Origin:** P09/P32.
- **Transformation:** Model viewpoint switches as a scheduling process with return-to-anchor intervals.
- **Mechanism:** Directed handoff graph, recurrence intervals, Markov baselines and count-preserving permutations.
- **Distinction:** Tests whether many POVs are organized around recurring anchor perspectives.
- **Dependencies:** Ordered POV segments.
- **Uncertainty:** Editor/chapter boundaries and character frequency can create apparent patterns.
- **Discriminator:** Compare handoff motifs and anchor-return gaps to frequency-preserving shuffled sequences.

## Family B: Long-range architecture

### I05 — Convergence versus spotlight
- **Origin:** P12/P15.
- **Transformation:** Separate a chapter's many viewpoints from independently converging story threads.
- **Mechanism:** Compare POV diversity with verified plot-thread labels and location transitions.
- **Distinction:** High POV count alone cannot certify plot convergence.
- **Dependencies:** Adjudicated plot-thread and place concordance.
- **Uncertainty:** POV switches can occur within one thread.
- **Discriminator:** Annotate a stratified sample of high- and low-POV chapters; test agreement and false convergence rate.

### I06 — Echo-to-handoff alignment
- **Origin:** P14/P18.
- **Transformation:** Connect exact long-range textual recurrence to changes in narrative viewpoint.
- **Mechanism:** Locate repeated-paragraph hashes within chapter and POV spans, then compare offsets to matched random placements.
- **Distinction:** Joins verifiable textual identity to narrative attention without declaring foreshadowing.
- **Dependencies:** Reversible paragraph offsets and POV-to-passage alignment.
- **Uncertainty:** Shared editorial boilerplate and uncertain POV boundaries.
- **Discriminator:** Boilerplate-filtered, length-matched nulls plus contextual annotation.

### I07 — Spatial scheduling
- **Origin:** P06/P09.
- **Transformation:** Treat geography as a constraint on POV sequencing rather than a decorative map.
- **Mechanism:** Link verified character routes and event locations to narrative switches.
- **Distinction:** Tests whether spatial separation predicts narrative separation.
- **Dependencies:** Geocoded location/event concordance and travel-time uncertainty.
- **Uncertainty:** Locations may be implied or unavailable.
- **Discriminator:** Compare transitions among spatially separated vs colocated threads, with matched book-position controls.

### I08 — Predicting return, not merely next POV
- **Origin:** P08/P31.
- **Transformation:** Change the prediction target from the next viewpoint label to *when an established viewpoint returns*.
- **Mechanism:** Survival/hazard models using gap age, prior POV share, book position, and chapter length.
- **Distinction:** Makes absence measurable without treating it as character disappearance.
- **Dependencies:** Consistent censored intervals and chronological train/test splits.
- **Uncertainty:** Time-to-return may be intrinsically nonstationary across series phases.
- **Discriminator:** Held-out later volumes; compare against simple frequency and age-of-gap baselines.

## Family C: Epistemic and product architecture

### I09 — An evidence-linked fan atlas
- **Origin:** P25/P26/P30.
- **Transformation:** Replace an attractive static visualization with an explorable argument where every highlight has evidence and a counterexample.
- **Mechanism:** Connect a chapter/POV interactive view to measurement definitions, offsets, null controls and provenance.
- **Distinction:** Fans can inspect why a claim holds, not merely see its graphic.
- **Dependencies:** Export-safe aggregate data, source IDs, responsive UI and offline checks.
- **Uncertainty:** Complexity may overwhelm casual readers.
- **Discriminator:** Task test: locate a character's longest POV silence, explain a caveat, and reproduce one count without instruction.

### I10 — Competing chronologies as first-class data
- **Origin:** P05/P06/P24/B04.
- **Transformation:** Replace the assumed single canonical order with three explicit timelines: story chronology, publication order and chosen reading order.
- **Mechanism:** Separate chapter identity from chronology indices; expose order-dependent metrics.
- **Distinction:** Turns source-order sensitivity into an explicit research instrument.
- **Dependencies:** Bibliographic publication dates and independently supported in-world event ordering.
- **Uncertainty:** In-world ordering can be partial or disputed.
- **Discriminator:** Check which findings are invariant across supported orderings, especially Lan's apparent 568-chapter gap.

## Interactions and non-dominated directions

- I02 + I10: a chronology-aware silence atlas, immediately useful and falsifiable.
- I01 + I03: measure whether expanding ensemble attention follows long external observation of established characters.
- I04 + I05: distinguish scheduling motifs from genuine plot-thread convergence.
- I06 + I09: transform exact echoes into an evidence-first fan experience.
- I07 + I08: test whether spatial thread separation predicts the timing of POV return.

**Non-dominated options:** I02 (low dependency, immediate falsification); I01 (high fan interest, alias work); I05 (strong structural claim, annotation-heavy); I09 (product value, UX work); I10 (methodological integrity, bibliography). No single option dominates all criteria.

## Premortem and next discriminating evidence

Failure modes: prequel order creates false return intervals; POV owner labels conflate aliases; longer chapters produce more apparent debuts; published visuals overstate inference; outside-series controls never arrive. Test in this order: (1) order-sensitive POV-gap calculations, (2) equal-token ensemble baselines, (3) alias-concordance sample, (4) stratified human plot-thread validation, (5) fan usability study. Stop promoting narrative claims until their separate evidence contracts pass.
