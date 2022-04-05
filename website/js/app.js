let productList = ["hh", "gg", "uu", "rr", "rr"]; //dummy data
let addetToCart = [];
// Accordion 
function myAccFunc() {
    var x = document.getElementById("demoAcc");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

// Open and close sidebar
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

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
          addetToCart=results.cartItems;
        // visit_number.textContent = results.visit;

    }
    catch (error) {
        console.log("error", error);
    }
};

getCart("/getCart");

const productlength = document.querySelector('#car');
productlength.innerHTML = "<p>" + productList.length + " items</p>";
const ProductGrid = document.querySelector('.w3-grayscale');
productList.forEach(element => {  //set home items
    const basketProduct = document.createElement('div');
    basketProduct.classList.add('w3-col', 'l3', 's6');
    const container = document.createElement('div');
    container.className = "w3-container";
    container.innerHTML = "<div class=\"w3-display-container\"><img src=\"/images/car.png\" style=\"width:100%\">"
        + "<span class=\"w3-tag w3-display-topleft\">New</span><div class=\"w3-display-middle w3-display-hover\">"
        + "<button class=\"w3-button w3-black\" onclick=\"addNewItem()\" type=\"button\" id=\"addButton\">Buy now <i class=\"fa fa-shopping-cart\"></i></button></div></div>"
        + "<p>car<br><b>$19.99</b></p>";
    basketProduct.appendChild(container);
    ProductGrid.appendChild(basketProduct);
});
function addNewItem() {
    addetToCart.push("kl");
    let cartsend = { addetToCart };
    postCart("/postCard", cartsend);
    getCart("/getCart");
}