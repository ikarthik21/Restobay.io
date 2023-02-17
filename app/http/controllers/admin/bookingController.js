const Tables = require('../../../models/book')

function bookingController() {
    return {
        bookings(req, res) {

            Tables.find({}, null, { sort: { 'createdAt': -1 } }).populate().exec((err, bookings) => {
                if (req.xhr) {
                   return res.json(bookings);
                }
                else {
                    return res.render('admin/bookings');
                }
            })





        }
    }
}

module.exports = bookingController;
