import frappe
@frappe.whitelist()
def export_customer_data():
    return frappe.db.sql('''select custo.name,custo.customer_name,custo.email_id,custo.mobile_no,
                        add.address_line1,
                        add.address_line2,add.pincode,add.city,add.state,add.country
                        from `tabCustomer` custo
                        left join `tabAddress` add
                        on add.name = custo.customer_primary_address
              ''',as_list=1)  