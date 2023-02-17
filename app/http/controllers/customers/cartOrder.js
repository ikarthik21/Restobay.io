const { renderSync }              = require('sass');
const Orders                      = require('../../../models/order');
const moment                      = require('moment');
const flash                       = require('connect-flash');
const { session }                 = require('passport');
const Tables                     = require('../../../models/book');
function cartOrder() {
  return {

    async store(req, res, next) {

      const {  phone,tableno,inst} = req.body;
      if ( !phone ) {
        req.flash('error', 'All fields  are required');

        return res.redirect('/pay/verify');
      }
      else {

        const order = new Orders({
          customerId: req.user._id,
          items: req.session.cart.items,
          totalPrice:req.session.cart.totalPrice,
          tableno:req.session.table || tableno,
          paymentType:"online",
          phone: phone,
          inst:inst,
           name:req.user.name

        })



        const ordered = await order.save();
        Orders.populate(ordered, {path:'customerId'},(err,placedOrder)=>{
          
          delete req.session.cart
          req.flash('success', "Order placed Successfully");
          //Emit event 
          const eventEmitter=req.app.get('eventEmitter');
          eventEmitter.emit('orderPlaced',placedOrder);
          
          return res.redirect('/customer/orders');
        })
        

      }




    },

    async index(req, res, next) {


      const orders = await Orders.find({ customerId: req.user._id, },null,{sort:{'createdAt':-1}});

    
       res.render('allorder', {orders:orders ,moment:moment});

    },
    async show(req,res,next){

      const order = await Orders.findById(req.params._id)
      // Authorize user
     
      if(req.user._id.toString() === order.customerId.toString()) {
        return res.render('customer/singleOrder', { order })
      }
      return  res.redirect('/cart')
  



    }



  }


}

module.exports = cartOrder;