#!/usr/bin/env python3
"""Deterministic source-defined POV chapter metrics; no novel prose."""
import csv, math, collections, json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def read(name):
 with (ROOT/'data'/'aggregate'/name).open(newline='',encoding='utf-8') as f:return list(csv.DictReader(f))
def compute():
 chapters=read('chapters.csv');segments=read('pov_segments.csv')
 by=collections.defaultdict(list)
 for row in segments:
  if row['epub_chapter_available']=='1':by[row['chapter_id']].append(row)
 seen=set();out=[]
 for c in sorted(chapters,key=lambda x:(int(x['book']),int(x['chapter_order']))):
  ss=by[c['chapter_id']];bywords=collections.Counter()
  for s in ss:bywords[s['p']]+=int(s['w'])
  total=sum(bywords.values())
  h=-sum((v/total)*math.log2(v/total) for v in bywords.values()) if total else 0
  new=sorted(set(bywords)-seen)
  out.append({'chapter_id':c['chapter_id'],'book':c['book'],'label':c['label'],'epub_words':c['words'],'pov_segments':len(ss),'distinct_pov':len(bywords),'new_pov_characters':len(new),'new_pov_names':';'.join(new),'pov_words':total,'effective_pov_voices':f'{2**h:.6f}','switches':sum(a['p']!=b['p'] for a,b in zip(ss,ss[1:]))})
  seen.update(bywords)
 return out,segments
if __name__=='__main__':
 rows,_=compute()
 with (ROOT/'data'/'aggregate'/'pov_chapter_metrics.csv').open('w',newline='',encoding='utf-8') as f:
  w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
 print('generated',len(rows),'chapters')
