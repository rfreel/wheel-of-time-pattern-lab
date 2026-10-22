import csv,unittest,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
from analyze_pov import compute
class TestPOV(unittest.TestCase):
 def test_reproduction(self):
  computed,segments=compute()
  with (ROOT/'data/aggregate/pov_chapter_metrics.csv').open(newline='',encoding='utf-8') as f:stored=list(csv.DictReader(f))
  self.assertEqual(len(computed),704)
  self.assertEqual(len(segments),1379)
  self.assertEqual([{k:str(v) for k,v in row.items()} for row in computed],stored)
 def test_last_battle(self):
  rows,_=compute()
  r=next(x for x in rows if x['chapter_id']=='b14:c37')
  self.assertEqual((r['pov_segments'],r['distinct_pov'],r['new_pov_characters']), (72,30,11))
  self.assertEqual(r['effective_pov_voices'],'22.511231')
  self.assertEqual(sorted((x['pov_segments'] for x in rows),reverse=True)[:2],[72,21])
if __name__=='__main__':unittest.main()
