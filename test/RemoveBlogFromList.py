from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
import unittest, time, re

class RemoveBlogFromList(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "http://osblogaggregator.appspot.com/"
        self.verificationErrors = []
    
    def test_remove_blog_from_list(self):
        driver = self.driver
        driver.get(self.base_url + "/blogs.jsp")
        driver.find_element_by_css_selector("ul.login.blue > li > a.current > span").click()
        time.sleep(3)
        driver.find_element_by_id("Email").clear()
        driver.find_element_by_id("Email").send_keys("ceroblogtest@gmail.com")
        time.sleep(3)
        driver.find_element_by_id("Passwd").clear()
        driver.find_element_by_id("Passwd").send_keys("BlogTest1")
        driver.find_element_by_id("signIn").click()
        time.sleep(3)
        driver.find_element_by_xpath("//h3[@id='1']/span[2]/a[2]/span").click()
        time.sleep(3)
        driver.find_element_by_xpath("(//button[@type='button'])[3]").click()
        time.sleep(3)
        print '123'
        if (driver.find_element_by_xpath("//h3[@id='1']/span[2]/a[2]/span")):
            print "Error: list kustutamata!"
        else:
            print "list kustutatud!"

            
    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException, e: return False
        return True
    
    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
