export class CustomerModel{
    constructor(customer_id,
                customer_first_name,
                customer_last_name,
                customer_email,
                customer_address) {

        this.customer_id = customer_id;
        this.customer_first_name = customer_first_name;
        this.customer_last_name = customer_last_name;
        this.customer_email = customer_email;
        this.customer_address = customer_address;
    }
}