const session             = require('express-session');
const mongoose            = require('mongoose');
const Mongoclient         = require('mongodb').MongoClient;
require('dotenv').config();
let database;

Mongoclient.connect(
  process.env.MONGO_CONNECTION_URL,
  { useNewUrlParser: true },
  (err, res) => {
    if (err) throw err;
    database = res.db('Restobay');
  
  }
);

function orderController() {
  return {
    async order(req, res) {
      try {
        console.log('Starting database queries');
        const [nitems, sitems, dess] = await Promise.all([
          database.collection('north').find({}).toArray(),
          database.collection('south').find({}).toArray(),
          database.collection('dessert').find({}).toArray(),
        ]);
        console.log('All database queries completed');
        console.log('nitems:', nitems);
        console.log('sitems:', sitems);
        console.log('dess:', dess);
    
        res.render('orders', {
          nitems: nitems,
          sitems: sitems,
          dess: dess,
        });
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    }
    
    ,
   async update(req, res) {

      // let cart ={
      //   items:{
      //     pizzaId:{item:pizzaObject,qty:0}
      //   },
      //   totalQty:0,
      //   totalPrice:0
      // }


      
      //first time creating cart and adding basic object structure

      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalPrice: 0
        }
      }

      let cart = req.session.cart;

    

      //check if item doesnt exist in cart;
      if (!cart.items[req.body._id]) {
        cart.items[req.body._id] = {
          item: req.body,
          qty: 1
        }
        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;

      }
      else {
        cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
      }



      return res.json({ totalQty: req.session.cart.totalQty });
    }

  };
}

module.exports = orderController;


