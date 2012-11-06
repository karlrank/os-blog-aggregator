from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
import unittest, time, re

class AddBlogToList(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.base_url = "http://osblogaggregator.appspot.com/"
        self.verificationErrors = []
    
    def test_add_blog_to_list(self):
        driver = self.driver
        driver.get(self.base_url + "/blogs.jsp")
        driver.find_element_by_css_selector("ul.login.blue > li > a.current > span").click()
        driver.find_element_by_id("Email").clear()
        driver.find_element_by_id("Email").send_keys("ceroblogtest@gmail.com")
        driver.find_element_by_id("Passwd").clear()
        driver.find_element_by_id("Passwd").send_keys("BlogTest1")
        driver.find_element_by_id("signIn").click()
        time.sleep(3)
        driver.find_element_by_css_selector("a.current > span").click()
        time.sleep(3)
        driver.find_element_by_css_selector("span.ui-button-text").click()
        time.sleep(3)
        driver.find_element_by_id("blogUrl").clear()
        driver.find_element_by_id("blogUrl").send_keys("http://our.blog.com/feed/")
        driver.find_element_by_css_selector("span.ui-button-text").click()
        if (driver.find_element_by_xpath("(//button[@type='button'])[7]")):
            print "blogi listi lisatud"
        else:
            print "blogi lisamine ebaõnnestus!"
        driver.find_element_by_css_selector("a[title=\"Sign out\"] > span").click()
    
    def is_element_present(self, how, what):
        try: self.driver.find_element(by=how, value=what)
        except NoSuchElementException, e: return False
        return True
    
    def tearDown(self):
        self.driver.quit()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
