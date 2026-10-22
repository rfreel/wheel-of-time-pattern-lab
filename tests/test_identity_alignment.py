import unittest,tempfile,json,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'scripts'))
from audit_identity_alignment import compute
class TestIdentity(unittest.TestCase):
 def test_exact_only_no_automatic_merge(self):
  with tempfile.TemporaryDirectory() as d:
   p=Path(d)/'appearances.json'
   p.write_text(json.dumps([{'name':'Mat Cauthon'},{'name':'Rand al\'Thor'}]),encoding='utf-8')
   summary,unresolved=compute(p)
   self.assertGreater(summary['unresolved'],0)
   self.assertTrue(any(x['pov_label']=='Matrim Cauthon' and x['identity_status']=='UNVERIFIED' for x in unresolved))
if __name__=='__main__':unittest.main()
