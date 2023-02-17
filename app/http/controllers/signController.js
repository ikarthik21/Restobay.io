let Register = require('../../models/Userreg')
let UserVerification = require('../../models/UserVerification');
const express = require("express");
const app = express();
const bycrypt = require('bcryptjs');
const flash = require('connect-flash');
require('dotenv').config();
const passport = require('passport');

//Nodemailer Setup
const Nodemailer = require('nodemailer');

//Unique String
const { v4: uuidv4 } = require('uuid');
const { verify } = require('crypto');
const { error, log } = require('console');

//nodemailer transporter
let transporter = Nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,

  }
  
})


//testing success
transporter.verify((err, success) => {
  if (err) {
    console.log(err);

  }
  else {
    console.log("ready for messgaes");

  }
})



function signController() {

  const _getRedirectURL = (req) => {
    return req.user.role == 'admin' ? '/admin/orders' : '/customer/orders';
  }

  return {
    sign(req, res) {

      res.render('sign');
    },

    async signup(req, res) {

      // send verification email
      const sendVerificationEmail = ({ _id, email }, res) => {
        //Url to be used in the email
        const currentUrl = process.env.CURRENT_URL;

        const UniqueString = uuidv4() + _id;
        //  console.log(`${currentUrl +"user/verify/"+_id+"/"+ UniqueString}`);


        //mail options

        const mailOptions = {
          from: process.env.AUTH_EMAIL,
          to: email,
          subject: "Verify your Email",
          html: `<p> Verify your email address to complete the signup and login in to your account </p><p> <b>This link expires in 6 Hours</b></p><p>
       Click <a href=${currentUrl + "user/verify/" + _id + "/" + UniqueString}> here  </a> to proceed.</p>`
        };
        // 

        //Hash the Unique String 
        const rounds = 10;
        bycrypt.hash(UniqueString, rounds).then((hashedUniqueString) => {

          const newVerification = new UserVerification({
            userId: _id,
            uniqueString: hashedUniqueString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 21600000,

          })

          newVerification.save().then(() => {
            transporter.sendMail(mailOptions).then(() => {
              req.flash('error', "Verification Pending ...! Please check your Mail");

            }).catch((error) => {
              console.log(error);
              req.flash('error', "Email Verification Failed")

            })
          }).catch((error) => {
            console.log(error);
            req.flash('error', "Couldn`t save user details")



          })


        }).catch((error) => {

          console.log(error);
          req.flash('error', "Error occured while hashing the email data")


        })



      }



      const { name, phone, email, password, confirmpassword } = req.body;
      if (!name || !phone || !email || !password) {
        req.flash('error', " All fields are required");
        req.flash('name', name);
        req.flash('phone', phone);
        req.flash('email', email);

        return res.redirect('/sign');
      }
      else {


        const pass = req.body.password;
        const cpass = req.body.confirmpassword;
        if (pass === cpass) {

          const registerEmp = new Register({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
            confirmpassword: req.body.confirmpassword,
            verified: "false"

          })

          const registered = await registerEmp.save().then((result) => {
            sendVerificationEmail(result, res);
            req.flash('error', "User Registered successfully please verify your mail")
            return res.redirect('/sign');

          });




        }
        else {
          req.flash('error', " Both passwords must be same");
          req.flash('name', name);
          req.flash('phone', phone);
          req.flash('email', email);

          return res.redirect('/sign');
        }
      }
    },
    async signin(req, res, next) {


      const { email, password } = req.body;

      // Validate request 
      if (!email || !password) {
        req.flash('error1', 'All fields are required')
        return res.redirect('/sign')
      }
      passport.authenticate('local', (err, user, info) => {
        if (err) {
          req.flash('error1', info.message)
          return next(err)
        }
        if (!user) {
          req.flash('error1', info.message)
          return res.redirect('/sign')
        }
        req.logIn(user, (err) => {
          if (err) {
            req.flash('error1', info.message)
            return next(err)
          }

          Register.findOne({ email: email }).then((result) => {
   
            if (result.verified == "true") {
           
              return res.redirect(_getRedirectURL(req));
            }
            else {
              res.send('<h2 style="text-align="center">Please verify your mail and Try Again</h2>')
            }


          })




        })

      })(req, res, next);

    }, logout(req, res, next) {
      req.logout(function (err) {
        if (err) {
          return next(err);
        }

        res.redirect('/');

      });
    }

  };
}

module.exports = signController;
