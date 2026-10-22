from pathlib import Path
import csv, json
r=Path(__file__).resolve().parents[1]
a=json.loads((r/'data/source_manifest.json').read_text())
assert a['status']=='PARTIAL_CURATED_METADATA_IMPORT'
assert all(not s['imported'] for s in a['sources'])
q=(r/'research/questions.yaml').read_text()
assert all(f'id: R{i:02}' in q for i in range(1,11))
assert len(list((r/'experiments').glob('EXP-*/experiment.json')))==4
assert not list(r.rglob('*.epub'))
with (r/'data/aggregate/chapters.csv').open(newline='',encoding='utf-8') as f:chapters=list(csv.DictReader(f))
with (r/'data/aggregate/pov_segments.csv').open(newline='',encoding='utf-8') as f:pov=list(csv.DictReader(f))
assert len(chapters)==704 and len(pov)==1379
assert sum(int(x['words']) for x in chapters)==4355388
assert sum(int(x['paragraphs']) for x in chapters)==82094
assert sum(x['epub_chapter_available']=='0' for x in pov)==1
assert next(x for x in pov if x['epub_chapter_available']=='0')['chapter_id']=='b01:cRavens'
print('PASS: source registry, 704 chapters, 1,379 POV segments, exclusions')
