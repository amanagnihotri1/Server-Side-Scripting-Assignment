frappe.ui.form.on('Student', {
    refresh: function(frm) {
        frm.add_custom_button(('Create User'), function() {
            frappe.call({
                method: 'userdata.userdata.doctype.student.student.create_user_if_not_exists',
                args: {
                    name: frm.doc.name
                },
                callback: function(response) {
                    if (response.message) {
                        frappe.msgprint(response.message);
                    } else {
                        frappe.msgprint('Failed to create user.');
                    }
                }
            });
        });
    },
    validate: function(frm) {
    // Get the value of the email field
        var email = frm.doc.email_address;

    // Regular expression for email validation
        var email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email is empty or does not match the regex pattern
        if (email && !email_regex.test(email)) {
            frappe.msgprint(__("Invalid email address."));
            frappe.validated = false; // Prevent saving if validation fails
    }
}
});