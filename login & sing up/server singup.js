// show password function
function showPassowrd() {
  var x = document.querySelector(".myInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
  var x = document.querySelector(".myInput1");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}


const singupform = document.querySelector("#form")
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const userpassword = document.getElementById('userpassword1');
const userpassword2 = document.getElementById('userpassword2');

const firstnameError = document.getElementById('firstname-error');
const lastnameError = document.getElementById('lastname-error');
const emailError = document.getElementById('email-error');
const userpasswordError = document.getElementById('password-error');
const userpassword2Error = document.getElementById('password2-error');


// validation function for singup page

singupform.addEventListener('submit', (e)=>{
  
  firstnameError.innerText=""
  lastnameError.innerText=""
  emailError.innerText=""
  userpasswordError.innerText=""
  userpassword2Error.innerText=""

  //first name validation 

  if(firstname.value.length <= 3 ||firstname.value.length >= 7){
    e.preventDefault()
    firstnameError.innerText="first name must to between 4 and 8 characters"
  } 

 //last name validation 

  if(lastname.value.length <= 3 ||lastname.value.length >= 7){
    e.preventDefault()
    lastnameError.innerText="last name must to between 4 and 8 characters"
  } 

  //password validation 

  if(userpassword.value.length <= 4 ||userpassword.value.length >= 20){
    e.preventDefault()
    userpasswordError.innerText="password must to between 5 and 20 characters"
  } 

  //password confirmation validation 

  if(userpassword2.value != userpassword.value ){
    e.preventDefault()
    userpassword2Error.innerText="password must be same!"
  } 
  
})

// email validation check
singupform.addEventListener('submit', (e)=>{

  emailError.innerText=""
  
  //email validation 
  let VEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(email.value.match(VEmail)) {
      emailError.innerText=""
  }else{
    e.preventDefault()
      emailError.innerText="Invalid email address"
    }
  })

