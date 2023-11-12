$("#menu>ul>li:first-child").on('click',() =>{
    // Customer
    $("#customer-body").css("display","block")
    $("#item-body").css("display","none")
    $("#order-body").css("display","none")

    $("#menu>ul>li:first-child").addClass("add_style_to_li");
    $("#menu>ul>li:nth-child(2)").removeClass("add_style_to_li");
    $("#menu>ul>li:nth-child(3)").removeClass("add_style_to_li");
})
$("#menu>ul>li:nth-child(2)").on('click',() =>{
    // item
    $("#customer-body").css("display","none")
    $("#item-body").css("display","block")
    $("#order-body").css("display","none")

    $("#menu>ul>li:first-child").removeClass("add_style_to_li");
    $("#menu>ul>li:nth-child(2)").addClass("add_style_to_li");
    $("#menu>ul>li:nth-child(3)").removeClass("add_style_to_li");

})
$("#menu>ul>li:nth-child(3)").on('click',() =>{
    // Order
    $("#customer-body").css("display","none")
    $("#item-body").css("display","none")
    $("#order-body").css("display","block")

    $("#menu>ul>li:first-child").removeClass("add_style_to_li");
    $("#menu>ul>li:nth-child(2)").removeClass("add_style_to_li");
    $("#menu>ul>li:nth-child(3)").addClass("add_style_to_li");
})
$("#order-form>div:nth-child(6)").on('click',() =>{
    // ADD TO CART
    $("#my-cart-overlay").css("display","block")
})
$("#back").on('click',() =>{
    // BACK TO ORDER
    $("#my-cart-overlay").css("display","none")
})



