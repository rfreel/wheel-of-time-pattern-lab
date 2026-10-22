import unittest
from pathlib import Path
class TestChronologyHTML(unittest.TestCase):
 def test_offline_and_accessible(self):
  p=Path(__file__).resolve().parents[1]/'explorer/chronology.html'
  t=p.read_text(encoding='utf-8')
  self.assertIn('The silence',t)
  self.assertIn('Lan Mandragoran',t)
  self.assertIn('aria-pressed',t)
  self.assertIn('No return',t)
  self.assertNotIn('<script src=',t)
  self.assertNotIn('https://',t)
if __name__=='__main__':unittest.main()
