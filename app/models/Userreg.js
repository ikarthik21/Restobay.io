const mongoose             = require('mongoose');
const bycrypt              = require('bcryptjs');

const UserSchema = new mongoose.Schema({

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
   password: {
      type: String,
      required: true
   },
   confirmpassword: {
      type: String,
      required: true
   },
   role: {
      type: String,
      default: 'customer'
   },
   verified:{
      type:String
   }
}, { timestamps: true });


UserSchema.pre("save", async function (next) {

   //  console.log(`the current password is ${this.password}`);
   this.password = await bycrypt.hash(this.password, 10);
   //  console.log(`the current password is ${this.password}`);
   this.confirmpassword = undefined;
   next();
})










const Register = new mongoose.model("User", UserSchema);


module.exports = Register;
