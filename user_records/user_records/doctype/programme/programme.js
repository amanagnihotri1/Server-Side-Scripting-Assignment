// Copyright (c) 2024, Aman and contributors
// For license information, please see license.txt

frappe.ui.form.on("Programme",{
    onload:function(frm){
     frm.set_query("employee",()=>
    {   return {
        "filters":{
            "designation":"Instructor"
        }
    };
    });
    },
  after_save:function(frm)
{   
        // Calculate total credits
        console.log(frm.doc.courses)
        frappe.call({
            method:"user_records.user_records.doctype.programme.programme.get_credits", 
            args:{
                courses: frm.doc.courses,
            },
            callback:function(res){
                console.log(res)
               sumCredits =res.message;
               frm.doc.total_credits=sumCredits; 
            }   
           
        })
    },
});  
frappe.ui.form.on('Participant',{
    preview:(frm,cdt,cdn)=>
      {
        let data=locals[cdt][cdn];
         console.log(data.name);
         frappe.call({
          method:'user_records.user_records.doctype.programme.programme.fetch_student_image',
          args:{student_name:data.participant},
          callback:(res)=>{
            if (res.message) {
                console.log(res.message)
                const student_image = res.message;
                // Call a function to show the preview with the student's profile image
                show_student_image(student_image);
            }
        }
        });
      }   
   })
   function show_student_image(stu_image) {
    // Create a modal dialog
    var dialog = new frappe.ui.Dialog({
        title: 'Image_dialogue',
        fields: [
            {
                fieldtype: 'HTML',
                fieldname: 'preview_box',
                label: 'Image Preview',
                options: `<img src="${stu_image}" style="max-width: 100%; max-height: 100%;" />`
            }
        ],
        primary_action_label: 'Close',
        primary_action: function() {
            dialog.hide();
        }
    });

    // Show the modal dialog
    dialog.show();
}