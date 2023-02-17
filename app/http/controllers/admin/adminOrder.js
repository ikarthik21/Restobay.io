const Orders = require('../../../models/order')

function adminOrder() {
    return {
        index(req, res) {

            Orders.find({}, null, { sort: { 'createdAt': -1 } }).populate().exec((err, orders) => {
                if (req.xhr) {
                   return res.json(orders);
                }
                else {
                    return res.render('admin/orders');
                }
            })





        }
    }
}

module.exports = adminOrder;
