const moment = require('moment');
const axios = require('axios').default;
const notie = require('notie');

function initAdminbookings() {

    const orderTableBodys = document.querySelector('#ordertableBodys')
    let bookings = []
    let markup;

    let hdobj = {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    };

    axios.get('/admin/bookings', hdobj).then(res => {
        bookings = res.data;
        markup = genertemkup(bookings);
        orderTableBodys.innerHTML = markup;
    }).catch(err => {
        console.log(err)
    })


    
    function genertemkup(bookings) {
        return bookings.map( book => {
            return `
                <tr class="od-tr">
                
                <td class="">${book.name }</td>
                <td class="border px-4 py-2">${ book.phone }</td>
                <td >${ book.tableno }</td>
                <td >${ book.date}</td>
                <td >${ book.time }</td>

            </tr>
        `
        }).join('')
    }


}



module.exports = initAdminbookings;