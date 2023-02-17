const Subscribers = require('../../../models/subscribers');


function subscribersController() {
    return {
        async bookings(req, res) {

            Subscribers.find({}, null, { sort: { 'createdAt': -1 } }).populate().exec((err, subscribers) => {
                if (req.xhr) {
                    return res.json(subscribers);
                }
                else {
                    return res.render('admin/subscribers');
                }
            })





        }
        ,
        async feed(req, res) {
              

            const{email}=req.body;

            if ( !email) {
              req.flash('error', " All fields are required");
             
              return res.redirect('/home');
            }
            else
            {
              
              const subsData= new Subscribers({
                  email: req.body.email,
                  name:req.user.name,
                  phone:req.user.phone
                })
      
                const subsced = await subsData.save().then((result) => {
                  
                  req.flash('error', "User Subscribed Successfully..!");
      
                  return res.redirect('/home');
      
                });
            }
      
      


        }
    }
}

module.exports = subscribersController;
