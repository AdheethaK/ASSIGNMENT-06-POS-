import {customer_db} from "../DB/db.js";

$('#my-list').on('click',()=>{
    let value = $('#customer-selection option:selected');
    console.log(value.text());

    const customer_id = document.getElementById("customer-id-h3");
    customer_id.innerHTML = value.text();
})