let productList = ["hh", "gg", "uu", "rr", "rr"]; //dummy data
let addetToCart = [];
const productlength = document.querySelector('#ProductNum');
const ProductGrid = document.querySelector('.pro');
const sidebar=document.getElementById("myTopnav");
const supportEmail=document.getElementById("supportEmail");
const supportSubject=document.getElementById("supportSubject");
const supportMessage=document.getElementById("supportMessage");


/*Function to Sidebar/menu*/
sidebar.innerHTML="<a href=\"#Home\" class=\"active\">Home</a><a href=\"login.html\">Login</a>"+
"<a href=\"#Product\">Product</a><a href=\"#footer\">footer</a><a href=\"#Subscribe\">Subscribe </a>"+
"<a href=\"fqa.html\">FQA</a><a href=\"javascript:void(0)\" onclick=\"document.getElementById('support').style.display='block'\">"+
"Support</a><a href=\"admin/index.html\">Admin</a>";

/* Function to POST data */
const postCart = async (url = '', data = {}) => {
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
/* Function to GET Data */
const getCart = async (url = '') => {
  const responseFromServer = await fetch(url);
  try {
    const results = await responseFromServer.json();
    //   console.log(results.cartItems);
    addetToCart = results.cartItems;
    // visit_number.textContent = results.visit;

  }
  catch (error) {
    console.log("error", error);
  }
};

getCart("/getCart");
getProducts();

// function to get productList from api
function getProducts() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("https://e-commerce-04-2022.herokuapp.com/api/product/get-products", requestOptions)
    .then(response => response.json())
    .then(result => {
      productlength.innerHTML = "<p>" + result.products.length + " items</p>";
      console.log(result);
      console.log(result.products[0].title);
      for(let element in result.products){
      // result.products.forEach(element => {  //set home items
        const basketProduct = document.createElement('div');
        basketProduct.classList.add('w3-col', 'l3', 's6');
        const container = document.createElement('div');
        container.className = "w3-container";
        container.innerHTML = "<div class=\"w3-display-container\"><img src=\"/images/car.png\" style=\"width:100%\">"
          + "<span class=\"w3-tag w3-display-topleft\">New</span><div class=\"w3-display-middle w3-display-hover\">"
          + "<button class=\"w3-button w3-black\" onclick=\"addNewItem()\" type=\"button\" id=\"addButton\">Buy now <i class=\"fa fa-shopping-cart\"></i></button></div></div>"
          + "<p>"+result.products[element].title+"<br><b>$"+result.products[element].price+"</b></p>";
        basketProduct.appendChild(container);
        ProductGrid.classList.add('w3-row', 'w3-grayscale');
        ProductGrid.appendChild(basketProduct);
      }
    })
    .catch(error => console.log('error', error));
}


function addNewItem() {
  addetToCart.push("kl");
  let cartsend = { addetToCart };
  postCart("/postCard", cartsend);
  getCart("/getCart");
}


// function to send support
const sendSupportToAPI = async (data = {}) => {
  const res = await fetch("https://e-commerce-04-2022.herokuapp.com/api/user/support", {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const clintnewdata = await res.json();
    console.log('return');
    console.log(clintnewdata);
    return clintnewdata;
  } catch (error) {
    console.log('error');
  }
}
function sendSupport() {
  let data={email:supportEmail.value,subject:supportSubject.value,
    message:supportMessage.value}
    console.log(data);
    sendSupportToAPI(data);
}



/* image slider */
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}