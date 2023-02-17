
const Orders = require('../../../models/order');


function statusController() {

    return {
        update(req, res) {
            Orders.updateOne({_id: req.body.orderId}, { status: req.body.status }, (err, data)=> {
                if(err) {
                    return res.redirect('/admin/orders')
                }
                //Emit Event

                const eventEmitter=req.app.get('eventEmitter');
                eventEmitter.emit('orderUpdated',{_id:req.body.orderId, status:req.body.status });
               
                return res.redirect('/admin/orders')
            })



        }

    }




}


module.exports = statusController;