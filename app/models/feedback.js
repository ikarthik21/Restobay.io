const mongoose             = require('mongoose');

const FeedbackSchema = new mongoose.Schema({

   name: {
      type: String,
      required: true
   },
   email: {
    type: String,
    required: true,
    unique: true
 },
   phone: {
      type: Number,
      required: true,
      unique: true
   },
   message: {
      type: String,
      required: true
   }
}, { timestamps: true });

const Feedback = new mongoose.model("Feedback", FeedbackSchema);


module.exports = Feedback;
