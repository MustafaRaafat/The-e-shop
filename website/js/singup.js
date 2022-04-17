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

const button=document.querySelector('button');
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
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

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
span.onclick = function() {
  modal.style.display = "none";
}

// validation function for singup page

singupform.addEventListener('submit', (e) => {

  firstnameError.innerText = ""
  lastnameError.innerText = ""
  emailError.innerText = ""
  userpasswordError.innerText = ""
  userpassword2Error.innerText = ""

  //first name validation 

  if (firstname.value.length <= 3 || firstname.value.length >= 7) {
    e.preventDefault()
    firstnameError.innerText = "first name must to between 4 and 8 characters"
  }

  //last name validation 

  if (lastname.value.length <= 3 || lastname.value.length >= 7) {
    e.preventDefault()
    lastnameError.innerText = "last name must to between 4 and 8 characters"
  }

  //password validation 

  if (userpassword.value.length <= 4 || userpassword.value.length >= 20) {
    e.preventDefault()
    userpasswordError.innerText = "password must to between 5 and 20 characters"
  }

  //password confirmation validation 

  if (userpassword2.value != userpassword.value) {
    e.preventDefault()
    userpassword2Error.innerText = "password must be same!"
  }

})

// email validation check
singupform.addEventListener('submit', (e) => {

  emailError.innerText = ""

  //email validation 
  let VEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.value.match(VEmail)) {
    emailError.innerText = ""
  } else {
    e.preventDefault()
    emailError.innerText = "Invalid email address"
  }
})


singupform.addEventListener('submit', (e)=>{
  button.innerHTML='<i class="fa fa-spinner fa-spin"></i>';

  if(emailError.innerText == "" && firstnameError.innerText == "" &&lastnameError.innerText == ""
  &&userpasswordError.innerText == "" &&  userpassword2Error.innerText == ""
  ){
let s={firstname:firstname.value,lastname:lastname.value,email:email.value,userpassword:userpassword.value};

    sendData(s);
    
    
  }
  
  e.preventDefault();
});

var formdata;
/*send user data */
function sendData(ew) {
  formdata = new FormData();
  formdata.append("firstName", ew.firstname);
  formdata.append("lastName", ew.lastname);
  formdata.append("email", ew.email);
  formdata.append("password", ew.userpassword);
  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };
  fetch("https://e-commerce-04-2022.herokuapp.com/api/user/signup", requestOptions)
    .then(response => {
      if (response.status==422) {
        modal.innerHTML="<div class=\"modal-content\"><span class=\"close\">&times;</span><p>"+
      "Oops.. try again"+"</p></div>";
      modal.style.display="block";
      }
    })
    .then(result => {
      // modal.innerHTML="<div class=\"modal-content\"><span class=\"close\">&times;</span><p>"+
      // result+"</p></div>";
      // modal.style.display="block";
      // button.innerHTML='sing up';
      //  console.log(result+"  yes me");
    })
    .catch(error => console.log('error', error+"  no me"));
}

/* Function to POST data */
const postUser = async (url = '', data = {}) => {
  const res = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  });
  try {
      const clintnewdata = await res.json();
      return clintnewdata;
  } catch (error) {
      console.log('error');
  }
}