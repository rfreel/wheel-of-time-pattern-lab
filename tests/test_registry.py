import unittest
import subprocess,sys
from pathlib import Path
class TestRegistry(unittest.TestCase):
 def test_registry(self):
  root=Path(__file__).resolve().parents[1]
  result=subprocess.run([sys.executable,str(root/"scripts/check.py")],capture_output=True,text=True)
  self.assertEqual(result.returncode,0,result.stderr)
if __name__=="__main__": unittest.main()
