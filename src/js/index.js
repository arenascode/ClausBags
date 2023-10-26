// import { Carousel } from "flowbite";

//*To show cartQty in the nav

const cartQtyBadge = document.querySelector(".cartQty");

function showNavBarQty() {
  const cartLS = JSON.parse(localStorage.getItem("cart"));
  if (cartLS) {
    cartQtyBadge.innerText = cartLS.reduce(
      (count, item) => count + item.qty,
      0
    );
  } else {
    cartQtyBadge.innerText = 0;
  }
}
showNavBarQty();

//*Construct the Product to show in the cart.

class Producto {
  constructor(id, nombre, imagen, precio) {
    (this.id = id),
      (this.nombre = nombre),
      (this.imagen = imagen),
      (this.precio = precio);
  }
}

//*Create  and show the stock
let stock = [];
const urlProducts = "src/db/products.json";

fetch(urlProducts)
  .then((res) => res.json())
  .then((data) => {
    stock = data;
    console.log(stock);
    showProducts();
    const addToCartBtns = document.querySelectorAll(".addToCartBtn");
    addToCartBtns.forEach((addToCartBtn) => {
      addToCartBtn.addEventListener("click", addToCart);
    });

    const btnsItemCount = document.querySelectorAll(".btn-count");

    btnsItemCount.forEach((e) => {
      e.addEventListener("click", handleItemCount);
    });
  });

function showProducts() {
  stock.forEach((product) => {
    let productCard = document.createElement("div");
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

    document
      .querySelector(".catalogoProductsContainer")
      .appendChild(productCard);
  });
}

//** Item Count */
const productCounts = {};
// let itemCount = 1;

