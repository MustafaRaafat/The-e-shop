// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

/* Initializing the main project folder */
app.use(express.static('website'));

const port = 8000;
const server = app.listen(port, listening);
function listening() {
    console.log("server running");
    console.log(`running on localhost: ${port}`);
}

// Post Cart Route
let cartItems = [];
app.post('/postCard', setCartItem);
function setCartItem(req, res) {
    cartItems = req.body.addetToCart;
    // console.log(cartItems);
}

// Callback function to complete GET '/sendcart'

app.get('/getCart', function (req, res) {
    let cart = { cartItems };
    // console.log(cart);
    res.send(cart);
});

app.post('/singup', function (req, res) {
    console.log(req.body);
    console.log('done =>');
    ss("j");
})

