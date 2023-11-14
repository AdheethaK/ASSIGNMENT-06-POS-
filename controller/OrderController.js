import {customer_db} from "../DB/db.js";

$('#my-list').on('click',()=>{
    let value = $('#customer-selection option:selected');
    console.log(value.text());

    const customer_id = document.getElementById("customer-id-h3");
    customer_id.innerHTML = value.text();
})

$('#coffee-radio').on('click',()=>{
    console.log("works! coffee:)")
    $('#image-item-type').css("background-image","url(\"/assets/img/latte-art.png\")")
        .css("background-size","100% 100%")
})
$('#donut-radio').on('click',()=>{
    console.log("works! coffee:)")
    $('#image-item-type').css("background-image","url(\"/assets/img/donut.png\")")
        .css("background-size","100% 100%")
})