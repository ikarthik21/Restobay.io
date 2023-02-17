const moment=require('moment');
const axios = require('axios').default;
const notie=require('notie');

function initAdmin(socket) {
    const orderTableBody = document.querySelector('#ordertableBody')
    let orders = []
    let markup;

  let hdobj={
    headers: {
        "X-Requested-With": "XMLHttpRequest"
    }
};

    axios.get('/admin/orders', hdobj).then(res => {
        orders = res.data
         markup = generateMarkup(orders)
        orderTableBody.innerHTML = markup
    }).catch(err => {
        console.log(err)
    })

    function renderItems(items) {
        let parsedItems = Object.values(items)
        return parsedItems.map((menuItem) => {
            return `
                <p class="order_itm">${ menuItem.item.name } - ${ menuItem.qty } pcs </p>
            `
        }).join('')
      }

    function generateMarkup(orders) {
        return orders.map(order => {
            return `
                <tr class="od-tr">
                <td class="order-dtls">
                    <p class="dtls-id" >Order-Id: ${ order._id }</p>
                    <div>${ renderItems(order.items) }</div>
                </td>
                <td class="\">${ order.name }</td>
                <td class="border px-4 py-2">${ order.tableno }</td>

                <td class="td-box">
                    <div class="">


                        <form action= "/status" method="POST">

                            <input type="hidden" name="orderId" value="${ order._id }">
                           
                            <select name="status" onchange="this.form.submit()" class="select-bt">
                                <option value="order_placed"
                                    ${ order.status === 'order_placed' ? 'selected' : '' }>
                                    Placed
                                </option>
                                <option value="confirmed" ${ order.status === 'confirmed' ? 'selected' : '' }>
                                    Confirmed
                                </option>
                                <option value="prepared" ${ order.status === 'prepared' ? 'selected' : '' }>
                                    Prepared</option>
                                <option value="delivered" ${ order.status === 'delivered' ? 'selected' : '' }>
                                    Delivered
                                </option>
                                <option value="completed" ${ order.status === 'completed' ? 'selected' : '' }>
                                    Completed
                                </option>
                            </select>

                        </form>


                      

                    </div>

                </td>
                <td class="border px-4 py-2">
                    ${ moment(order.createdAt).format('hh:mm A') }
                </td>
                <td class="border px-4 py-2">
                ${ order.inst }
            </td>
               
            </tr>
        `
        }).join('')
    }
    socket.on('orderPlaced',(order)=>{
        notie.alert({ text: 'A New Order Received' });
        orders.unshift(order);
        orderTableBody.innerHTML =' ';
        orderTableBody.innerHTML =generateMarkup(orders);
    })
    

    
}



module.exports=initAdmin;