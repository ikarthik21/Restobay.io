const oper=document.getElementById('operations');
const getst=document.getElementById("get-start");


getst.addEventListener('click',()=>{

    if(oper.style.display=="flex")
    {
        oper.style.display="none";
    }
    else{
        oper.style.display="flex";
    }
});




const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

