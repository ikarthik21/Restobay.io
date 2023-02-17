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
    order(req, res) {
      let nitems, sitems, dess;

      database.collection('north').find({}).toArray((err, result) => {
        if (err) throw err;
        nitems = result;
      }), database.collection('south').find({}).toArray((err, result) => {
        if (err) throw err;
        sitems = result;
      }), database.collection('dessert').find({}).toArray((err, result) => {
        if (err) throw err;
        dess = result;
        res.render('orders', {
          nitems: nitems,
          sitems: sitems,
          dess: dess,
        });
      })
    },
    update(req, res) {

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


