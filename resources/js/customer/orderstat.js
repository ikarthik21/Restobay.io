const moment = require("moment");
let hidden_inp=document.getElementById('hiddeninput');
const notie=require('notie');
const initAdmin=require('../admin');
let statuses=document.querySelectorAll('.st-itm-cls');


let order = hidden_inp?hidden_inp.value:null;
order=JSON.parse(order)


             
let time=document.createElement('span')
time.classList.add('flt-right');

function updateStatus(order){
  statuses.forEach((status)=>{
    status.classList.remove('act-col');
    status.classList.remove('comp-col');
  })

    let stpcomp=true;
    statuses.forEach(status => {
        let dataprop=status.dataset.status;
              if(stpcomp){
                               status.classList.add('comp-col');

              }
              if(dataprop==order.status){
    
                 time.innerHTML=moment(order.updatedAt).format('hh:mm A');
                   status.appendChild(time);
                   

                  stpcomp=false;
                if(status.nextElementSibling){
                    status.nextElementSibling.classList.add('act-col');
                }
              }


    });


}

updateStatus(order);

 const socket=io();
 initAdmin(socket);

 
if(order){
socket.emit('join',`order_${order._id}`);
}

let adminAreaPath=window.location.pathname;
console.log(adminAreaPath);

if(adminAreaPath.includes('admin'))
{
  socket.emit('join','adminRoom');
  socket.emit('join','admintableRoom');
}





socket.on('orderUpdated',(data)=>{
     const updatedOrder= {...order};
     updatedOrder.updatedAt=moment().format();
     updatedOrder.status=data.status;
     notie.alert({ text: 'Order Updated' });
    updateStatus(updatedOrder);
    
})