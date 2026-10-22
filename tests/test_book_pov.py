import unittest,csv,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
from analyze_book_pov import compute
class TestBookPOV(unittest.TestCase):
 def test_exact_reproduction(self):
  with (ROOT/'data/aggregate/pov_book_metrics.csv').open(newline='',encoding='utf-8') as f:stored=list(csv.DictReader(f))
  self.assertEqual(compute(),stored)
  self.assertEqual(len(stored),15)
 def test_ensemble_contrast(self):
  rows=compute()
  self.assertEqual((rows[1]['distinct_character_pov'],rows[14]['distinct_character_pov']),('5','48'))
  self.assertEqual((rows[1]['effective_voices'],rows[14]['effective_voices']),('1.808404','22.561752'))
if __name__=='__main__':unittest.main()
