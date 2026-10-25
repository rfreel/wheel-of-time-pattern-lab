#!/usr/bin/env python3
"""Reproduce the essay's measurements from PRIVATE source summaries; no EPUB prose."""
import argparse, collections, csv, io, json, math, statistics, zipfile
from pathlib import Path
import numpy as np
import statsmodels.api as sm
def read_csv(content):
    return list(csv.DictReader(io.StringIO(content)))
def run(core,pov,exposure):
    with zipfile.ZipFile(core) as z:
        base='WOT_Article_Core_v1/data/'
        meta=read_csv(z.read(base+'chapter_metadata.csv').decode('utf8'))
        adj=read_csv(z.read(base+'adjacent_chapter_js.csv').decode('utf8'))
    with open(pov,encoding='utf8',newline='') as f: seg=list(csv.DictReader(f))
    with open(exposure,encoding='utf8',newline='') as f: debut=list(csv.DictReader(f))
    assert len(debut)==10 and sum(int(d['prior_appearance_chapters']) for d in debut)==270
    assert statistics.median(int(d['intervening_chapters']) for d in debut)==592
    byid={r['chapter_id']:r for r in meta}
    bychap=collections.defaultdict(list)
    for r in seg:
        if r['epub_chapter_available']=='1' and r['p'] not in {'Quote','Narrator','Seanchan Rider'}:
            bychap[r['chapter_id']].append(r['p'])
    recs=[]
    for r in adj:
        b=int(r['book'])
        if not 1<=b<=14:continue
        a,z=r['from_chapter'],r['to_chapter']
        if not bychap.get(a) or not bychap.get(z):continue
        wa,wz=int(byid[a]['words']),int(byid[z]['words'])
        if min(wa,wz)<2000:continue
        recs.append((b,int(bychap[a][-1]==bychap[z][0]),float(r['js_divergence_bits']),math.log((wa+wz)/2),abs(math.log(wa/wz))))
    def group(books):
        subset=[r for r in recs if r[0] in books]
        return {'boundaries':len(subset),'same_pov':sum(r[1] for r in subset),'mean_js':statistics.mean(r[2] for r in subset)}
    early,late=group(set(range(1,12))),group({12,13,14})
    assert (early['boundaries'],early['same_pov'],late['boundaries'],late['same_pov'])==(496,206,143,9)
    x=np.array([[1,int(r[0]>=12),r[1],r[3],r[4]] for r in recs])
    fit=sm.OLS([r[2] for r in recs],x).fit(cov_type='cluster',cov_kwds={'groups':[r[0] for r in recs]})
    assert abs(float(fit.params[1])-.020241)<.0001
    assert abs(float(fit.params[2])+.032864)<.0001
    return {'exposure':{'characters':10,'prior_appearances':270,'median_intervening_chapters':592},'early':early,'late':late,'late_OLS_coef':float(fit.params[1]),'same_pov_OLS_coef':float(fit.params[2])}
if __name__=='__main__':
    p=argparse.ArgumentParser()
    p.add_argument('--core',required=True)
    p.add_argument('--pov',required=True)
    p.add_argument('--exposure',required=True)
    a=p.parse_args()
    print(json.dumps(run(a.core,a.pov,a.exposure),indent=2))
