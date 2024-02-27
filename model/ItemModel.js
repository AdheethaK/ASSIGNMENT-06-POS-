export class ItemModel{
    constructor(item_code,
                item_type,
                item_image,
                item_name,
                item_quantity,
                item_price) {

        this.item_code =item_code;
        this.item_type=item_type;
        this.item_image=item_image;
        this.item_name = item_name;
        this.item_quantity = item_quantity;
        this.item_price = item_price;
    }
}