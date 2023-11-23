export interface orderById {
    id: string;
    orderDate: Date;
    customerLastName: string;
    status: string ;
    cartTotalPrice: number;
    shippingStatus: string ;
    customerFirstName : String
    customerId:String
    orderItems : any
    adress:String
    phone:String
    comments:String
    productId : string
    photo: string;
    productName: string;
    price: number ;
    option: string;
    quantity: number;
    totalPrice: number;
    comment : string
    edit?: boolean;
  }

