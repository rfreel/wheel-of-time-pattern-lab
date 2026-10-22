#!/usr/bin/env python3
"""Compare curated POV owner labels with an external appearance name inventory.
No fuzzy suggestion is an accepted identity merge.
"""
import argparse,csv,json,difflib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def compute(appearance_json):
 with (ROOT/'data/aggregate/pov_segments.csv').open(newline='',encoding='utf-8') as f:
  labels=sorted({r['p'] for r in csv.DictReader(f) if r['p']!='Quote'})
 appearances={r['name'] for r in json.loads(Path(appearance_json).read_text(encoding='utf-8'))}
 unresolved=[{'pov_label':name,'nearest_lexical_candidate':(difflib.get_close_matches(name,appearances,n=1,cutoff=.5) or [''])[0],'identity_status':'UNVERIFIED'} for name in labels if name not in appearances]
 return {'pov_labels':len(labels),'appearance_names':len(appearances),'exact_name_matches':len(labels)-len(unresolved),'unresolved':len(unresolved)},unresolved
if __name__=='__main__':
 p=argparse.ArgumentParser()
 p.add_argument('--appearance-json',required=True)
 p.add_argument('--output',required=True)
 args=p.parse_args()
 counts,rows=compute(args.appearance_json)
 with Path(args.output).open('w',newline='',encoding='utf-8') as f:
  w=csv.DictWriter(f,fieldnames=['pov_label','nearest_lexical_candidate','identity_status'],lineterminator='\n');w.writeheader();w.writerows(rows)
 print(json.dumps(counts,sort_keys=True))
