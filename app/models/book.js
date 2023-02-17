const mongoose             = require('mongoose');

const BookSchema = new mongoose.Schema({

   name: {
      type: String,
      required: true
   },
   phone: {
      type: Number,
      required: true,
      unique: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   date: {
      type: String,
      required: true
   },
   time: {
      type: String,
      required: true
   },
   seat: {
      type: Number,
      required: true
   },
   tableno:{
        type:Number,
        default:0
   }
}, { timestamps: true });


const Tables= new mongoose.model('Tablebook', BookSchema)

module.exports = Tables;

