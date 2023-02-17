const { sign } = require("crypto");
const UserVerification = require('../../models/UserVerification');
const Userreg = require('../../models/Userreg');
const bycrpt = require('bcryptjs');
const moment = require('moment');
const { format } = require("path");


function verifyMail() {
    return {

        async verify(req, res) {

            let { userId, uniqueString } = req.params;

            UserVerification.findOne({ userId: userId }).then((result) => {


                if (result) {


                    const expiresAt = result.expiresAt;



                    const hashedUniqueString = result.uniqueString;


                    let expire_fomrmatted = parseInt(moment(expiresAt).unix());
                    // let expire_ =  moment(expiresAt).format('hh-mm-ss');
                    const now = new Date();
                    const utcMilllisecondsSinceEpoch = now.getTime() + (now.getTimezoneOffset() * 60 * 1000)
                    let current_time = parseInt(Math.round(utcMilllisecondsSinceEpoch / 1000));




                    if (current_time > expire_fomrmatted) {

                        UserVerification.deleteOne({ userId }).then((result) => {
                            Userreg.deleteOne({ _id: userId }).then(() => {
                                let message = "Link has expired .Please Sign up again.";
                                res.send(`<h2 style="text-align="center">${message}</h2>`)

                            }).catch((error) => {
                                let message = "clearing user with expired unique string failed";
                                res.send(`<h2 style="text-align="center">${message}</h2>`)
                            })
                        }
                        ).catch((error) => {

                            let message = "An error occured while clearing the expired user";
                            res.send(`<h2 style="text-align="center">${message}</h2>`)

                        })
                    }
                    else {
                        // valid record exists so we validate the user string 
                        bycrpt.compare(uniqueString, hashedUniqueString).then((result) => {


                            if (result) {

                                Userreg.updateOne({ _id: userId }, { verified: "true" }).then(() => {
                                    UserVerification.deleteOne({ userId }).then(() => {

                                        res.render('verified');
                                    }
                                    ).catch((error) => {
                                        let message = "Error occured while finalising the successful verification ";
                                        res.send(`<h2 style="text-align="center">${message}</h2>`)
                                    })

                                }).catch((error) => {
                                    let message = "Error occured while updating user record to show verified ";
                                    res.send(`<h2 style="text-align="center">${message}</h2>`)

                                })
                            }

                            else {
                                let message = "Invalid verfication details passsed. Please check your Inbox";
                                res.send(`<h2 style="text-align="center">${message}</h2>`)


                            }
                        }).catch((error) => {


                            let message = "An error occured while comparing unique strings";
                            res.send(`<h2 style="text-align="center">${message}</h2>`)

                        })


                    }
                }
                else {
                    let message = "Account record doesn`t exist or already have been verified.Please SignUp or Login";
                    res.send(`<h2 style="text-align="center">${message}</h2>`)


                }
            }).catch((err) => {
                let message = "An error occured while verifying the user";
                res.send(`<h2 style="text-align="center">${message}</h2>`)



            })


        }

    }


}

module.exports = verifyMail;