const axios = require('axios').default;


function initAdminFeedback() {

    const orderTableBodysfeed = document.querySelector('#ordertableBodysfeed')
    let feedbacks = []
    let markup;

    let hdobj = {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    };

    axios.get('/admin/feedbacks', hdobj).then(res => {
        feedbacks = res.data;
        narkup='';
        markup = genertefeedmkup(feedbacks);
        orderTableBodysfeed.innerHTML = markup;
    }).catch(err => {
        console.log(err)
    })


    
    function genertefeedmkup(feedbacks) {
        return feedbacks.map( feed => {
            return`
            <tr class="od-tr">
            
            <td >${feed.name }</td>
            <td>${ feed.email }</td>
            <td >${ feed.phone }</td>
            <td >${ feed.message}</td>
          

        </tr>
    `
        }).join('')
    }


}



module.exports = initAdminFeedback;