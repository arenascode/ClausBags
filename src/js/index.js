// import { Carousel } from "flowbite";

//*To show cartQty in the nav 

const cartQtyBadge = document.querySelector('.cartQty')


function showNavBarQty() {
  const cartLS = JSON.parse(localStorage.getItem('cart'))
  if (cartLS) {
  cartQtyBadge.innerText = cartLS.reduce((count, item) =>
  count + item.qty 
, 0)
} else {
  cartQtyBadge.innerText = 0
}
}
showNavBarQty()



//*Construct the Product to show in the cart.

class Producto {
  constructor(id, nombre, imagen, precio) {
    this.id = id,
    this.nombre = nombre,
    this.imagen = imagen,
    this.precio = precio
  }
}

//*Create  and show the stock
let stock = []
const urlProducts = 'src/db/products.json'

fetch(urlProducts)
  .then(res => res.json())
  .then(data => {
    stock = data
    console.log(stock);
    showProducts()
    const addToCartBtns = document.querySelectorAll(".addToCartBtn");
    addToCartBtns.forEach((addToCartBtn) => {
      addToCartBtn.addEventListener("click", addToCart);
    });

    const btnsItemCount = document.querySelectorAll(".btn-count");

    btnsItemCount.forEach((e) => {
      e.addEventListener("click", handleItemCount);
    }); 

  })

function showProducts() {
    
  stock.forEach(product => {
    let productCard = document.createElement('div')
    productCard.setAttribute(
      "class",
      "productContainer bg-base-100 w-full shadow-xl flex flex-row"
    );
    productCard.innerHTML = `
      <figure class="flex align-top w-52 pb-0 rounded-lg">
              <img
                src=${product.imagen}
                alt="car!"
                class="h-auto rounded-lg"
              />
            </figure>
            <div class="card-body p-2 px-1 leading-3">
              <h5 class="card-title text-[1.7rem] tracking-widest">
                ${product.nombre}
              </h5>
              <div class="priceContainer flex flex-col">
                <span
                  class="text-lg font-medium text-gray-300 dark:text-white line-through"
                  >$70.000</span
                >
                <span class="text-xl font-bold text-green-500 dark:text-white"
                  >$${product.precio}</span
                >
              </div>
              <!-- Item count buttons -->
              <div
                class="flex mt-5 items-center text-center rounded-full btn btn-sm w-min p-0 flex-nowrap place-self-end mr-8 border-none h-auto"
              >
                <button
                  class="btn-count bg-gray-300 text-white py-2 px-2 rounded-l-full border flex justify-center items-center transition duration-300 ease-in-out bg-gradient-to-br hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#FF5959] focus:outline-none"
                >
                  -
                </button>
                <span
                  class="item-count text-lg font-bold px-2 border-t border-b text-gray-700"
                >
                  1
                </span>
                <button
                  class="btn-count bg-gray-300 text-white py-2 px-2 rounded-r-full border flex justify-center items-center transition duration-300 ease-in-out bg-gradient-to-br hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#FF5959] focus:outline-none"
                >
                  +
                </button>
              </div>

              <!-- Buy button -->
              <div class="card-actions justify-end pt-2 pr-3">
                <button
                  id="btnWtspProduct"
                  data-pid=${product.id}
                  data-name=${product.nombre.replaceAll(" ", "_")}
                  data-price=${product.precio}
                  data-img=${product.imagen}
                  class="addToCartBtn btn btn-primary btn-sm rounded-full bg-gradient-to-br hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#FF5959] border-none text-white mt-5"
                >
                  La Quiero!
                </button>
              </div>
            </div>
    `;

    document.querySelector('.catalogoProductsContainer').appendChild(productCard)
  })
  }



//** Item Count */
const productCounts = {}
// let itemCount = 1;
export function handleItemCount(e) {
  
  const targetContainer = e.target.closest('.productContainer')
  const pid = targetContainer.querySelector('[data-pid]').dataset.pid
  console.log(pid);
  const itemCountHTML = targetContainer.querySelector('.item-count')
  
  if (!targetContainer) {
    console.error(`Product Container Not Found`)
    return 
  }
  if (!pid) {
    console.error("Product ID not found");
    return;
  }
  //* Initialize count if not exists
  if (!productCounts[pid]) {
    productCounts[pid] = 1
    console.log(productCounts);
  }
  
  if (e.target.textContent.trim() == '+') {
    productCounts[pid]++;
    itemCountHTML.innerText = productCounts[pid];
  } else if (e.target.textContent.trim() == '-') {
    if (productCounts[pid] > 1) {
      productCounts[pid]--;
      itemCountHTML.innerText = productCounts[pid];
    }
  } else {
    console.log(`doesn't should pass for here`);
  }
}
//**TO-DO Make the logic to catch only itemCount of each product and not the others */ DID IT!

//**Add To Cart */
const cart = []

if (localStorage.getItem('cart')) {
  cart = JSON.parse(localStorage.getItem('cart'))
}
export function addToCart(e) {
  const targetContainer = e.target.closest(".productContainer");
  const itemCountHTML = targetContainer.querySelector(".item-count");
  const pid = e.target.dataset.pid;
  console.log(pid);
  
  const productInCartExist = cart.findIndex(product => product.id == pid)

  console.log(productInCartExist);
  if (productInCartExist == -1) {
    let chosenProduct = new Producto(e.target.dataset.pid, e.target.dataset.name, e.target.dataset.img, e.target.dataset.price)
    chosenProduct.qty = parseInt(itemCountHTML.textContent)
    cart.push(chosenProduct)
  } else {
    cart[productInCartExist].qty += parseInt(itemCountHTML.textContent);
  }
  localStorage.setItem('cart', JSON.stringify(cart))
  showNavBarQty()
    console.log(cart);
  // console.log(itemCount);
  const phoneNumber = 573209389966
  
  // const message = `Hola! Quisiera comprar ${itemCount} unidades de la ClausBag ${e.target.dataset.pid} por favor.`
  // console.log(message);
  
  // const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    //   message
    // )}`;
    
    // window.open(whatsappLink, '_blank')
  productCounts[pid] = 1;
  itemCountHTML.innerText = productCounts[pid];
  console.log(productCounts);
  }



