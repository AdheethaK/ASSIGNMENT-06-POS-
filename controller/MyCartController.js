import {item_db,cart_db} from "../DB/db.js";

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
            cart_db.push(item);
        }
    })
    print_cart(selected_item);
})

const print_cart = (selected_item)=>{

    $("#cart > ol").empty();

    for (var i = 0; i < cart_db.length; i++) {
        //get all the lines in cart ol
        const lineCollection = document.querySelectorAll("#cart > ol >li");
        const lineArray = Array.from(lineCollection);

        if(lineArray.length == 0){
            //if the cart is empty
            const line = `<li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                                <div class="item-number">
                                    <p>${i}</p>
                                </div>
                                <div class="fw-bold"></div>
                                <h5>${cart_db[i].item_code}</h5>
                                <p >${cart_db[i].item_name}</p>
                            </div>
                            <div class="price">
                                <p>${cart_db[i].item_price}</p>
                            </div>
                            <span class="badge bg-primary rounded-pill">${1}</span>
                            <div class="delete">
                                <img src="/assets/img/delete%20(2).png" alt="delete-img" width="40px" height="40px">
                            </div>
                        </li>`;

            $('#cart > ol').append(line);
        }else {
            //if the cart list is not empty

            for (let i=0;i<lineArray.length;i++){
                //check if this item already exists
                let code = lineArray[i].querySelector("div > h5").innerText;
                if(selected_item == code){
                    let qty = lineArray[i].querySelector("span").innerText;
                    qty++;
                    lineArray[i].querySelector("span").innerText = qty;
                    break;
                }else {
                    //if the item already does not exist
                    if (code != cart_db[i].item_code){
                        const line = `<li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                                <div class="item-number">
                                    <p>${i}</p>
                                </div>
                                <div class="fw-bold"></div>
                                <h5>${cart_db[i].item_code}</h5>
                                <p >${cart_db[i].item_name}</p>
                            </div>
                            <div class="price">
                                <p>${cart_db[i].item_price}</p>
                            </div>
                            <span class="badge bg-primary rounded-pill">${1}</span>
                            <div class="delete">
                                <img src="/assets/img/delete%20(2).png" alt="delete-img" width="40px" height="40px">
                            </div>
                        </li>`;

                        $('#cart > ol').append(line);
                    }
                }

            }
        }
    }
}

