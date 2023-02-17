require('dotenv').config();

const express               =require("express");
const app                   =express();
const PORT                  =process.env.PORT || 3000;
const ejs                   =require("ejs");
const path                  =require("path");
const mongoose              =require('mongoose');
const MongoStore            =require('connect-mongo');
const session               =require('express-session');
const flash                 =require('connect-flash');
// const { MongoClient } = require('mongodb');
// const mongo = new MongoClient(`mongodb://localhost:27017/connect_mongodb_session_test`);

// const MongoDBStore = require('express-mongodb-session')(session);

const passport              =require('passport');
const expressLayout         =require("express-ejs-layouts");
const vp                    =path.join(__dirname, "/resources/views");
const http                  =require('http').Server(app);
const io                    =require('socket.io')(http);
const Emitter               =require('events');
const Razorpay              =require('razorpay');
app.use(expressLayout);
app.set("views", vp);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(flash());


// Mongo Connection ........//
const url=process.env.MONGO_CONNECTION_URL;;
mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    
},(err)=>{
    if(err){ 
        console.log("No Connection");
    }
    else{
        console.log("Connection established successfully");
    }
})


// // Mongo Connection  END  ........//


//Event Emitter ---//

const eventEmitter=new Emitter();
app.set('eventEmitter',eventEmitter);



//Event Emitter End ---//

// Session storage  ........//
app.use(session({ secret: process.env. COOKIE_SECRET,
  resave: false,
   saveUninitialized: true,

cookie: { maxAge: 1000*60*60*24 }}))

// const store = new MongoDBStore({
//   existingConnection: mongo,
//   collection: 'mySessions'
// });

// const store = new MongoDBStore({
//   uri: process.env.MONGO_CONNECTION_URL,
//   collection: 'sessions'
// });

// store.on('error', function(error) {
//   console.log(error);
// });

// app.use(require('express-session')({
//   secret: process.env.COOKIE_SECRET,
//   cookie: {
//     maxAge: 1000*60*60*24
//   },
//   store: store,
//   resave: false,
//   saveUninitialized: true
// }));

//Session Storage End ........//

//Passport Configuration........
const passportInit = require('./app/config/passport');
const { log } = require('console');
const Orders = require('./app/models/order');
passportInit(passport)
app.use(passport.initialize());
app.use(passport.session());



//Passport Configuration End ......//


//middlewares config............//

app.use((req,res,next)=>{
  res.locals.session=req.session;
  res.locals.messages = req.flash();
  res.locals.user=req.user;
      next();
})

//middlewares config End............//

require("./routes/web")(app);

io.on('connection',(socket)=>{
   socket.on('join',(orderId)=>{
    socket.join(orderId);

   })
})

http.listen(PORT,()=>{
    console.log('The server is live at port 3000');
})

eventEmitter.on('orderUpdated',(data)=>{
io.to(`order_${data._id}`).emit('orderUpdated',data);
});

eventEmitter.on('orderPlaced',(data)=>{
  io.to(`adminRoom`).emit('orderPlaced',data);
  });
  
