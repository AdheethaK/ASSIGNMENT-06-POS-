import {customer_db, cart_db, selected_item_list} from "../DB/db.js";
import {ItemModel} from "../model/ItemModel.js";
import {SelectedItemsList} from "../model/SelectedItemsList.js";

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

$('#order-btn-panel>.btn-warning').on('click',()=>{

    const itemOne = new ItemModel('I001','coffee','Latte','78','140.00');
    const selectedOne = new SelectedItemsList(itemOne,2)

    const itemTwo = new ItemModel('I002','coffee','Milk Coffee','55','230.00');
    const selectedTwo = new SelectedItemsList(itemTwo,7)

    const itemThree = new ItemModel('I003','coffee','Black Coffee','45','300.00');
    const selectedThree = new SelectedItemsList(itemThree,14)

    selected_item_list.push(selectedOne,selectedTwo,selectedThree);

    // console.log(itemOne)
    console.log(selectedOne)

    for (let i=0; i<selected_item_list.length; i++){

        var SELECTED_ITEM = selected_item_list[i];

        console.log("ITEM: " + SELECTED_ITEM.item.item_code)
        console.log("QTY: " + SELECTED_ITEM.qty)
        console.log("----------------------------")
    }
    // alert('ITEM: '+ITEM+"    "+'QTY: '+QTY)
})


