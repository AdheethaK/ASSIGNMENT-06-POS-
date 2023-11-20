import {customer_db} from "../DB/db.js";

$('#my-list').on('click',()=>{

    // get the cart id
    const cart_id = $('#my-list-id').text();
    // alert(cart_id);

    $('#header-cart-id').text(cart_id);

    let value = $('#customer-selection option:selected');
    console.log(value.text());

    const customer_id = document.getElementById("customer-id-h3");
    customer_id.innerHTML = value.text();

})


