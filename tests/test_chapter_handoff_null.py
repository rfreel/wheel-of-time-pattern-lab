import unittest,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
from chapter_handoff_null import compute
class TestChapterHandoff(unittest.TestCase):
 def test_chapter_block_permutation(self):
  x=compute();z=x['era_contrast']
  self.assertEqual((z['observed_early_handoffs'],z['possible_early'],z['observed_late_handoffs'],z['possible_late']),(206,502,10,159))
  self.assertLess(z['p_one_sided_early_more'],0.001)
  self.assertEqual(len(x['book_results']),14)
  self.assertEqual(x['book_results'][-1]['observed_same_pov_chapter_handoffs'],1)
if __name__=='__main__':unittest.main()
