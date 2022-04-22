let user='null'; //user data

let axios = require('axios');

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
const server = app.listen(process.env.PORT||port, listening);
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



app.post('/home', function (req, res) {
    // console.log(req.body);
    user = req.body;
    res.send({ message: 'done' });
});

// get user
app.get('/getuser',function(req,res){
    res.send(user);
})
// sign out
app.get('/signout',function(req,res){
    user='null';
    res.send({message:'done'})
})

// post function to login user
app.post('/login', function (req, res) {
    var config = {
        method: 'post',
        url: 'https://e-commerce-04-2022.herokuapp.com/api/user/login',
        headers: {
            'Content-Type': 'application/json',//'multipart/form-data //application/json
        },
        data: req.body
    };
    axios(config)
        .then(function (response) {
            response = JSON.stringify(response.data);
            if (response.userId != '' || response.userId != null) {
                res.send({ message: 'done' })
            } else {
                res.send({ message: response.message })
            }
            user = response;
        })
        .catch(function (error) {
            res.send({ error: error.response.data.message });
        });
});
// end

// post function to sign up user
app.post('/signup', function (req, res) {
    var config = {
        method: 'post',
        url: 'https://e-commerce-04-2022.herokuapp.com/api/user/signup',
        headers: {
            'Content-Type': 'application/json',//'multipart/form-data //application/json
        },
        data: req.body
    };
    axios(config)
        .then(function (response) {
            response = JSON.stringify(response.data);
            if (response.userId != '' || response.userId != null) {
                res.send({ message: 'done' })
            } else {
                res.send({ message: response.message })
            }
            user = response;
        })
        .catch(function (error) {
            res.send({ error: error.response.data.message });
        });
});
// end

// get function to Get products
app.get('/getProducts', function (req, res) {
    var config = {
        method: 'get',
        url: 'https://e-commerce-04-2022.herokuapp.com/api/product/get-products',
        headers: {
        }
    };
    axios(config)
        .then(function (response) {
            response = JSON.stringify(response.data);
            res.send(response)
        })
        .catch(function (error) {
            res.send({ error: error.response.data.message });
        });
});
// end



function del() {
    let fs = require('fs');
    let FormData = require('form-data');
    // var FormData = require('form-data');
    // var fs = require('fs');
    var data = new FormData();
    data.append('title', 'hello');
    data.append('categoryName', 'animals');
    data.append('price', '200');
    data.append('quantity', '3');
    data.append('images', 'null'
        //  fs.createReadStream('/mustafa/egyptFWD/IndustryExposure/E_CommerceWebApplication/Project/website/images/car.png')
    );
    let data2 = {
        title: "hello", categoryName: 'car', price: '1000', quantity: 5, images:
            fs.createReadStream('/mustafa/egyptFWD/IndustryExposure/E_CommerceWebApplication/Project/website/images/car.png')
    };

    let data3 = { email: "mustafa@test.com", password: 'mustafatest' };

    var config = {
        method: 'post',
        url: 'https://e-commerce-04-2022.herokuapp.com/api/user/login',
        headers: {
            // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjYwN2Q1MTEyMmYyNDhmYzI5OTI5NTgiLCJuYW1lIjp7ImZpcnN0TmFtZSI6Im11c3RhZmEiLCJsYXN0TmFtZSI6InRlc3QifSwiYWRtaW4iOmZhbHNlLCJlbWFpbCI6Im11c3RhZmFAdGVzdC5jb20iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTY1MDU4ODg4MywiZXhwIjoxNjUwNTkyNDgzfQ.ZhCfsfXo8WREWjr-c7Rb7EQ2K5K-U9Zx4xVOph-Foww',
            'Content-Type': 'application/json',//'multipart/form-data //application/json
        },
        data: data3
    };

    axios(config)
        .then(function (response) {
            // console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            // console.log(error);
        });





    // var data = '';

    // var config = {
    //     method: 'delete',
    //     url: 'https://e-commerce-04-2022.herokuapp.com/api/product/6260803d50475cf39d3b04f7',
    //     headers: {
    //         'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjYwN2Q1MTEyMmYyNDhmYzI5OTI5NTgiLCJuYW1lIjp7ImZpcnN0TmFtZSI6Im11c3RhZmEiLCJsYXN0TmFtZSI6InRlc3QifSwiYWRtaW4iOmZhbHNlLCJlbWFpbCI6Im11c3RhZmFAdGVzdC5jb20iLCJpYXQiOjE2NTA0OTA3MDUsImV4cCI6MTY1MDQ5NDMwNX0.h0C_Bb-ykqiWb6qZAm-9g4siulYg67fv5MZRoAipFC8'
    //     },
    //     data: data
    // };

    // axios(config)
    //     .then(function (response) {
    //         console.log(JSON.stringify(response.data));
    //         // console.log('true');
    //     })
    //     .catch(function (error) {
    //         console.log("error");
    //     });
}
// del();