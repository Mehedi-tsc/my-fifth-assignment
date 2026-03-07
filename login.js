const inputUserName = document.getElementById('input-name');
const inputPassword = document.getElementById('input-password');
const loginBtn = document.getElementById('btn-login');
loginBtn.addEventListener('click',function(){
    if(inputUserName.value!=='admin'){
        alert('Please give the correct Username');
    }
    else if(inputPassword.value!=='admin123'){
         alert('Please give the correct Password');
    }
    else if(inputUserName.value==='admin' && inputPassword.value==='admin123' ){
       alert('login successfull');
        window.location.assign("home.html");
    }
})