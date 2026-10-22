#!/usr/bin/env python3
"""Book POV word concentration, excluding non-character 'Quote' segments."""
import csv,collections,math
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def compute():
 with (ROOT/'data/aggregate/pov_segments.csv').open(newline='',encoding='utf-8') as f:segments=list(csv.DictReader(f))
 rows=[]
 for b in range(15):
  ss=[s for s in segments if int(s['b'])==b and s['epub_chapter_available']=='1' and s['p']!='Quote']
  counts=collections.Counter()
  for s in ss:counts[s['p']]+=int(s['w'])
  n=sum(counts.values())
  H=-sum((v/n)*math.log2(v/n) for v in counts.values()) if n else 0
  rows.append({'book':str(b),'pov_segments_excluding_quote':str(len(ss)),'distinct_character_pov':str(len(counts)),'pov_words_excluding_quote':str(n),'effective_voices':f'{2**H:.6f}','largest_voice_share':f'{max(counts.values())/n:.6f}' if n else '0.000000','largest_voice':max(counts,key=counts.get) if n else ''})
 return rows
if __name__=='__main__':
 rows=compute()
 with (ROOT/'data/aggregate/pov_book_metrics.csv').open('w',newline='',encoding='utf-8') as f:
  w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
