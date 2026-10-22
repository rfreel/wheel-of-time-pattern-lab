#!/usr/bin/env python3
"""Exploratory chapter-block permutation test for POV handoffs; stdlib only.
Preserves each chapter's internal POV sequence, unlike an invalid segment shuffle.
"""
import csv,collections,random,statistics,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
N=10000;SEED=20261021;EXCLUDE={'Quote','Narrator','Seanchan Rider'}
def compute():
 with (ROOT/'data/aggregate/pov_segments.csv').open(newline='',encoding='utf-8') as f:rows=list(csv.DictReader(f))
 books={}
 for b in range(1,15):
  s=[x for x in rows if int(x['b'])==b and x['epub_chapter_available']=='1' and x['p'] not in EXCLUDE]
  chapters=[]
  for x in s:
   if not chapters or chapters[-1][0]!=x['chapter_id']:chapters.append((x['chapter_id'],[x['p']]))
   else:chapters[-1][1].append(x['p'])
  books[b]=chapters
 def count(ch):return sum(a[1][-1]==b[1][0] for a,b in zip(ch,ch[1:]))
 rng=random.Random(SEED);perbook={b:[] for b in books}
 for i in range(N):
  for b,ch in books.items():
   t=ch.copy();rng.shuffle(t);perbook[b].append(count(t))
 out=[]
 for b,ch in books.items():
  obs=count(ch);null=perbook[b]
  out.append({'book':b,'chapters_with_pov':len(ch),'observed_same_pov_chapter_handoffs':obs,'null_mean':statistics.mean(null),'p_one_sided_more':(1+sum(x>=obs for x in null))/(N+1),'p_one_sided_less':(1+sum(x<=obs for x in null))/(N+1)})
 early=list(range(1,12));late=list(range(12,15))
 observed_early=sum(count(books[b]) for b in early);observed_late=sum(count(books[b]) for b in late)
 possible_early=sum(len(books[b])-1 for b in early);possible_late=sum(len(books[b])-1 for b in late)
 contrast=observed_early/possible_early-observed_late/possible_late
 nullcontrast=[sum(perbook[b][i] for b in early)/possible_early-sum(perbook[b][i] for b in late)/possible_late for i in range(N)]
 return {'method':'within-book chapter-block shuffling, preserving within-chapter POV order','seed':SEED,'permutations':N,'excluded_labels':sorted(EXCLUDE),'book_results':out,'era_contrast':{'early_books':'1..11','late_books':'12..14','observed_early_handoffs':observed_early,'possible_early':possible_early,'observed_late_handoffs':observed_late,'possible_late':possible_late,'rate_difference':contrast,'null_mean':statistics.mean(nullcontrast),'p_one_sided_early_more':(1+sum(x>=contrast for x in nullcontrast))/(N+1)}}
if __name__=='__main__':
 out=compute()
 (ROOT/'research/experiments/CHAPTER_HANDOFF_NULL.json').write_text(json.dumps(out,indent=2)+'\n',encoding='utf-8')
 print(json.dumps(out['era_contrast'],indent=2))
