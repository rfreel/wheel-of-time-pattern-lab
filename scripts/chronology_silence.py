#!/usr/bin/env python3
"""Order-sensitive POV return intervals; no novel prose, standard library only."""
import csv, collections
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
ORDERS=('prequel_first','publication','main_series')
def book_order(mode):
 if mode=='prequel_first':return list(range(15))
 if mode=='publication':return list(range(1,11))+[0]+list(range(11,15))
 if mode=='main_series':return list(range(1,15))
 raise ValueError(mode)
def read(name):
 with (ROOT/'data/aggregate'/name).open(newline='',encoding='utf-8') as f:return list(csv.DictReader(f))
def compute():
 chapters=read('chapters.csv');pov=read('pov_segments.csv')
 assert len(chapters)==704 and len(pov)==1379
 by_chapter=collections.defaultdict(set)
 for s in pov:
  if s['epub_chapter_available']=='1' and s['p']!='Quote':by_chapter[s['chapter_id']].add(s['p'])
 gaps=[];summaries=[];coverage={}
 for mode in ORDERS:
  order={b:i for i,b in enumerate(book_order(mode))}
  seq=sorted((c for c in chapters if int(c['book']) in order),key=lambda c:(order[int(c['book'])],int(c['chapter_order'])))
  prefix=[0]
  for c in seq:prefix.append(prefix[-1]+int(c['words']))
  where=collections.defaultdict(list)
  for idx,c in enumerate(seq):
   for name in by_chapter[c['chapter_id']]:where[name].append(idx)
  coverage[mode]={'chapters':len(seq),'epub_tokens':prefix[-1],'character_pov_labels':len(where)}
  for name in sorted(where):
   indices=where[name];own=[]
   for a,b in zip(indices,indices[1:]):
    start,end=seq[a],seq[b]
    item={'order':mode,'character':name,'start_chapter_id':start['chapter_id'],'start_book':start['title'],'start_label':start['label'],'end_chapter_id':end['chapter_id'],'end_book':end['title'],'end_label':end['label'],'intervening_chapters':str(b-a-1),'intervening_epub_tokens':str(prefix[b]-prefix[a+1]),'start_global_index':str(a),'end_global_index':str(b)}
    gaps.append(item);own.append(item)
   best=max(own,key=lambda r:(int(r['intervening_chapters']),int(r['intervening_epub_tokens']))) if own else None
   summaries.append({'order':mode,'character':name,'pov_chapters':str(len(indices)),'observed_return_intervals':str(len(own)),'max_intervening_chapters':best['intervening_chapters'] if best else '','max_intervening_epub_tokens':best['intervening_epub_tokens'] if best else '','gap_start_chapter_id':best['start_chapter_id'] if best else '','gap_start_book':best['start_book'] if best else '','gap_end_chapter_id':best['end_chapter_id'] if best else '','gap_end_book':best['end_book'] if best else '','censored_no_observed_return':str(len(own)==0).lower()})
 return gaps,summaries,coverage
if __name__=='__main__':
 gaps,summary,_=compute()
 for name,rows in [('chronology_gaps.csv',gaps),('chronology_character_summary.csv',summary)]:
  with (ROOT/'data/aggregate'/name).open('w',newline='',encoding='utf-8') as f:
   w=csv.DictWriter(f,fieldnames=list(rows[0]),lineterminator='\n');w.writeheader();w.writerows(rows)
 print(len(gaps),len(summary))
