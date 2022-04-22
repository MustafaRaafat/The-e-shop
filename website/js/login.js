// show password function
function showPassowrd() {
  var x = document.querySelector(".myInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

const button = document.getElementById("button");
const loginform = document.querySelector("#form")
const email = document.getElementById('email');
const userpassword = document.getElementById('userpassword');
let emailError = document.getElementById('email-error');
let userPwdError = document.getElementById('password-error');
const modelText = document.getElementById('modelText');

// When the user clicks anywhere outside of the modal, close it
const modal = document.getElementById("myModal");
// window.onclick = function (event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }
const span = document.getElementById('close');
span.onclick = function () {
  modal.style.display = "none";
}

// validation function for login page

loginform.addEventListener('submit', (e) => {
  button.innerHTML = '<i class="fa fa-spinner fa-spin"></i>';

  emailError.innerText = ""
  userPwdError.innerText = ""
  //email validation 
  let VEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.value.match(VEmail)) {
    emailError.innerText = ""
    if (userpassword.value === "") {
      e.preventDefault()
      button.innerHTML = "Login";
      userPwdError.innerText = "username must to be field"
    }
    else if (userpassword.value.length <= 4 || userpassword.value.length >= 20) {
      e.preventDefault()
      button.innerHTML = "Login";
      userPwdError.innerText = "password must to between 5 and 20 characters"
    } else {
      e.preventDefault();
      let data = { email: email.value, password: userpassword.value };
      senddata(data);
    }
  } else {
    e.preventDefault()
    button.innerHTML = "Login";
    emailError.innerText = "Invalid email address"
  }



})
const senddata=async(data={})=>{
  const res = await fetch('/login', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const clintnewdata = await res.json();
    // console.log(clintnewdata);
    if (clintnewdata.message=='done') {
      window.location.replace('/index.html');
    }else{
        modal.style.display = 'block';
        modelText.innerText = clintnewdata.error;
        button.innerHTML = "Login";
    }
    return clintnewdata;
  } catch (error) {
    console.log('error');
  }
}