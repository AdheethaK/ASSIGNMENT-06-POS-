import {customer_db} from "../DB/db.js";
import {CustomerModel} from "../model/CustomerModel.js";

let email_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// ----------1. clean inputs --------------
const clean_input = ()=>{
    $('#input-customer-id').val('');
    $('#input-customer-first-name').val('');
    $('#input-customer-last-name').val('');
    $('#input-customer-email').val('');
    $('#input-customer-address').val('');
}

// ----------2. load customer --------------

const load_customer = ()=>{
    $('#customer-tbl-body').empty();

    customer_db.map((item,index)=>{
        let tbl_row = `<tr>
                            <td>${item.customer_id}</td>
                            <td>${item.customer_first_name}</td>
                            <td>${item.customer_last_name}</td>
                            <td>${item.customer_email}</td>
                            <td>${item.customer_address}</td>
                       </tr>`

        $('#customer-tbl-body').append(tbl_row);
    })
}


// ----------3. add customer --------------
$('#CUSTOMER-save').on('click',()=>{
    let customer_id = $('#input-customer-id').val();
    let customer_first_name = $('#input-customer-first-name').val();
    let customer_last_name = $('#input-customer-last-name').val();
    let customer_email = $('#input-customer-email').val();
    let customer_address = $('#input-customer-address').val();

    console.log(customer_id);
    console.log(customer_first_name);
    console.log(customer_last_name);
    let isValid = email_regex.test(customer_email);
    if(isValid){console.log(customer_email);}
    console.log(customer_address);

    if(customer_id){
        if(customer_first_name){
            if(customer_last_name){
                let isValid = email_regex.test(customer_email);
                if(customer_email){
                    if(customer_address && isValid){
                        let customer = new CustomerModel(
                            customer_id,
                            customer_first_name,
                            customer_last_name,
                            customer_email,
                            customer_address
                        );

                        customer_db.push(customer);

                        Swal.fire(
                            'Success!',
                            'Customer has been saved successfully!',
                            'success'
                        );

                        clean_input();
                        load_customer();

                    }else{toastr.error('Invalid Customer Address');}
                }else{toastr.error('Invalid Customer Email');}
            }else{toastr.error('Invalid Customer Last Name');}
        }else{toastr.error('Invalid Customer First Name');}
    }else{toastr.error('Invalid Customer ID');}
})

// ----------4. fill customer --------------
// $('#CUSTOMER-search')