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

                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Invalid Input',
                            text: 'Please enter valid customer address'
                        })
                    }
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid Input',
                        text: 'Please enter valid customer email'
                    })
                }
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Input',
                    text: 'Please enter valid customer last name'
                })
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Invalid Input',
                text: 'Please enter valid customer first name'
            })
        }
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: 'Please enter valid customer id'
        })
    }
})

// ----------4. search customer --------------
$('#CUSTOMER-search').on('click',()=>{
    let customer_id = $('#input-customer-id').val().toLowerCase();

    if(customer_id){
        let result = customer_db.filter((item)=> item.customer_id.toLowerCase().includes(customer_id));

        console.log(result)

        if(result.length !=0){
            result.map((item,index)=>{
                $('#input-customer-first-name').val(item.customer_first_name);
                $('#input-customer-last-name').val(item.customer_last_name);
                $('#input-customer-email').val(item.customer_email);
                $('#input-customer-address').val(item.customer_address);
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Customer id does not exist'
            })
        }
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: 'Please enter valid customer id'
        })
    }
})

// ----------4. update customer --------------
$('#CUSTOMER-update').on('click',()=>{
    let customer_id = $('#input-customer-id').val();
    let customer_first_name = $('#input-customer-first-name').val();
    let customer_last_name = $('#input-customer-last-name').val();
    let customer_email = $('#input-customer-email').val();
    let customer_address = $('#input-customer-address').val();

    if(customer_id){
        if(customer_first_name){
            if(customer_last_name){
                let isValid = email_regex.test(customer_email);
                if(customer_email){
                    if(customer_address && isValid){
                        // prepare the object
                        let customer_obj = new CustomerModel(
                            customer_id,
                            customer_first_name,
                            customer_last_name,
                            customer_email,
                            customer_address
                        );

                        // find item index
                        let index = customer_db.findIndex((item)=>item.customer_id===customer_id);

                        //update item in db
                        customer_db[index] = customer_obj;

                        //clear
                        clean_input();

                        //load customer data
                        load_customer();

                        Swal.fire(
                            'Updated!',
                            'Customer has been updated!',
                            'success'
                        )
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Invalid Input',
                            text: 'Please enter valid customer address'
                        })
                    }
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid Input',
                        text: 'Please enter valid customer email'
                    })
                }
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Input',
                    text: 'Please enter valid customer last name'
                })
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Invalid Input',
                text: 'Please enter valid customer first name'
            })
        }
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: 'Please enter valid customer id'
        })
    }
})

// ----------4. delete customer --------------
$('#CUSTOMER-delete').on('click',()=>{

    let customer_id = $('#input-customer-id').val().toLowerCase();

    if(customer_id){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result)=>{
            if (result.isConfirmed){
                let customer_id = $('#input-customer-id').val();

                //find the item index
                let index = customer_db.findIndex((item)=>item.customer_id===customer_id);

                //remove the item from the db
                customer_db.splice(index,1);

                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )

                clean_input();
                load_customer();
            }
        });
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: 'Please enter valid customer id'
        })
    }
})