from selenium import selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.common.exceptions import NoSuchElementException
import unittest, time, re

class UserLogsInAndOut(unittest.TestCase):

    def setUp(self):

        self.driver = webdriver.Firefox()

        self.driver.implicitly_wait(30)

        self.base_url = "http://www.3.osblogaggregator.appspot.com/"

        self.verificationErrors = []

    
    def test_user_logs_in_and_out(self):

        driver = self.driver

        driver.get(self.base_url + "/")

        driver.find_element_by_css_selector("ul.login.blue > li > a.current > span").click()

        driver.find_element_by_id("Email").clear()
        driver.find_element_by_id("Email").send_keys("ceroblogtest@gmail.com")
        driver.find_element_by_id("Passwd").clear()
        driver.find_element_by_id("Passwd").send_keys("BlogTest1")
        driver.find_element_by_id("signIn").click()
        time.sleep(3)
        if (driver.find_element_by_css_selector("a[title=\"Sign out\"] > span")):
            print "logging in works"
        else :
            print "logging in isn't working!"
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
