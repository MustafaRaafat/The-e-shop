

const forgetpassword = document.querySelector("#form")
const emailcheck = document.getElementById('useremail');
const emailError = document.getElementById('email--error');


forgetpassword.addEventListener('submit', (e)=>{

emailError.innerText=""

//email validation 
let VEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(emailcheck.value.match(VEmail)) {
    emailError.innerText=""
}else{
  e.preventDefault()
    emailError.innerText="Invalid email address"
  }
})
//email validation method
// /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/