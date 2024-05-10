// Copyright (c) 2024, Aman and contributors
// For license information, please see license.txt
frappe.ui.form.on("Job Apply", {
    refresh:(frm)=>
        {
           clearFieldValues(frm);
           showDeveloperFields(frm);
        },
    role:(frm)=>{
            console.log('its working or not');
            clearFieldValues(frm);
            let selectedRole = frm.doc.role; 
            // Update table fields based on the selected role
            if (selectedRole === "Developer") {
                  showDeveloperFields(frm);
            }
            else if (selectedRole === "QA") {
               showQAFields(frm); 
            } else if (selectedRole ==="Graphic Designer") {
              showDesignerFields(frm);
            }
    },
});
frappe.ui.form.on('Details',{
    // cdt is Child DocType name i.e Quotation Item
    // cdn is the row name for e.g bbfcb8da6a
  
    language:(frm,cdt,cdn)=> // function to autofill framework field acc. to value selected in language field
       { 
        const items=locals[cdt][cdn];
        if(items.language==="Python")
            {
                items.framework="Django";
            }
            else if(items.language==="Javascript"){
                items.framework="React Native";
            }
            else if(items.language==="PHP"){
                items.framework="Laravel";
            }
            frm.refresh_field('details');
    },
    test_environments:(frm, cdt, cdn)=>{ //function to auto fill applied date and initials value 
        let item = locals[cdt][cdn];
        item.applied_date=frappe.datetime.nowdate();
        item.setValue.initials=frappe.user.full_name;
        frm.refresh_field('details')
    },
    ides:(frm, cdt, cdn)=>{ // function to auto fill applied date and initials field based on the values ides field
        let item = locals[cdt][cdn];
        item.applied_date=frappe.datetime.nowdate();
        item.initials=frappe.user.full_name;
        frm.refresh_field('details')
    },

    // Auto fill applied date and initials on design_style
    design_style: function(frm, cdt, cdn){
        let item = locals[cdt][cdn];
        item.applied_date = frappe.datetime.nowdate();
        item.initials = frappe.user.full_name;
        frm.refresh_field('details')
    }
})

const clearFieldValues=(frm)=>{
    let selectedTableField=frm.fields_dict.details.grid.fields_map;
    selectedTableField.language.hidden=1;
    selectedTableField.ides.hidden=1;
    selectedTableField.applied_date.hidden=1;
    selectedTableField.framework.hidden=1;
    selectedTableField.applied_date.hidden=1;
    selectedTableField.initials.hidden=1;
    selectedTableField.bug_tracking_system.hidden=1;
    selectedTableField.automation_experience.hidden=1;
    selectedTableField.testing_tools.hidden=1;
    selectedTableField.test_environments.hidden=1;
    selectedTableField.design_style.hidden=1;
    selectedTableField.color_theory_knowledge.hidden=1;
    selectedTableField.typography_skills.hidden=1;
    selectedTableField.uiux_experience.hidden=1;
}
function showDeveloperFields(frm) {
    let selectedTableField=frm.fields_dict.details.grid.fields_map;
    selectedTableField.language.hidden=0;
    selectedTableField.ides.hidden=0;
    selectedTableField.applied_date.hidden=0;
    selectedTableField.framework.hidden=0;
    selectedTableField.initials.hidden=0;
}

function showQAFields(frm) {
    let selectedTableField=frm.fields_dict.details.grid.fields_map;
    selectedTableField.bug_tracking_system.hidden=0;
    selectedTableField.automation_experience.hidden=0;
    selectedTableField.test_environments.hidden=0;
    selectedTableField.testing_tools.hidden=0;
    selectedTableField.applied_date.hidden=0;
    selectedTableField.initials.hidden=0;
}

function showDesignerFields(frm) {
    let selectedTableField=frm.fields_dict.details.grid.fields_map;
    selectedTableField.design_style.hidden=0;
    selectedTableField.color_theory_knowledge.hidden=0;
    selectedTableField.typography_skills.hidden=0;
    selectedTableField.uiux_experience.hidden=0;
    selectedTableField.applied_date.hidden=0;
    selectedTableField.initials.hidden=0;
}
