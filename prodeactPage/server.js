// product image foucs when mouse hover it fucnction  
let thumbnails = document.getElementsByClassName('thumbnail')

		let activeImages = document.getElementsByClassName('active')

		for (var i=0; i < thumbnails.length; i++){

			thumbnails[i].addEventListener('mouseover', function(){
				
				if (activeImages.length > 0){
					activeImages[0].classList.remove('active')
				}
				

				this.classList.add('active')
				document.getElementById('featured').src = this.src
			})
		}

//////////////////////////////////////////////////////////////////////////////
// stars ratings function   
const stars=document.querySelectorAll(".star")
const rating = document.querySelector('.rating')

for(let i=0;i<stars.length;i++){
stars[i].starValue=(i+1)
const doing =["mouseover","mouseout", "click","dblclick"]
doing.forEach( function(e) {
	stars[i].addEventListener(e,starRate)
});
}
function starRate(e){
	let type = e.type
	let starValue = this.starValue
	if(type ==='click'){
		if(starValue >= 1){
			rating.innerHTML= "you rated this " + starValue + " stars"
		}
	}
	
	stars.forEach(function(ele,ind){
		if(type === "click"){
			if(ind < starValue){
				ele.classList.add("fix");
			}
			else{
				ele.classList.remove("fix");
			}
		}
		if(type === "mouseover"){
			if(ind < starValue){
				ele.classList.add('over');
			}
			else{
				ele.classList.remove('over');
			}
		}
		if(type === "mouseout"){
				ele.classList.remove('over');
			
		}
		if(type === "dblclick"){
			ele.classList.remove('fix');
			rating.innerHTML= "ratings "

		
	}
	})
}
///////////////////////////////////////////////////////////////////////////////
// Add to card button function
const button = document.querySelector('#btn');
const addToCart = document.querySelector('.add-to-cart');
const addedToCart = document.querySelector('.added-to-cart');
const cart = document.querySelector('.fa-shopping-cart');
const bag = document.querySelector('.fa-shopping-bag');
let added=false;
button.addEventListener('click',()=>{
  if(added){
    addedToCart.classList.replace('added-to-cart','added-to-cart-new')
    addedToCart.classList.remove('added-to-cart-animation')
        addedToCart.classList.add('backed-to-cart-animation')

    cart.style.animation = 'cartBk 2300ms   ease-in-out backwards'
    bag.style.animation = 'bagBk 2300ms  ease-in-out backwards '

    let delayInMilliseconds = 1800; //5.5 second

setTimeout(function() {
    addToCart.classList.remove('add-to-cart-animation')
}, delayInMilliseconds)
    added = false;

  }

  else{
    addedToCart.classList.replace('added-to-cart-new','added-to-cart')
    addedToCart.classList.remove('backed-to-cart-animation')
    addToCart.classList.add('add-to-cart-animation')
    addedToCart.classList.add('added-to-cart-animation')

    cart.style.animation = 'cart 2000ms ease-in-out forwards'
    bag.style.animation = 'bag 2000ms 600ms ease-in-out forwards'
    added = true;

  }
    
});