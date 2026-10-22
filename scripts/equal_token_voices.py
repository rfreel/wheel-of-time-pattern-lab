#!/usr/bin/env python3
"""100,000-POV-word windows. Splits segment counts across boundaries, not prose."""
import csv,math,collections,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
WIDTH=100000
def read():
 with (ROOT/'data/aggregate/pov_segments.csv').open(newline='',encoding='utf-8') as f:return list(csv.DictReader(f))
def stats(counts):
 n=sum(counts.values())
 H=-sum((v/n)*math.log2(v/n) for v in counts.values())
 top=max(counts,key=counts.get)
 return {'distinct_pov':str(len(counts)),'effective_voices':f'{2**H:.6f}','top_pov':top,'top_share':f'{counts[top]/n:.6f}'}
def compute():
 raw=read()
 segments=[s for s in raw if int(s['b'])>0 and s['epub_chapter_available']=='1' and s['p']!='Quote']
 windows=[];counts=collections.Counter();remaining=WIDTH;first=None;last=None;total=0
 for s in segments:
  count=int(s['w']);total+=count
  while count:
   take=min(count,remaining)
   if first is None:first=s['segment_id']
   last=s['segment_id'];counts[s['p']]+=take;count-=take;remaining-=take
   if not remaining:
    windows.append({'window':str(len(windows)),'tokens':str(WIDTH),**stats(counts),'start_segment':first,'end_segment':last})
    counts=collections.Counter();remaining=WIDTH;first=None;last=None
 tail=collections.Counter();n=WIDTH
 for s in reversed(segments):
  if not n:break
  take=min(n,int(s['w']));tail[s['p']]+=take;n-=take
 meta={'main_series_books':14,'total_pov_tokens':total,'complete_windows':len(windows),'remainder_tokens':0 if remaining==WIDTH else WIDTH-remaining,'excluded_non_character_segments':sum(s['p']=='Quote' for s in raw),'excluded_prequel_segments':sum(int(s['b'])==0 for s in raw),'terminal_100k_anchored_to_series_end':{'tokens':WIDTH,**stats(tail)},'terminal_window_overlaps_last_complete_window':True}
 return windows,meta
if __name__=='__main__':
 rows,meta=compute()
 with (ROOT/'data/aggregate/pov_equal_token_windows.csv').open('w',newline='',encoding='utf-8') as f:
  w=csv.DictWriter(f,fieldnames=list(rows[0]),lineterminator='\n');w.writeheader();w.writerows(rows)
 (ROOT/'research/experiments/EQUAL_TOKEN_WINDOWS.json').write_text(json.dumps(meta,indent=2)+'\n',encoding='utf-8')
 print(len(rows))
