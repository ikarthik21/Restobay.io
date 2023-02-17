let sgup_bt=document.getElementById('sign-up-bt');
let log_bt=document.getElementById('log-up-bt');
let sgup_bbx=document.getElementById('pg-sign-up');

let sign_upf=document.getElementById('pg-sup-in');
let login_box=document.getElementById('pg-log-in');
let log_ask=document.getElementById('pg-log-up');

sgup_bt.addEventListener('click',()=>{

    sgup_bbx.style.display="none";
    login_box.style.display="none";
    sign_upf.style.display="flex";
     log_ask.style.display="flex";
});


log_bt.addEventListener('click',()=>{

    sgup_bbx.style.display="flex";
    login_box.style.display="flex";
    sign_upf.style.display="none";
     log_ask.style.display="none";

})