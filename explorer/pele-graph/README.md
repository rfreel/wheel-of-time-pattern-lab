# The Pattern / Graph Atlas

A complete, source-typed graph browser for the existing Wheel of Time Pattern Lab research graph, **rendered using [Pele](https://github.com/obsidianmd/pele) 1.10.0**. This is an independent fan-research tool with full-series structural spoilers. No novel prose, EPUB, or private character-belief claims are included.

## Open

**Best portable version:** open `The_Pattern_Graph_Standalone.html` directly in a modern browser, including offline. It embeds Pele, all 6,713 nodes, all 30,817 edges, the styling and graph logic. No network is required.

**Developer edition:** run `python -m http.server 8000` from this directory and open http://127.0.0.1:8000 . The modular edition works with no external dependencies; `vendor/pele.global.js` is bundled. The page also works with ordinary file navigation if your browser permits local relative scripts.

### Explore

- **Whole architecture:** every source node/edge condensed into 10 entity families and 11 typed relationships, with counts calculated directly from original edge rows.
- **Trace a node:** search all 6,713 source nodes, then browse all original incident edges. Pele displays 18 at a time to keep diagrams readable; the evidence ledger separately pages through the complete list.
- **Follow a path:** perform an actual shortest-path search through the complete graph, respecting the evidence-layer filters. Path length is measured in **graph hops** and cannot establish causal, social or narrative proximity.
- **Layers:** choose source structure, curated indexes, lexical candidates, or pending human review tasks. Hiding a layer removes it only from the current view, not the stored graph.
- **Pele actions:** graph nodes have links back to the exact node ID. You can pinch/zoom rendered diagrams, export SVG, and copy the Mermaid code for the displayed slice.

## Full source coverage

| Node family | Count |
|---|---:|
| Source books | 15 |
| Chapters | 704 |
| Private text-chunk locators (no prose) | 4,094 |
| Curated POV-owner labels | 153 |
| Curated timeline events | 384 |
| Timeline participant labels (not reconciled identities) | 8 |
| Curated location labels | 129 |
| Lexical magic terms | 14 |
| Exact paragraph echo pairs | 12 |
| Source-located, **unadjudicated** review tasks | 1,200 |
| **All nodes** | **6,713** |

| Relationship class | Edges |
|---|---:|
| Source structure / exact echo placements | 4,822 |
| Curated index assignments | 2,526 |
| Lexical candidates | 22,269 |
| Not-yet-reviewed tasks | 1,200 |
| **All directed edges** | **30,817** |

Pele's **default** source-size limit is 50,000 characters and flowchart edge limit is 5,000 (see [Pele security](https://pele.run/security)). For legibility and deterministic interactive performance, this app builds bounded **Pele diagrams** from the full in-memory graph. It does not claim Pele renders 30,817 edges in one SVG. The whole graph is searchable and navigable, not all drawn on a single canvas.

## Evidence and claims

- **Source structure:** chapter–book, chunk–chapter, exact occurrence locators. Links reproduce indexed structure, not necessarily causal narrative edges.
- **Curated indexes:** POV assignments and Wheeloftimelines event/place/label associations. Source-reported associations, *not* independently adjudicated identities or chronology.
- **Lexical candidates:** words/names detected by a regex. Neither an interaction nor a character's internal knowledge.
- **Review queue:** task locations that currently have **zero independently adjudicated semantic propositions**.

The graph does **not** have verified KNOWS, CAUSES, FORESHADOWS, or MAGIC_RULE edges. Do not infer them from connectivity or visual proximity.

## Reproduce

Source archive: `WOT_Knowledge_v2_Public_Safe.zip`, member `v2/public_safe/wot_graph_v2.graphml` (a separately delivered earlier text-free research archive). The original GraphML is included under `assets/original-graph.graphml` in the ZIP for independent audits.

```bash
python scripts/build.py /path/to/WOT_Knowledge_v2_Public_Safe.zip
python -m unittest discover -s tests -v
python scripts/browser_smoke.py
```

The builder uses `networkx`. Unit tests use the standard library and `networkx`. Browser smoke tests use Playwright + Chromium, and inject the local JS/CSS scripts directly into the browser (because this execution sandbox blocks navigation, not because the app requires a server).

## Licensing

Original graph material has separately attributed third-party sources. See [ATTRIBUTION.md](ATTRIBUTION.md). Application code is MIT licensed. Bundled Pele is version **1.10.0**, MIT; its license is preserved as `vendor/PELE-LICENSE.txt`. No prose from the novels is published.
