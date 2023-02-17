let Tables = require('../../../models/book');
const flash = require('connect-flash');
const session = require('express-session');
var rando = require('random-number-in-range');

function bookController() {

  function generateRand(time, date) {
    let num;
    let k = 0;
    let exists;
    do {
      num = rando(1, 40);
      k++;
      exists = Tables.findOne({ tableno: num, date: date, time: time }).then((user) => {

      })
    } while (exists && k < 1000);


    return num;

  }

  return {

    async reserve(req, res) {

      const { name, phone, email, date, time, seat } = req.body;
      let x = generateRand(time, date);


      if (!name || !phone || !email || !date || !time || !seat) {
        req.flash('error', " All fields are required");
        req.flash('name', name);
        req.flash('phone', phone);
        req.flash('email', email);
        req.flash('date', date);
        req.flash('time', time);
        req.flash('seat', seat);

        return res.redirect('/booktable');
      }
      else {

        Tablebook = new Tables({
          name: req.body.name,
          phone: req.body.phone,
          email: req.body.email,
          date: req.body.date,
          time: req.body.time,
          seat: req.body.seat,
          tableno: x

        })


        req.session.table = x;
        req.session.date = date;
        req.session.time = time;




        const booked = await Tablebook.save();

        Tables.populate(booked, { path: 'customerId' }, (err, bookedTable) => {

          req.flash('error3', "Table booked succcesfully order food to confirm your booking");

          //Emit event 

          const eventEmitter = req.app.get('eventEmitter');
          eventEmitter.emit('tableBook', bookedTable);


          return res.redirect('/orders');
        })



      }

    }
  }
}



module.exports = bookController;
