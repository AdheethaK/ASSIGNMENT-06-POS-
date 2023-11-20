export class OrderModel{
    constructor(order_id,
                customer_id,
                cart_id,
                total,
                date,
                time) {

        this.order_id = order_id;
        this.customer_id = customer_id;
        this.cart_id = cart_id;
        this.total = total;
        this.date = date;
        this.time = time;
    }
}