import {item_db,cart_db,my_list_id,selected_item_list} from "../DB/db.js";
import {CartModel} from "../model/CartModel.js";
import {OrderModel} from "../model/OrderModel.js";
import {SelectedItemsList} from "../model/SelectedItemsList.js";

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

    item_db.map((item,index)=>{
        if(item.item_code == selected_item){

            // check if the selected_item_list is empty
            if(selected_item_list.length == 0){

                const ITEM_selected = new SelectedItemsList(item,1);
                selected_item_list.push(ITEM_selected);
            } else {
                selected_item_list.map((select_item,index)=>{

                    const ITEM = select_item.item;

                    if(ITEM.item_code == item.item_code){
                        console.log("BEFORE: "+select_item.qty);

                        const QTY = select_item.qty++;
                        //update the qty
                        selected_item_list[index].qty == QTY;

                        console.log("AFTER: "+select_item.qty);

                    }else {
                        const ITEM_selected = new SelectedItemsList(item,1);
                        selected_item_list.push(ITEM_selected);
                    }
                })
            }
            fill_cart();
        }
    })

})

const fill_cart = ()=>{

    //clear the cart
    $('#cart > ol').empty();

    for (let i=0 ; i<selected_item_list.length; i++){

        var ITEM = selected_item_list[i].item;
        var QTY = selected_item_list[i].qty;

        const line = `<li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                                <div class="item-number">
                                    <p>${i+1}</p>
                                </div>
                                <div class="fw-bold"></div>
                                <h5>${ITEM.item_code}</h5>
                                <p >${ITEM.item_name}</p>
                            </div>
                            <div class="price">
                                <p>${ITEM.item_price}</p>
                            </div>
                            <span class="badge bg-primary rounded-pill">${QTY}</span>
                            <div class="delete">
                                <img src="/assets/img/delete%20(2).png" alt="delete-img" width="40px" height="40px">
                            </div>
                        </li>`;

        $('#cart > ol').append(line);
        console.log(selected_item_list)
    }
}


