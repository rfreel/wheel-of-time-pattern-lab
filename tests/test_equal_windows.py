import csv,unittest,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
from equal_token_voices import compute
class TestWindows(unittest.TestCase):
 def test_reproduce(self):
  rows,meta=compute()
  with (ROOT/'data/aggregate/pov_equal_token_windows.csv').open(newline='',encoding='utf-8') as f:stored=list(csv.DictReader(f))
  self.assertEqual(rows,stored)
  self.assertEqual((len(rows),meta['total_pov_tokens'],meta['remainder_tokens']),(42,4239677,39677))
  self.assertEqual(rows[0]['effective_voices'],'1.118302')
  self.assertEqual(rows[-1]['effective_voices'],'22.750125')
  self.assertEqual(meta['terminal_100k_anchored_to_series_end']['effective_voices'],'25.864610')
  self.assertEqual(meta['complete_windows']*100000+meta['remainder_tokens'],meta['total_pov_tokens'])
if __name__=='__main__':unittest.main()
