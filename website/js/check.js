const remove = document.querySelector('#removeButton');
let productList = [];
const basket = document.querySelector('.basket');
/* Function to GET Data */
const getCart = async (url = '') => {
  const responseFromServer = await fetch(url);
  try {
      const results = await responseFromServer.json();
        // console.log(results.cartItems);
        productList=results.cartItems;
        update();
        

  }
  catch (error) {
      console.log("error", error);
  }
};
getCart("/getCart");


function removeItem(data) {

}
// function to update and show order list
function update() {
  productList.forEach(element =>{
  const basketProduct = document.createElement('div');
  basketProduct.className = "basket-product";
  const item = document.createElement('div');
  item.className = "item";
  const productImage = document.createElement('div');
  productImage.className = "product-image";
  const productFrame = document.createElement('img');
  productFrame.className = "product-frame";
  productFrame.src="images/car.png";
  productFrame.alt="car.png";
  productImage.appendChild(productFrame);
  item.appendChild(productImage);
  const productDetails=document.createElement('div');
  productDetails.className=("product-details");
  productDetails.innerHTML="<h1><strong><span class=\"item-quantity\">"+4+
  "</span> x Eliza J</strong> Lace Sleeve Cuff Dress</h1><p><strong>Navy, Size 18</strong></p><p>Product Code - 232321939</p>"
  item.appendChild(productDetails);
  basketProduct.appendChild(item);
  const price=document.createElement('div');
  price.className="price"
  price.textContent="26";
  basketProduct.appendChild(price)
  const quantity=document.createElement('div');
  quantity.className="quantity";
  quantity.innerHTML="<input type=\"number\" value=\"4\" min=\"1\" class=\"quantity-field\">"
  basketProduct.appendChild(quantity);
  const subtotal=document.createElement('div');
  subtotal.className="subtotal";
  subtotal.textContent="104.00";
  basketProduct.appendChild(subtotal);
  const remove=document.createElement('div');
  remove.innerHTML="<button>Remove</button>"
  remove.className="remove";
  basketProduct.appendChild(remove);
  basket.appendChild(basketProduct);
});
}


function display(productList) {
  const basketProduct = document.createElement('div');
  basketProduct.className = "basket-product";
  const item = document.createElement('div');
  item.className = "item";
  const productImage = document.createElement('div');
  productImage.className = "product-image";
  const productFrame = document.createElement('img');
  productFrame.className = "product-frame";
  productFrame.src="images/car.png";
  productFrame.alt="car.png";
  productImage.appendChild(productFrame);
  item.appendChild(productImage);
  const productDetails=document.createElement('div');
  productDetails.className=("product-details");
  productDetails.innerHTML="<h1><strong><span class=\"item-quantity\">"+4+
  "</span> x Eliza J</strong> Lace Sleeve Cuff Dress</h1><p><strong>Navy, Size 18</strong></p><p>Product Code - 232321939</p>"
  item.appendChild(productDetails);
  basketProduct.appendChild(item);
  const price=document.createElement('div');
  price.className="price"
  price.textContent="26";
  basketProduct.appendChild(price)
  const quantity=document.createElement('div');
  quantity.className="quantity";
  quantity.innerHTML="<input type=\"number\" value=\"4\" min=\"1\" class=\"quantity-field\">"
  basketProduct.appendChild(quantity);
  const subtotal=document.createElement('div');
  subtotal.className="subtotal";
  subtotal.textContent="104.00";
  basketProduct.appendChild(subtotal);
  const remove=document.createElement('div');
  remove.innerHTML="<button>Remove</button>"
  remove.className="remove";
  basketProduct.appendChild(remove);
  basket.appendChild(basketProduct);

}
// display(productList);




/* Set values + misc */
var promoCode;
var promoPrice;
var fadeTime = 300;

/* Assign actions */
// $('.quantity input').change(function() {
//   updateQuantity(this);
// });

// $('.remove button').click(function() {
//   removeItem(this);
// });

// $(document).ready(function() {
//   updateSumItems();
// });

// $('.promo-code-cta').click(function() {

//   promoCode = $('#promo-code').val();

//   if (promoCode == '10off' || promoCode == '10OFF') {
//     //If promoPrice has no value, set it as 10 for the 10OFF promocode
//     if (!promoPrice) {
//       promoPrice = 10;
//     } else if (promoCode) {
//       promoPrice = promoPrice * 1;
//     }
//   } else if (promoCode != '') {
//     alert("Invalid Promo Code");
//     promoPrice = 0;
//   }
//   //If there is a promoPrice that has been set (it means there is a valid promoCode input) show promo
//   if (promoPrice) {
//     $('.summary-promo').removeClass('hide');
//     $('.promo-value').text(promoPrice.toFixed(2));
//     recalculateCart(true);
//   }
// });

// /* Recalculate cart */
// function recalculateCart(onlyTotal) {
//   var subtotal = 0;

//   /* Sum up row totals */
//   $('.basket-product').each(function() {
//     subtotal += parseFloat($(this).children('.subtotal').text());
//   });

//   /* Calculate totals */
//   var total = subtotal;

//   //If there is a valid promoCode, and subtotal < 10 subtract from total
//   var promoPrice = parseFloat($('.promo-value').text());
//   if (promoPrice) {
//     if (subtotal >= 10) {
//       total -= promoPrice;
//     } else {
//       alert('Order must be more than £10 for Promo code to apply.');
//       $('.summary-promo').addClass('hide');
//     }
//   }

//   /*If switch for update only total, update only total display*/
//   if (onlyTotal) {
//     /* Update total display */
//     $('.total-value').fadeOut(fadeTime, function() {
//       $('#basket-total').html(total.toFixed(2));
//       $('.total-value').fadeIn(fadeTime);
//     });
//   } else {
//     /* Update summary display. */
//     $('.final-value').fadeOut(fadeTime, function() {
//       $('#basket-subtotal').html(subtotal.toFixed(2));
//       $('#basket-total').html(total.toFixed(2));
//       if (total == 0) {
//         $('.checkout-cta').fadeOut(fadeTime);
//       } else {
//         $('.checkout-cta').fadeIn(fadeTime);
//       }
//       $('.final-value').fadeIn(fadeTime);
//     });
//   }
// }

// /* Update quantity */
// function updateQuantity(quantityInput) {
//   /* Calculate line price */
//   var productRow = $(quantityInput).parent().parent();
//   var price = parseFloat(productRow.children('.price').text());
//   var quantity = $(quantityInput).val();
//   var linePrice = price * quantity;

//   /* Update line price display and recalc cart totals */
//   productRow.children('.subtotal').each(function() {
//     $(this).fadeOut(fadeTime, function() {
//       $(this).text(linePrice.toFixed(2));
//       recalculateCart();
//       $(this).fadeIn(fadeTime);
//     });
//   });

//   productRow.find('.item-quantity').text(quantity);
//   updateSumItems();
// }

// function updateSumItems() {
//   var sumItems = 0;
//   $('.quantity input').each(function() {
//     sumItems += parseInt($(this).val());
//   });
//   $('.total-items').text(sumItems);
// }

// /* Remove item from cart */
// function removeItem(removeButton) {
//   /* Remove row from DOM and recalc cart total */
//   var productRow = $(removeButton).parent().parent();
//   productRow.slideUp(fadeTime, function() {
//     productRow.remove();
//     recalculateCart();
//     updateSumItems();
//   });
// }