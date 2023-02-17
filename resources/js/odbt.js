const axios = require('axios').default;
let buttons = document.getElementsByClassName("add-cart"); 
 let arry = Array.from(buttons);
 let add_crt=document.querySelector('#cart-cnt');

const notie=require('notie');


function updatecart(pizza){
   axios.post('/update-cart',pizza).then(res=>{
       let ct=res.data.totalQty;
       console.log(ct);
       add_crt.innerHTML=ct;
       notie.alert({ text: 'Added Item to Cart' });
      
   })
}


for(let x=0;x<arry.length;x++){
   arry[x].addEventListener('click',()=>{
    
let pizza=JSON.parse(arry[x].dataset.pizza);
     updatecart(pizza);
   // console.log(dd);
   })
}


