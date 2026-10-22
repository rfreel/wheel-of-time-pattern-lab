import csv,statistics,unittest
from pathlib import Path
P=Path(__file__).resolve().parents[1]/'data/aggregate/last_battle_exposure.csv'
class TestLastBattleExposure(unittest.TestCase):
 def test_first_pov_exposure(self):
  with P.open(newline='',encoding='utf8') as f: rows=list(csv.DictReader(f))
  self.assertEqual(len(rows),10)
  self.assertTrue(all(x['first_pov_id']=='b14:c37' for x in rows))
  self.assertEqual(sum(int(x['prior_appearance_chapters']) for x in rows),270)
  self.assertEqual(statistics.median(int(x['intervening_chapters']) for x in rows),592)
  self.assertEqual(sum(x['first_pov_in_appearance_index']=='0' for x in rows),2)
  self.assertEqual(next(x for x in rows if x['character']=="Tam al'Thor")['intervening_chapters'],'661')
if __name__=='__main__':unittest.main()
