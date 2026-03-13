let cart = []
let cartCount = document.getElementById("cart-count")
let cartItems = document.getElementById("cart-items")
let cartTotal = document.getElementById("cart-total")

setTimeout(()=> {

const increaseBtns = document.querySelectorAll(".increase")
const decreaseBtns = document.querySelectorAll(".decrease")
const addToCartBtns = document.querySelectorAll(".add-to-cart")

/* INCREASE QUANTITY */

increaseBtns.forEach(btn=>{
btn.addEventListener("click", ()=>{

let input = btn.parentElement.querySelector("input")
input.value = parseInt(input.value) + 1

})
})

/* DECREASE QUANTITY */

decreaseBtns.forEach(btn=>{
btn.addEventListener("click", ()=>{

let input = btn.parentElement.querySelector("input")

if(input.value > 1){
input.value = parseInt(input.value) - 1
}

})
})

/* ADD TO CART */

addToCartBtns.forEach(btn=>{

btn.addEventListener("click",()=>{

let card = btn.parentElement

let name = card.querySelector("h3").textContent
let price = parseInt(card.querySelector(".price").textContent.replace("GHS","").trim())
let image = card.querySelector("img").src
let quantity = parseInt(card.querySelector("input").value)

/* VALIDATION */

if(!quantity || quantity <= 0){

alert("Please enter a valid quantity before adding to cart.")
return

}

/* UPDATED CART COUNT*/

cart.push({
name:name,
price:price,
image:image,
quantity:quantity
})

updateCart()
alert(quantity + " item(s) added to cart successfully.")

})

})

},100)
function updateCart(){

cartItems.innerHTML=""
let total=0
let count=0

cart.forEach((item,index)=>{

total += item.price * item.quantity
count += item.quantity

cartItems.innerHTML += `
<div class="cart-item">

<img src="${item.image}">

<div>
<h4>${item.name}</h4>
<p>GHS ${item.price}</p>
</div>

<div class="cart-controls">
<button onclick="decreaseItem(${index})">-</button>
<span>${item.quantity}</span>
<button onclick="increaseItem(${index})">+</button>
<button onclick="removeItem(${index})">x</button>
</div>

</div>
`
})

cartTotal.textContent = total
cartCount.textContent = count

if(count>0){
cartCount.style.display="flex"
}else{
cartCount.style.display="none"
}

}

function increaseItem(index){
cart[index].quantity++
updateCart()
}

function decreaseItem(index){

if(cart[index].quantity>1){
cart[index].quantity--
}else{

if(confirm("Are you sure you want to remove this item?")){
cart.splice(index,1)
}

}

updateCart()

}

function removeItem(index){

if(confirm("Are you sure you want to delete this item?")){
cart.splice(index,1)
updateCart()
}

}

document.querySelector(".cart").addEventListener("click",()=>{

document.getElementById("cart-modal").style.display="flex"

})

document.querySelector(".close-cart").addEventListener("click",()=>{

document.getElementById("cart-modal").style.display="none"

})


//Sending message via sms

document.querySelector(".checkout-btn").addEventListener("click", () => {
    if(cart.length === 0){
        alert("Your cart is empty! Please add some items first.");
        return;
    }

    let message = "Hello, I would like to order the following items:\n\n";
    cart.forEach(item => {
        message += `${item.name} x ${item.quantity} - GHS ${item.price * item.quantity}\n`;
    });

    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    message += `\nTotal: GHS ${total}\n\nPlease contact me for delivery.`;

    let encodedMessage = encodeURIComponent(message);

    // Replace with your phone number in international format
    let phoneNumber = "233557078148";

    // Open SMS app
    window.open(`sms:${phoneNumber}?body=${encodedMessage}`);
});



