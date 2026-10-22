import unittest,csv,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
from chronology_silence import compute,book_order
class TestChronology(unittest.TestCase):
 def test_orders(self):
  self.assertEqual(book_order('publication'),list(range(1,11))+[0]+list(range(11,15)))
  self.assertEqual(book_order('main_series'),list(range(1,15)))
 def test_reproduce(self):
  gaps,summary,coverage=compute()
  self.assertEqual((len(gaps),len(summary)),(3143,465))
  for name,rows in [('chronology_gaps.csv',gaps),('chronology_character_summary.csv',summary)]:
   with (ROOT/'data/aggregate'/name).open(newline='',encoding='utf-8') as f:stored=list(csv.DictReader(f))
   self.assertEqual(rows,stored)
  self.assertEqual([coverage[k]['chapters'] for k in ('prequel_first','publication','main_series')],[704,704,677])
 def test_lan_counterexample(self):
  _,summary,_=compute()
  observed=[x['max_intervening_chapters'] for x in summary if x['character']=='Lan Mandragoran']
  self.assertEqual(observed,['568','92','18'])
 def test_no_imputed_return(self):
  _,summary,_=compute()
  self.assertTrue(any(x['pov_chapters']=='1' for x in summary))
  self.assertTrue(all(x['max_intervening_chapters']=='' for x in summary if x['pov_chapters']=='1'))
if __name__=='__main__':unittest.main()
