const Feedback = require('../../../models/feedback');

function feedbackController() {
    return {

      async dispFeedback(req, res) {

      Feedback.find({}, null, { sort: { 'createdAt': -1 } }).populate().exec((err, feedbacks) => {
            if (req.xhr) {
             
               return res.json(feedbacks);
            }
            else {
                return res.render('admin/feedback');
            }
        })





    },
      async feedback(req, res) {

      const{name,email,phone,message}=req.body;
      if (!name || !phone || !email) {
        req.flash('error', " All fields are required");
        req.flash('name', name);
        req.flash('phone', phone);
        req.flash('email', email);
        req.flash('message', message);

        return res.redirect('/home');
      }
      else
      {
        
        const Feedbackdata= new Feedback({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            message:req.body.message

          })

          const feeded = await Feedbackdata.save().then((result) => {
            
            req.flash('error', "Feedback sent Successfully..!");

            return res.redirect('/home');

          });
      }




        }
    }
}

module.exports = feedbackController;
