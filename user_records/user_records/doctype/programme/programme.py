# Copyright (c) 2024, Aman and contributors
# For license information, please see license.txt
import frappe
from frappe.model.document import Document
import re
import json

@frappe.whitelist()
def get_credits(courses):
    names = re.findall(r'"course_credits":"([^"]+)"', courses)  # Converting names to string before throwing
    # Get all course names
    credits = 0
    for course in names:
        frappe.throw(course)
    """
    Calculate and return total credits
    """
    return credits

@frappe.whitelist()
def fetch_student_image(student_name):
    data = frappe.get_doc("Student", student_name)
    return data.student_image

class Programme(Document):
    def show_info(self):
        """
        This function is called when a Programme document is loaded.
        You can add your logic here.
        """
        frappe.throw('This is the on_load function')
