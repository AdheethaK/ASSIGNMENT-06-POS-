import {customer_db,cart_db} from "../DB/db.js";

$('#order-form>div>input:nth-of-type(1)').keyup(function (e){
    if (e.keyCode == 13){
        $(this).trigger('enterKey')
        // alert('hello:)')

        // check the entries in cart db

        let CART_id = null;
        if (cart_db.length == 0){
            // alert('hello:)')
            CART_id = 'R001';
        } else{
            let num = cart_db.length;

            if(num < 10){
                CART_id = "R00"+num;
            } else if(num<100){
                CART_id = "R0"+num;
            } else if(num<1000){
                CART_id = "R"+num;
            }
        }
        cart_db.push(CART_id)
        $('#my-list-id').text(CART_id);
    }
})

$('#my-list').on('click',()=>{

    // get the cart id
    const cart_id = $('#my-list-id').text();

    $('#header-cart-id').text(cart_id);

    let value = $('#customer-selection option:selected');
    console.log(value.text());

    const customer_id = document.getElementById("customer-id-h3");
    customer_id.innerHTML = value.text();

})


