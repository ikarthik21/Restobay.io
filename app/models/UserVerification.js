const mongoose             = require('mongoose');


const UserVerifySchema = new mongoose.Schema({
userId:String,
uniqueString: String,
createdAt :Date,
expiresAt :Date
}, { timestamps: true });











const UserVerification= new mongoose.model("UserVerification", UserVerifySchema);


module.exports = UserVerification;
