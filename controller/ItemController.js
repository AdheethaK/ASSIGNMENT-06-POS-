import {customer_db, item_db} from "../DB/db.js";
import{ItemModel} from "../model/ItemModel.js";

// ----------1. clean inputs --------------
const clean_input = ()=>{
    $('#input-item-code').val('');
    $('#input-item-name').val('');
    $('#input-item-qty').val('');
    $('#input-item-price').val('');
}

// ----------2. load item --------------
const load_item = ()=>{
    $('#item-tbl-body').empty();

    item_db.map((item,index)=>{
        let tbl_row = `<tr>
                            <td>${item.item_code}</td>
                            <td>${item.item_name}</td>
                            <td>${item.item_quantity}</td>
                            <td>${item.item_price}</td>
                       </tr>`

        $('#item-tbl-body').append(tbl_row);
    })
}

// ----------3. add item --------------
$('#ITEM--save').on('click',()=>{
    let item_code = $('#input-item-code').val();
    let item_name = $('#input-item-name').val();
    let item_qty = $('#input-item-qty').val();
    let item_price= $('#input-item-price').val();

    if(item_code){
        if(item_name){
            if(item_qty){
                if(item_price){
                    let item = new ItemModel(
                        item_code,
                        item_name,
                        item_qty,
                        item_price
                    );

                    item_db.push(item);

                    Swal.fire(
                        'Success!',
                        'Item has been saved successfully!',
                        'success'
                    );

                    clean_input();
                    load_item();
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid Input',
                        text: 'Please enter valid item price'
                    })
                }
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Input',
                    text: 'Please enter valid item quantity'
                })
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Invalid Input',
                text: 'Please enter valid item name'
            })
        }
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: 'Please enter valid item code'
        })
    }
})

// ----------4. search item --------------
$('#ITEM-search').on('click',()=>{
    let item_code= $('#input-item-code').val().toLowerCase();

    if(item_code){
        let result = item_db.filter((item)=> item.item_code.toLowerCase().includes(item_code));

        console.log(result)

        if(result.length !=0){
            result.map((item,index)=>{
                $('#input-item-name').val(item.item_name);
                $('#input-item-qty').val(item.item_quantity);
                $('#input-item-price').val(item.item_price);
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Iem code does not exist'
            })
        }
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: 'Please enter valid item code'
        })
    }
})

// ----------4. update item --------------
$('#ITEM-update').on('click',()=>{
    let item_code = $('#input-item-code').val();
    let item_name = $('#input-item-name').val();
    let item_qty = $('#input-item-qty').val();
    let item_price= $('#input-item-price').val();

    if(item_code){
        if(item_name){
            if(item_qty){
                if(item_price){
                    // prepare the object
                    let item_obj = new ItemModel(
                        item_code,
                        item_name,
                        item_qty,
                        item_price
                    );
                    // find item index
                    let index = item_db.findIndex((item)=>item.item_code===item_code);

                    //update item in db
                    item_db[index] = item_obj;

                    //clear
                    clean_input();

                    //load item data
                    load_item()

                    Swal.fire(
                        'Updated!',
                        'Customer has been updated!',
                        'success'
                    )
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid Input',
                        text: 'Please enter valid item price'
                    })
                }
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Input',
                    text: 'Please enter valid item quantity'
                })
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Invalid Input',
                text: 'Please enter valid item name'
            })
        }
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Invalid Input',
            text: 'Please enter valid item code'
        })
    }
})

// ----------4. delete item --------------
$('#ITEM-delete').on('click',()=>{

    let item_code= $('#input-item-code').val().toLowerCase();

    if(item_code){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result)=>{
            if (result.isConfirmed){
                let item_code = $('#input-item-code').val();

                //find the item index
                let index = item_db.findIndex((item)=>item.item_code===item_code);

                //remove the item from the db
                item_db.splice(index,1);

                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )

                clean_input();
                load_item();
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