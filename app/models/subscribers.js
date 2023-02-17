const mongoose             = require('mongoose');

const subscribersSchema = new mongoose.Schema({

   name: {
      type: String,
    
   },
   email: {
    type: String,
    required: true
 },
   phone: {
      type: Number,
   }
}, { timestamps: true });

const Subscribers = new mongoose.model("Subscribers", subscribersSchema);


module.exports = Subscribers;
