// show password function
function showPassowrd() {
  var x = document.querySelector(".myInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}


const loginform = document.querySelector("#form")
const email = document.getElementById('email');
const userpassword = document.getElementById('userpassword');
let emailError= document.getElementById('email-error');
let userPwdError= document.getElementById('password-error');

// validation function for login page

loginform.addEventListener('submit', (e)=>{

  emailError.innerText=""
  userPwdError.innerText=""
//email validation 
let VEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(email.value.match(VEmail)) {
  emailError.innerText=""
}else{
  e.preventDefault()
  emailError.innerText="Invalid email address"
  }

  if(userpassword.value===""){
    e.preventDefault()
    userPwdError.innerText="username must to be field"
  } 
  else if(userpassword.value.length <= 4 ||userpassword.value.length >= 20){
    e.preventDefault()
    userPwdError.innerText="password must to between 5 and 20 characters"
  } 
  
})


/*

username.onkeyup = function (e) {
  if(username.value===""){
    e.preventDefault()
    userNameCheck.innerText="username must to be field"
  } 
  else if(username.value.length<4||username.value.length>20){
    e.preventDefault()
    userNameCheck.classList.add("form--massage")
    userNameCheck.classList.remove("success")
    userNameCheck.innerText="username must be between 4 and 20 characters"
  } 
  else if(username.value.length==4||username.value.lengt==20){
    e.preventDefault()
    userNameCheck.classList.remove("form--massage")
    userNameCheck.classList.add("success")
    userNameCheck.innerText="username is between 4 and 20 characters"

  } 
else{
  e.preventDefault()

}
  }
  userpassword.onkeyup = function (e) {
    if(userpassword.value===""){
      e.preventDefault()
      userPwdEcheck.innerText="username must to be field"
    } 
    else if(userpassword.value.length<4||userpassword.value.length>20){
      userPwdEcheck.classList.add("form--massage")
      userPwdEcheck.classList.remove("success")
      userPwdEcheck.innerText="username must be between 4 and 20 characters"

    } 
    else if(userpassword.value.length==4||userpassword.value.lengt==20){
      userPwdEcheck.classList.remove("form--massage")
      userPwdEcheck.classList.add("success")
      userPwdEcheck.innerText="username is between 4 and 20 characters"

    } 
    
    }
  
*/