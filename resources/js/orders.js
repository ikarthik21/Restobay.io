
//order js file //

let north=document.getElementById('north');
let south=document.getElementById('south');
let desserts=document.getElementById('desserts');


let north_bt=document.getElementById('north-bt');
let south_bt=document.getElementById('south-bt');
let desserts_bt=document.getElementById('desserts-bt');
let all_bt=document.getElementById('all-bt');

all_bt.addEventListener('click',()=>{

    south.style.display="block";
    north.style.display="block";
    desserts.style.display="block";
    all_bt.style.borderBottom="4px solid #ef5644";
    north_bt.style.borderBottom="none";
    south_bt.style.borderBottom="none";
    desserts_bt.style.borderBottom="none";
});

north_bt.addEventListener('click',()=>{
    south.style.display="none";
    north.style.display="block";
    desserts.style.display="none";
    north_bt.style.borderBottom=" 4px solid #ef5644";
    south_bt.style.borderBottom="none";
    desserts_bt.style.borderBottom="none";
    all_bt.style.borderBottom="none";
    
});

south_bt.addEventListener('click',()=>{
    south.style.display="block";
    north.style.display="none";
    desserts.style.display="none";
    south_bt.style.borderBottom=" 4px solid #ef5644";
    north_bt.style.borderBottom="none";
    desserts_bt.style.borderBottom="none";
    all_bt.style.borderBottom="none";
});

desserts_bt.addEventListener('click',()=>{
    south.style.display="none";
    north.style.display="none";
    desserts.style.display="block";
    desserts_bt.style.borderBottom="4px solid #ef5644";
    north_bt.style.borderBottom="none";
    all_bt.style.borderBottom="none";
    south_bt.style.borderBottom="none";
});

//orders file js end //
