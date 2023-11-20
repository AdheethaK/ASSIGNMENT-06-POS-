import {item_db,cart_db,my_list_id} from "../DB/db.js";
import {CartModel} from "../model/CartModel.js";
import {OrderModel} from "../model/OrderModel.js";

$('#header-coffee').on('click',()=>{
    $('#all-donut-items').css({
        zIndex:99
    })
    $('#all-coffee-items').css({
        zIndex:9999
    })

    $("#header-food").removeClass("remove-box-shadow").css({opacity:0.5})
    $("#header-coffee").addClass("add-box-shadow").css({opacity:1})
})
$('#header-food').on('click',()=>{
    $('#all-coffee-items').css({
        zIndex:99
    })
    $('#all-donut-items').css({
        zIndex:9999
    })
    $("#header-coffee").removeClass("remove-box-shadow").css({opacity:0.5})
    $("#header-food").addClass("add-box-shadow").css({opacity:1})
})

// -------------1.add item to cart on item click---------------
$("body").on('click',"#all-coffee-items>.row>.col-sm",()=>{

    const selected_item = event.target.querySelector("h3").innerText;

    // alert("Button is clicked! : "+selected_item);

    item_db.map((item,index)=>{
        if(item.item_code == selected_item){
            //push the item cade into cart
        }
    })

})