export function handleItemCount(e) {
  const targetContainer = e.target.closest(".productContainer");
  const pid = targetContainer.querySelector("[data-pid]").dataset.pid;
  console.log(pid);
  const itemCountHTML = targetContainer.querySelector(".item-count");

  if (!targetContainer) {
    console.error(`Product Container Not Found`);
    return;
  }
  if (!pid) {
    console.error("Product ID not found");
    return;
  }
  //* Initialize count if not exists
  if (!productCounts[pid]) {
    productCounts[pid] = 1;
    console.log(productCounts);
  }

  if (e.target.textContent.trim() == "+") {
    productCounts[pid]++;
    itemCountHTML.innerText = productCounts[pid];
  } else if (e.target.textContent.trim() == "-") {
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
let cart = [];
if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
}
console.log(cart);
export function addToCart(e) {
  const targetContainer = e.target.closest(".productContainer");
  const itemCountHTML = targetContainer.querySelector(".item-count");
  const pid = e.target.dataset.pid;
  console.log(pid);

  const productInCartExist = cart.findIndex((product) => product.id == pid);

  console.log(productInCartExist);
  if (productInCartExist == -1) {
    let chosenProduct = new Producto(
      e.target.dataset.pid,
      e.target.dataset.name,
      e.target.dataset.img,
      e.target.dataset.price
    );
    chosenProduct.qty = parseInt(itemCountHTML.textContent);
    cart.push(chosenProduct);
  } else {
    cart[productInCartExist].qty += parseInt(itemCountHTML.textContent);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  showNavBarQty();
  console.log(cart);
  // console.log(itemCount);
  const phoneNumber = 573209389966;

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
//**Calculate Products Quantity */
function cartQty() {
  return cart.reduce((total, item) => total += item.qty, 0)
}
//**Show Cart */
const cartListBtn = document.getElementById("cartList");
function showCart() {
  cart = JSON.parse(localStorage.getItem("cart"));
  console.log(`testing button`);
  document.querySelector(".modalCartItemsContainer").innerHTML = ``;
  cart.forEach((cartItem) => {
    const cardProduct = document.createElement("div");
    cardProduct.setAttribute(
      "class",
      "productContainer bg-base-100 w-full shadow-xl flex flex-row border-x m-1 rounded-lg"
    );
    cardProduct.innerHTML = `
    <div data-pid=${cartItem.id}>
      <figure class="flex align-top w-28 h-28  pb-0 rounded-lg m-1">
              <img
                src=${cartItem.imagen}
                alt="car!"
                class="h-auto rounded-lg"
              />
            </figure>
            <button class="deleteProductCart flex align-top w-7 h-7 pb-0 rounded-lg m-1 items-center" data-pid=${
              cartItem.id
            }>
              <img
                src="src/assets/icons/borrarProducto.png"
                alt="car!"
                class="h-auto rounded-lg"
              />
        Eliminar
            
            </button>
            
    </div>
            <div class="card-body p-2 px-1 leading-3">
              <h5 class="card-title text-[1.2rem] tracking-widest">
                ${cartItem.nombre.split("_").join(" ")}
              </h5>
              <div class="priceContainer flex flex-col">
                <span
                  class="text-sm font-medium text-gray-300 dark:text-white line-through"
                  >$70.000</span
                >
                <span class="text-lg font-bold text-green-500 dark:text-white"
                  >$${cartItem.precio}</span
                >
              </div>
              <!-- Item count buttons -->
              <div
                class="flex items-center text-center rounded-full btn btn-sm w-min p-0 flex-nowrap place-self-end mr-2 border-none h-auto"
              >
                <button
                  class="btn-cartCount btn btn-md bg-gray-300 text-white  px-2 rounded-full flex justify-center transition duration-300 ease-in-out hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#FF5959] focus:outline-none w-10 text-4xl items-start pl-[0.89rem]"
                >
                  -
                </button>
                <span
                  class="item-count text-lg font-bold px-2 border-t border-b text-gray-700"
                >
                  ${cartItem.qty}
                </span>
                <button
                  class="btn-cartCount btn btn-md bg-gray-300 text-white  rounded-full flex justify-center transition duration-300 ease-in-out hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#FF5959] focus:outline-none w-10 text-4xl items-start pl-[1.4rem]"
                >
                  +
                </button>
              </div>

              <!-- Buy button -->
              
            </div>`;
    document.querySelector(".modalCartItemsContainer").appendChild(cardProduct);
    const cartCountBtns = document.querySelectorAll('.btn-cartCount')
    // console.log(cartCountBtns);
    cartCountBtns.forEach(btn => btn.addEventListener('click', handleItemCartCount))
    //**To delete each product in cart */
    const deleteProductBtns = document.querySelectorAll(
      ".deleteProductCart"
    );
      deleteProductBtns.forEach(btn => btn.addEventListener('click', deleteProductInCart))
  });

  document.querySelector(".purchaseQty").innerText = `Tienes ${cartQty()} ClausBags en tu Carrito`;

  //*To show Modal Cart
  const modalCartContainer = document.getElementById('modalCartContainer')
  modalCartContainer.classList.remove('hidden')
  // modalCartContainer.classList.add('absolute')

  //*To Close Modal Cart
  const closeModalCartBtn = document.getElementById('closeModalCart')
  closeModalCartBtn.addEventListener('click', () => modalCartContainer.classList.add('hidden'))
}
//**Add or Less products in cart */
function handleItemCartCount(e) {
  const targetContainer = e.target.closest(".productContainer");
  const itemCountHTML = targetContainer.querySelector(".item-count");
  const pid = targetContainer.querySelector('[data-pid]').dataset.pid;
  console.log(pid);
  let productIndex = cart.findIndex((product) => product.id == pid);

  if (e.target.textContent.trim() == "+") {
    cart[productIndex].qty += 1;
    itemCountHTML.innerText = cart[productIndex].qty;
  } else if (e.target.textContent.trim() == "-") {
    if (cart[productIndex].qty > 1) {
      cart[productIndex].qty-= 1;
      itemCountHTML.innerText = cart[productIndex].qty;
    }
  } else {
    console.log(`doesn't should pass for here`);
  }
  localStorage.setItem('cart', JSON.stringify(cart))
  cartQty()
  showCart()
  showNavBarQty()
}

//*Delete Product in cart */
function deleteProductInCart(e) {
  const pid = e.target.dataset.pid
  console.log(pid);
  console.log(cart);
  const newCart = cart.filter(p => p.id != pid)
  console.log(newCart);
  localStorage.setItem('cart', JSON.stringify(newCart))
  cartQty()
  showCart()
  showNavBarQty()
}

cartListBtn.addEventListener("click", showCart);
