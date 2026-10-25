# Four-plate pencil-drawn experiment

Technique: inspired by the public [Pele Art Diagrams](https://pele-art-diagrams.vercel.app/) reference, which uses Mermaid layout and JavaScript pen-like rendering. The first three figures here are custom deterministic Canvas plots, not Pele outputs: using layout-accurate scales matters for quantitative evidence. The fourth figure calls Pele 1.6.0 (pinned CDN) if available, animates the SVG strokes, and otherwise shows a complete offline schematic.

Source values: ten exact-name matched first POV introductions in *The Last Battle* (270 prior indexed appearances; median wait 592 intervening chapters); within-book eligible chapter handoffs 206/496 vs 9/143; lexical JS means 0.257533832 and 0.294350592 bits; Last Battle 72 curated POV segments, 30 distinct POV labels and 11 first-time main-series POV labels. See the main essay's methods for denominators, source-index disagreements and observational limitations.

Verification: local Chromium offline checks at 1440×900 and 393×852 passed, including nonblank graphics, interactions, PNG export, and no horizontal overflow. A stand-in SVG renderer contract smoke test passed, **not** the real external Pele renderer (network unavailable). The zip archive includes scripts, screenshot previews, SHA-256 manifest and tests. No novel prose or bundled font files are published.

**Status:** interactive drawing prototype verified offline. Literary hypotheses and online Pele rendering not established by these tests.
