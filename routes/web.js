const homeController        = require("../app/http/controllers/homeController");
const signController        = require("../app/http/controllers/signController");
const orderController       = require("../app/http/controllers/orderController");
const cartOrder             = require('../app/http/controllers/customers/cartOrder');
const cartController        = require('../app/http/controllers/customers/cartController');
const adminOrder            = require('../app/http/controllers/admin/adminOrder');
const subscribersController = require('../app/http/controllers/admin/subscribersController');
const bookingController     = require('../app/http/controllers/admin/bookingController');
const guest                 = require('../app/http/middleware/guest');
const auth                  = require('../app/http/middleware/auth');
const flash                 = require('connect-flash');
const express               = require("express");
const admin                 = require("../app/http/middleware/admin");
const statusController      = require("../app/http/controllers/admin/statusController");
const feedbackController    = require("../app/http/controllers/admin/feedbackController");
const paymentOrder          = require('../app/http/controllers/customers/paymentOrder')
const tableController       = require('../app/http/controllers/book/tableController');
const bookController        = require('../app/http/controllers/book/bookController');
const verifyMail            = require('../app/http/controllers/verifyMail');
const { error }             = require("laravel-mix/src/Log");
const bycrypt               = require('bcryptjs');

function initRoutes(app) {
  app.use(express.json());
  app.use(flash());
  app.get("/", homeController().home);
  app.get("/home", homeController().home);
  app.get("/sign", guest,signController().sign);
  app.post("/sign-up",signController().signup)
  app.post("/sign-in",signController().signin);

  //book table routes
  app.get('/booktable',auth,tableController().book);
  app.post('/table',auth,bookController().reserve);
 


  app.get('/logout',signController().logout);
  app.get("/cart", cartController().cart);
  app.get("/orders",auth,orderController().order);
  app.post("/update-cart", orderController().update);
  
  app.post('/storeorder',cartOrder().store);

  //customer routes
  app.get('/customer/orders',auth,cartOrder().index);
  app.get('/customer/orders/:_id',auth,cartOrder().show);

  //Payment Routes
  app.post('/pay',auth,paymentOrder().payment);
  app.post('/pay/verify',auth,paymentOrder().verify);
  app.get('/pay/verify',auth,paymentOrder().verify);



  //Admin routes
  app.get('/admin/orders',admin,adminOrder().index);
   app.get('/admin/bookings',admin,bookingController().bookings);
  app.post('/status',statusController().update);
  
  //verify routes
  app.get('/user/verify/:userId/:uniqueString',verifyMail().verify);

  app.get('/verified',(req,res)=>{
    res.render('verified');
   })

  //Feedback routes

  app.get('/admin/feedbacks',feedbackController().dispFeedback)
  app.post('/feedback',feedbackController().feedback);

  //Subscriber Routes
  app.post('/subscribes',subscribersController().feed);
  app.get('/admin/subscribers',subscribersController().bookings)

 }

module.exports = initRoutes;
