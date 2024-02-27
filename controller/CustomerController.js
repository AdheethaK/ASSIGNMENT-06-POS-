import {CustomerModel} from "../model/CustomerModel.js";

let email_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

//-----------1. load customer table-----------
const get_All_customers_from_server = () =>{
    $.ajax({
        url : "http://localhost:8080/POS_JavaEE_war_exploded/customerGetAll",
        type : "POST",
        data :"hello :)",
        headers : {"Content-Type":"application/json"} ,
        success : (resp) => {console.log(resp);load_all_customers($.parseJSON(resp));},
        error : (err) => {console.error(err)}
    });
}
let customerInterval= setInterval(get_All_customers_from_server,1000);
const load_all_customers = (resp) => {
    $("#customer-tbl-body").empty();
    $("#customer-selection").empty();

    resp.map((customerJSON,index)=>{
        const customer = $.parseJSON(customerJSON);

        let tbl_row = `<tr>
                            <td>${customer.customer_id}</td>
                            <td>${customer.customer_first_name}</td>
                            <td>${customer.customer_last_name}</td>
                            <td>${customer.customer_email}</td>
                            <td>${customer.customer_address}</td>
                       </tr>`


        $('#customer-tbl-body').append(tbl_row);

        let option = `<option>${customer.customer_id}</option>`;
        $('#customer-selection').append(option)
    })

}

// ----------2. clean inputs --------------
const clean_input = ()=>{
    $('#input-customer-id').val('');
    $('#input-customer-first-name').val('');
    $('#input-customer-last-name').val('');
    $('#input-customer-email').val('');
    $('#input-customer-address').val('');
}

// ----------3. add customer --------------
$('#CUSTOMER-save').on('click',()=>{

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
                        // stop automatic loading of html table in customer on button click
                        clearInterval(customerInterval);

                        let customer = new CustomerModel(
                            customer_id,
                            customer_first_name,
                            customer_last_name,
                            customer_email,
                            customer_address
                        );

                        //javaEE
                        //create JSON
                        const customerJSON = JSON.stringify(customer);

                        //send data to endpoint via ajax
                        // AJAX - JQuery
                        $.ajax({
                            url : "http://localhost:8080/POS_JavaEE_war_exploded/customer",
                            type : "POST",
                            data : customerJSON ,
                            headers : {"Content-Type":"application/json"} ,
                            success : (resp) => {
                                get_All_customers_from_server();
                                    Swal.fire(
                                        'Success!',
                                        'Customer has been saved successfully!',
                                        'success'
                                    );
                                clean_input();

                            },
                            error : (err) => {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Invalid Input',
                                    text: 'Error in customer save ! :('
                                })
                            }
                        });

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
        // stop automatic loading of html table in customer on button click
        clearInterval(customerInterval);

        // send data to endpoint via ajax
        // AJAX - JQuery
        $.ajax({
            url : "http://localhost:8080/POS_JavaEE_war_exploded/customer",
            type : "GET",
            data : {
                "customer_id" : $('#input-customer-id').val()
            } ,
            headers : {"Content-Type":"application/json"} ,
            success: function (customerJSON){
                let customer = $.parseJSON(customerJSON)
                // console.log(customer.customer_address)

                $('#input-customer-first-name').val(customer.customer_first_name);
                $('#input-customer-last-name').val(customer.customer_last_name);
                $('#input-customer-email').val(customer.customer_email);
                $('#input-customer-address').val(customer.customer_address);
            },
            error : (err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Input',
                    text: err
                })
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

// ----------4. update customer --------------
$('#CUSTOMER-update').on('click',()=>{
    // stop automatic loading of html table in customer on button click
    clearInterval(customerInterval);

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

                        let customer = new CustomerModel(
                            customer_id,
                            customer_first_name,
                            customer_last_name,
                            customer_email,
                            customer_address
                        );

                        //create JSON
                        const customerJSON = JSON.stringify(customer)

                        //send data to endpoint via ajax
                        // AJAX - JQuery
                        $.ajax({
                            url : "http://localhost:8080/POS_JavaEE_war_exploded/customer",
                            type : "PUT",
                            data : customerJSON ,
                            headers : {"Content-Type":"application/json"} ,
                            success : (resp) => {get_All_customers_from_server()},
                            error : (err) => {console.error(err)}
                        });

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
    // stop automatic loading of html table in customer on button click
    clearInterval(customerInterval);

    let customer_id = $('#input-customer-id').val()
    console.log(customer_id)

    //--------------
    //send data to endpoint via ajax
    // AJAX - JQuery
    $.ajax({
        url : "http://localhost:8080/POS_JavaEE_war_exploded/customer?" + $.param({id: customer_id}),
        type : "DELETE",
        data : {
            "customer_id" : $('#input-customer-id').val()
        } ,
        headers : {"Content-Type":"application/json"} ,
        success : (resp) => {get_All_customers_from_server();clean_input();},
        error : (err) => {Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: err
        })
        }
    });
})