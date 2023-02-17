const axios = require('axios').default;


function initAdminSubscribers() {

    const orderTableBodysubs = document.querySelector('#ordertableBodysSubs');
    let subscribers = []
    let markup;

    let hdobj = {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    };

    axios.get('/admin/subscribers', hdobj).then(res => {
        subscribers = res.data;
        markup = genertefeedmkup(subscribers);
        orderTableBodysubs.innerHTML = markup;
    }).catch(err => {
        console.log(err)
    })


    
    function genertefeedmkup(subscribers) {
        return subscribers.map( subs => {
            return`
            <tr class="od-tr">
            
            <td >${subs.name }</td>
            <td>${ subs.email }</td>
            <td >${ subs.phone }</td>
        
          

        </tr>
    `
        }).join('')
    }


}



module.exports = initAdminSubscribers;