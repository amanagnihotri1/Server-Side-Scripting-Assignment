frappe.listview_settings['Customer'] = {
    onload:(listview)=>{
        listview.page.add_button('Export to CSV',()=>{
            frappe.call({       
                method:"user_records.custom.customer.export_customer_data",
                callback:(result) => {
                    if (result.message) {
                        let data = [["Customer Name", "Customer Type", "Email id", "Mobile number", "Address Line1", "Address Line 2", "Pincode", "City", "State", "Country"]];
                        result.message.map(item=>data.push(item))
                        frappe.tools.downloadify(data, null, 'Customer');
                    }
                }
            })
        })
    }}
    frappe.ui.form.on('Programme', {
        refresh: function(frm) {
            frm.fields_dict['participant'].grid.get_field('preview').get_query = function(doc, cdt, cdn) {
                return {
                    docinfo: '1',
                    filters: {
                        doctype: 'Student'
                    }
                };
            };
        }
    });
    
    frappe.ui.form.on('participant', {
        preview_profile_picture: function(frm, cdt, cdn) {
            var row = locals[cdt][cdn];
            var student = row.participant;

            frappe.call({
                method: 'user_records.user_records.doctype.get_profile_picture',
                args: {
                    student: student
                },
                callback: function(response) {
                    var profilePictureUrl = response.message;
                    frappe.msgprint('<img src="' + profilePictureUrl + '">');
                }
            });
        }
    });