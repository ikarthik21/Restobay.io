const mongoose             = require('mongoose');
const bycrypt              = require('bcryptjs');

const orderSchema = new mongoose.Schema({
customerId:{
     type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true
 
    },
    items:{ type:Object , required:true},
    totalPrice:{type:Number},
    tableno:{type:Number, required:true},
    phone:{type:Number,required:true},
    paymentType:{type:String,default:'COD'},
    status:{ type:String ,default:'order_placed'},
    inst:{type:String},
    name:{type:String}

}, { timestamps: true });


const Orders = new mongoose.model("order", orderSchema);


module.exports = Orders;
