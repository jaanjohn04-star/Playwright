"""
------------------------------------------------------------------------------------------
Job: test_orbit_schedule_selenium.py
Description:
This Selenium test suite automates verification of the static 'Orbit - Schedule Missions' HTML page.
It checks critical UI elements including the page title, header logo and icons, sidebar navigation 
(with active state), main content (title, search box, weather link), the mission schedule table 
(headers, row data, status indicators, and action icons), as well as footer elements like the calendar 
download link, robot time display, and version number.
Additionally, it performs basic interaction tests (clicking icons and typing in the search box) to ensure 
the page remains stable with no JavaScript errors.

Jaan John
------------------------------------------------------------------------------------------
"""

# Import necessary modules for testing
import unittest                  # Python's built-in unit testing framework
import time                      # Used for short pauses (e.g., observing interactions)
import os                        # For handling file paths (to load local HTML file)

# Selenium imports
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# WebDriver Manager automatically downloads and manages the correct ChromeDriver version
from webdriver_manager.chrome import ChromeDriverManager


class OrbitScheduleMissionsTest(unittest.TestCase):
    """
    Test suite for the Orbit - Schedule Missions HTML page.
    All tests in this class will run against the local static HTML file.
    """

    @classmethod
    def setUpClass(cls):
        """
        Set up the WebDriver once for the entire test class (runs before any test).
        This improves performance by reusing the same browser instance.
        """
        # Automatically download and set up the correct ChromeDriver
        service = Service(ChromeDriverManager().install())
        cls.driver = webdriver.Chrome(service=service)

        # Create an explicit wait object (max 10 seconds) to handle dynamic elements
        cls.wait = WebDriverWait(cls.driver, 10)

        # Construct absolute path to the local HTML file
        # Ensure the file 'orbit-schedule-missions.html' is in the same directory as this script
        cls.file_path = os.path.abspath("orbit-schedule-missions.html")

        # Load the local HTML file into the browser
        cls.driver.get(f"file:///{cls.file_path}")

        # Maximize window for consistent layout
        cls.driver.maximize_window()

    @classmethod
    def tearDownClass(cls):
        """Clean up after all tests are done. Closes the browser."""
        cls.driver.quit()

    def test_page_title(self):
        """Verify that the browser title matches the expected value."""
        self.assertEqual(self.driver.title, "Orbit - Schedule Missions")

    def test_header_elements(self):
        """Validate the header section: logo and top-right icons."""
        logo = self.wait.until(EC.visibility_of_element_located((By.CLASS_NAME, "logo")))
        self.assertEqual(logo.text, "Orbit™")

        header_icons_container = self.driver.find_elements(By.CLASS_NAME, "header-icons")[0]
        icons = header_icons_container.find_elements(By.TAG_NAME, "i")
        self.assertEqual(len(icons), 2)
        self.assertIn("fa-cog", icons[0].get_attribute("class"))
        self.assertIn("fa-user-circle", icons[1].get_attribute("class"))

    def test_sidebar_elements(self):
        """Verify sidebar structure: section titles and active menu item."""
        titles = self.driver.find_elements(By.CLASS_NAME, "sidebar-title")
        title_texts = [t.text for t in titles]
        # Fixed: rendered text is uppercase due to CSS text-transform
        expected_titles = ["ACCOUNT", "ROBOTS", "ADMIN SETTINGS"]
        self.assertEqual(title_texts, expected_titles)

        active_item = self.driver.find_element(By.CSS_SELECTOR, ".sidebar li.active")
        self.assertEqual(active_item.text, "Schedule Missions")

    def test_main_content(self):
        """Check main page elements: title, search box, and weather link."""
        page_title = self.driver.find_element(By.CLASS_NAME, "page-title")
        self.assertEqual(page_title.text, "Schedule Missions")

        search_box = self.driver.find_element(By.CLASS_NAME, "search-box")
        self.assertEqual(search_box.get_attribute("placeholder"), "Search")

        weather_link = self.driver.find_element(By.CLASS_NAME, "weather-link")
        self.assertIn("Weather Settings", weather_link.text)
        self.assertTrue(weather_link.find_element(By.TAG_NAME, "i").is_displayed())

    def test_table_content(self):
        """Validate the mission schedule table: headers and sample row data."""
        headers = self.driver.find_elements(By.TAG_NAME, "th")
        header_texts = [h.text for h in headers]
        expected_headers = ["Can Run", "Robot Name", "Mission Name", "Schedule", "Next Start", "Current Lockouts", ""]
        self.assertEqual(header_texts, expected_headers)

        rows = self.driver.find_elements(By.CSS_SELECTOR, "tbody tr")
        self.assertEqual(len(rows), 3)

        first_row_cells = rows[0].find_elements(By.TAG_NAME, "td")
        status_icon = first_row_cells[0].find_element(By.TAG_NAME, "i")
        self.assertIn("status-gray", status_icon.get_attribute("class"))

        self.assertEqual(first_row_cells[1].text, "spot-BD-91890003")
        self.assertIn("strong", first_row_cells[1].get_attribute("outerHTML"))

        self.assertEqual(first_row_cells[2].text, "Safety Rounds")
        self.assertEqual(first_row_cells[3].text, "From 10:30 AM, Repeat as often as possible")
        self.assertEqual(first_row_cells[4].text, "Disabled")
        self.assertEqual(first_row_cells[5].text, "Individual")

        actions = first_row_cells[6].find_elements(By.TAG_NAME, "i")
        self.assertEqual(len(actions), 4)
        expected_classes = ["fa-sync-alt", "fa-file-alt", "fa-edit", "fa-trash"]
        for icon, expected_class in zip(actions, expected_classes):
            self.assertIn(expected_class, icon.get_attribute("class"))

    def test_footer_and_misc(self):
        """Verify footer links, robot time display, and version number."""
        footer_links_div = self.driver.find_element(By.CLASS_NAME, "footer-links")
        download_link = footer_links_div.find_element(By.TAG_NAME, "a")
        self.assertEqual(download_link.text, "Download calendar (ical format)")

        robot_time = self.driver.find_element(By.CLASS_NAME, "robot-time")
        self.assertEqual(robot_time.text, "Robot time: December 25, 2025 at 3:42:18 PM EST")

        version = self.driver.find_element(By.CLASS_NAME, "version")
        self.assertEqual(version.text, "5.0.0")

    def test_basic_interaction(self):
        """
        Test basic user interactions to ensure no JavaScript errors or crashes occur.
        Since this is static HTML, we only verify that actions don't break the page.
        """
        edit_icon = self.driver.find_element(By.CSS_SELECTOR, ".actions i.fa-edit")
        edit_icon.click()
        time.sleep(1)

        search_box = self.driver.find_element(By.CLASS_NAME, "search-box")
        search_box.clear()
        search_box.send_keys("test query")
        self.assertEqual(search_box.get_attribute("value"), "test query")


if __name__ == "__main__":
    unittest.main()