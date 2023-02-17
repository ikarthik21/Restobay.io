
const { renderSync }              = require('sass');
const Orders                      = require('../../../models/order');
const moment                      = require('moment');
const flash                       = require('connect-flash');
const { session }                 = require('passport');
const PaymentDetail               = require('../../../models/payment-details');
const Razorpay                    = require('razorpay');


let razorPayInstance = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET
})


function paymentOrder() {
    return {
      async payment(req,res,next){

        params = {
            amount: req.session.cart.totalPrice*100,
            currency: "INR",
            receipt: "order_1234",
            payment_capture: "1"
        }
        razorPayInstance.orders.create(params).then(async (response) => {
		const razorpayKeyId = process.env.RAZORPAY_KEY_ID
		// Save orderId and other payment details
		const paymentDetail = new PaymentDetail({
			orderId: response.id,
			receiptId: response.receipt,
			amount: response.amount,
			currency: response.currency,
			createdAt: response.created_at,
			status: response.status
		})
		try {
			// Render Order Confirmation page if saved succesfully
			await paymentDetail.save()
			res.render('payments/checkout', {
				title: "Confirm Order",
				razorpayKeyId: razorpayKeyId,
				paymentDetail : paymentDetail
			})
		} catch (err) {
			// Throw err if failed to save
			if (err) throw err;
		}
	}).catch((err) => {
		// Throw err if failed to create order
		if (err) throw err;
	})

      },

      async verify(req,res,next){
            body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
            let crypto = require("crypto");
            let expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                                    .update(body.toString())
                                    .digest('hex');
        
            // Compare the signatures
            if(expectedSignature === req.body.razorpay_signature) {
                // if same, then find the previosuly stored record using orderId,
                // and update paymentId and signature, and set status to paid.
                await PaymentDetail.findOneAndUpdate(
                    { orderId: req.body.razorpay_order_id },
                    {
                        paymentId: req.body.razorpay_payment_id,
                        signature: req.body.razorpay_signature,
                        status: "paid"
                    },
                    { new: true },
                    function(err, doc) {
                        // Throw er if failed to save
                        if(err){
                            throw err
                        }
                        else{
                             // Render payment success page, if saved succeffully
                        res.render('payments/success', {
                            title: "Payment verification successful",
                            paymentDetail: doc
                        })

                        }
                       
                    }
                ).clone().catch(function(err){ console.log(err)});
            } else {
                res.render('payments/fail', {
                    title: "Payment verification failed",
                })
            }
        
        
      }
  
    }
  
  
  }
  
  module.exports = paymentOrder;