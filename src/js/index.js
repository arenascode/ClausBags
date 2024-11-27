//*To show cartQty in the nav

const cartQtyBadge = document.querySelector(".cartQty");
const catalogoSection = document.getElementById("catalogoSection");

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
  constructor(id, nombre, imagen, precio, precio_viejo) {
    (this.id = id),
      (this.nombre = nombre),
      (this.imagen = imagen),
      (this.precio = precio);
    this.precio_viejo = precio_viejo;
  }
}

//*Create  and show the stock
let stock = [
  {
    id: "cb1",
    nombre: "Claus Bag 1",
    imagen: "public/products/cbRed_xs.webp",
    precio: "55000",
    precio_viejo: "70,000",
  },
  {
    id: "cb2",
    nombre: "Claus Bag 2",
    imagen: "public/products/cbGreen_xs.webp",
    precio: "55000",
    precio_viejo: "70,000",
  },
  {
    id: "cb3",
    nombre: "Claus Bag 3",
    imagen: "public/products/cb_3_xs.webp",
    precio: "50000",
    precio_viejo: "65,000",
  },
  {
    id: "cb4",
    nombre: "Claus Bag 4",
    imagen: "public/products/HK-X8_xs.webp",
    precio: "50000",
    precio_viejo: "65,000",
  },
  {
    id: "cb5",
    nombre: "Claus Bag 5",
    imagen: "public/products/HK-32_xs.webp",
    precio: "60000",
    precio_viejo: "75,000",
  },
  {
    id: "cb6",
    nombre: "Claus Bag 6",
    imagen: "public/products/CB-LineaVerde_xs.webp",
    precio: "60000",
    precio_viejo: "75,000",
  },
  {
    id: "cb7",
    nombre: "Claus Bag 7",
    imagen: "public/products/CB-LineaRoja_xs.webp",
    precio: "60000",
    precio_viejo: "75,000",
  },
  {
    id: "cb8",
    nombre: "Claus Bag 8",
    imagen: "public/products/HK-19_xs.webp",
    precio: "50000",
    precio_viejo: "65,000",
  },
];

function showProducts() {
  console.log(`showing products`);

  stock.forEach((product) => {
    let productCard = document.createElement("div");
    const formattedPrice = `$${product.precio
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    productCard.setAttribute(
      "class",
      "productContainer w-full shadow-xl flex flex-row p-1 sm:p-4 dark:bg-[#1E3D32] bg-white rounded-lg border border-gray-300  md:w-[48%] lg:w-[49%]"
    );
    productCard.innerHTML = `
      <figure class="flex align-top w-52 pb-0 rounded-lg ">
              <img
                src=${product.imagen}
                alt="car!"
                class="h-auto rounded-lg"
              />
            </figure>
            <div class="card-body p-2 px-1 pl-3 leading-3">
              <h5 class="card-title text-[1.7rem] tracking-widest dark:text-red-400">
                ${product.nombre}
              </h5>
              <div class="priceContainer flex flex-col">
                <span
                  class="text-lg font-medium text-gray-300 dark:text-white line-through italic"
                  >$${product.precio_viejo}</span
                >
                <span class="text-xl font-bold text-green-500 dark:text-success"
                  >${formattedPrice}</span
                >
              </div>
              <!-- Item count buttons -->
              <div
                class="flex mt-5 items-center text-center rounded-full btn btn-sm w-min p-0 flex-nowrap place-self-end mr-8 border-none h-auto dark:bg-gradient-to-br hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#FF5959] "
              >
                <button
                  class="btn-count bg-gray-300 text-white py-2 px-2 text-xl rounded-l-full flex justify-center items-center transition duration-300 ease-in-out bg-gradient-to-br hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#FF5959] focus:outline-none"
                >
                  -
                </button>
                <span
                  class="item-count text-lg font-bold px-2 text-gray-700 dark:text-white"
                >
                  1
                </span>
                <button
                  class="btn-count bg-gray-300 text-white py-2 px-2 text-xl rounded-r-full flex justify-center items-center transition duration-300 ease-in-out bg-gradient-to-br hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#FF5959] focus:outline-none"
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
                  class="addToCartBtn btn btn-primary btn-sm rounded-full bg-gradient-to-br hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#50c540] border-none text-white mt-5 xl:text-xl"
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

  const addToCartBtns = document.querySelectorAll(".addToCartBtn");
  addToCartBtns.forEach((addToCartBtn) => {
    addToCartBtn.addEventListener("click", addToCart);
  });

  const btnsItemCount = document.querySelectorAll(".btn-count");

  btnsItemCount.forEach((e) => {
    e.addEventListener("click", handleItemCount);
  });
}

// showProducts()
//** Item Count */
const productCounts = {};
// let itemCount = 1;

export function handleItemCount(e) {
  const targetContainer = e.target.closest(".productContainer");
  const pid = targetContainer.querySelector("[data-pid]").dataset.pid;
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

//**Add To Cart */
let cart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

export function addToCart(e) {
  const targetContainer = e.target.closest(".productContainer");
  const itemCountHTML = targetContainer.querySelector(".item-count");
  const pid = e.target.dataset.pid;

  const productInCartExist = cart.findIndex((product) => product.id == pid);

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

  productCounts[pid] = 1;
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    text: `Añadiste ${parseInt(
      itemCountHTML.textContent
    )} ClausBag al carrito `,
  });
  itemCountHTML.innerText = productCounts[pid];
  fbq("track", "AddToCart", { model: pid, qty: productCounts[pid] });
}

//**Calculate Products Quantity */
function cartQty() {
  return cart.reduce((total, item) => (total += item.qty), 0);
}

//**Calculate Total Cart */
function totalCart() {
  const totalCartContainer = document.querySelector(".totalCart");
  
  const totalCart = cart.reduce((total, item) => {
    console.log({precio: item.precio});
    
    total += parseInt(item.qty) * parseInt(item.precio);
    console.log({ total });
    
    return total;
  }, 0);
  const formatedTotalCart = `${totalCart
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  console.log(totalCart);
  totalCartContainer.innerHTML = `Total: <span class='bold dark:text-green-400'>$${formatedTotalCart}</span>`;
  return totalCart;
}

//**Show Cart */
const cartListBtn = document.getElementById("cartList");

function showCart() {
  cart = JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  document.querySelector(".modalCartItemsContainer").innerHTML = ``;
  const containerBtn = document.querySelector(".buyBtnContainer");
  containerBtn.innerHTML = ``;
  if (cart.length == 0) {
    document.querySelector(".purchaseQty").innerHTML = `
    <p>Tu carrito está vacío</p>`;
    // wtspBtn.classList.add("hidden");
    const buyBtnContainer = document.querySelector(".buyBtnContainer");
    buyBtnContainer.innerHTML = `
    <p class="mb-2 lg:text-4xl">Próximo paso:</p>
      <a href="#catalogoSection" id="goCataloge" class="btn mt-6 bg-gradient-to-br hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#FF5959] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white rounded-full py-2 px-2 shadow-md tracking-widest text-lg lg:text-md lg:p-2.5 lg:w-max">
    Explora Todos los Modelos
</a>`;
    const goToCatalogeBtn = document.getElementById("goCataloge");

    goToCatalogeBtn.removeEventListener("click", sendOrderToWtsp);
    goToCatalogeBtn.addEventListener("click", () => {
      const modalCartContainer = document.getElementById("modalCartContainer");
      modalCartContainer.classList.add("hidden");
    });
  } else {
    const orderedCart = cart.sort((a, b) => {
      const itemA = a.nombre.toLowerCase();
      const itemB = b.nombre.toLowerCase();

      if (itemA < itemB) return -1;
      if (itemA > itemB) return 1;
      return 0;
    });
    orderedCart.forEach((cartItem) => {
      const cardProduct = document.createElement("div");
      const formattedTotalItem = `${
        (cartItem.precio *
        cartItem.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }`;
      cardProduct.setAttribute(
        "class",
        "productContainer w-full shadow-xl flex flex-row p-1 sm:p-2 bg-white rounded-lg border border-gray-300 gap-3 lg:w-[41%] dark:bg-[#1E3D32]"
      );
      
      cardProduct.innerHTML = `
    <div data-pid=${cartItem.id} class="sm:w-40">
      <figure class="flex align-top w-28 h-28 sm:h-44  pb-0 rounded-lg m-1 sm:w-44">
              <img
                src=${cartItem.imagen}
                alt="car!"
                class="h-auto rounded-lg"
              />
            </figure>
            <button class="deleteProductCart flex align-top w-7 h-7 pb-0 rounded-lg m-1 items-center dark:text-[#D1D6E0]" data-pid=${
              cartItem.id
            }>
              <img
                src="/icons/borrarProducto.webp"
                alt="car!"
                class="h-auto rounded-lg"
              />
        Eliminar
            
            </button>
            
    </div>
            <div class="card-body p-2 px-1 leading-3 sm:ml-8">
              <h5 class="card-title text-[1.2rem] tracking-widest sm:text-xl dark:text-red-400">
                ${cartItem.nombre.split("_").join(" ")}
              </h5>
              <div class="priceContainer flex flex-col">
                
                <span class="text-lg font-bold text-green-500 dark:text-success"
                  >$${formattedTotalItem}</span
                >
              </div>
              <!-- Item count buttons -->
              <div
                class="flex items-center text-center rounded-full btn btn-sm w-min p-0 flex-nowrap place-self-end mr-2 border-none h-auto dark:bg-gradient-to-br hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#FF5959]"
              >
                <button
                  class="btn-cartCount btn btn-md bg-gray-300 text-white px-2 rounded-full flex justify-center transition duration-300 border-none ease-in-out focus:outline-none w-10 text-4xl items-start pl-[0.89rem] dark:bg-gradient-to-br hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#FF5959]" data-pid=${
                    cartItem.id
                  }
                >
                  -
                </button>
                <span
                  class="item-count text-lg font-bold px-2  text-gray-700 dark:text-[#FFFFFF]"
                >
                  ${cartItem.qty}
                </span>
                <button
                  class="btn-cartCount btn btn-md bg-gray-300 text-white  rounded-full flex justify-center transition duration-300 ease-in-out border-none dark:bg-gradient-to-br hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#FF5959] focus:outline-none w-10 text-4xl items-start pl-[1.4rem]"
                >
                  +
                </button>
              </div>

              <!-- Buy button -->
              
            </div>`;
      document
        .querySelector(".modalCartItemsContainer")
        .appendChild(cardProduct);
      const cartCountBtns = document.querySelectorAll(".btn-cartCount");
      cartCountBtns.forEach((btn) =>
        btn.addEventListener("click", handleItemCartCount)
      );
      //**To delete each product in cart */
      const deleteProductBtns = document.querySelectorAll(".deleteProductCart");
      deleteProductBtns.forEach((btn) =>
        btn.addEventListener("click", deleteProductInCart)
      );
      //*Cart Qty */
      document.querySelector(
        ".purchaseQty"
      ).innerText = `Tienes ${cartQty()} ClausBags en tu Carrito`;
    });
    document.querySelector(".buyBtnContainer").innerHTML = `
    <p class="mb-2 lg:text-4xl lg:mb-6 dark:text-red-400">Próximo paso:</p>
      <button id="confirmCartBtn" class="btn btn-wide bg-gradient-to-br hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#FF5959] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white rounded-full py-2 px-5 shadow-md text-lg lg:text-2xl lg:p-1.5">
    Personalizar <span class="pl-2"><img src="/icons/whatsapp.webp" alt="wtspIcon" width="28px"></span>
</button>`;

    containerBtn.classList.remove("hidden");
    document
      .getElementById("confirmCartBtn")
      .addEventListener("click", sendOrderToWtsp);
    totalCart();
    calcualteDiscount();
  }

  //*To show Modal Cart
  const modalCartContainer = document.getElementById("modalCartContainer");
  modalCartContainer.classList.remove("hidden");

  //*To Close Modal Cart
  const closeModalCartBtn = document.getElementById("closeModalCart");
  closeModalCartBtn.addEventListener("click", () =>
    modalCartContainer.classList.add("hidden")
  );
}

cartListBtn.addEventListener("click", showCart);

//**Add or Less products in cart */
function handleItemCartCount(e) {
  const targetContainer = e.target.closest(".productContainer");
  const itemCountHTML = targetContainer.querySelector(".item-count");
  const pid = targetContainer.querySelector("[data-pid]").dataset.pid;
  let productIndex = cart.findIndex((product) => product.id == pid);

  if (e.target.textContent.trim() == "+") {
    cart[productIndex].qty += 1;
    itemCountHTML.innerText = cart[productIndex].qty;
  } else if (e.target.textContent.trim() == "-") {
    if (cart[productIndex].qty > 1) {
      cart[productIndex].qty -= 1;
      itemCountHTML.innerText = cart[productIndex].qty;
    } else if (cart[productIndex].qty == 1) {
      deleteProductInCart(e);
    }
  } else {
    console.log(`doesn't should pass for here`);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  cartQty();
  showCart();
  showNavBarQty();
}

//**Send Order To Wtsp */
function sendOrderToWtsp() {
  const phoneNumber = 573202806790;
  const orderedCart = cart
    .sort((a, b) => {
      const itemA = a.nombre.toLowerCase();
      const itemB = b.nombre.toLowerCase();

      if (itemA < itemB) return -1;
      if (itemA > itemB) return 1;
      return 0;
    })
    .map(
      (p) =>
        `Modelo: *${p.nombre.replace(/_/g, " ")}.* Precio: *${
          p.precio
        }* x Cantidad: *${p.qty}* = *${p.precio * p.qty}*`
    )
    .join("\n");
  const message = `Hola, Quisiera Comprar estas ClausBags 🎁: 
${orderedCart}
*Total Pedido = ${totalCart()}*`;
  // Construct the WhatsApp link.
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  const totalAmount = totalCart();
  const cartQuantity = cartQty();
  fbq("track", "Purchase", { amount: totalAmount, cartQty: cartQuantity });
  // Open WhatsApp link in a new tab.
  window.open(whatsappLink, "_blank");
}
//*Delete Product in cart */
function deleteProductInCart(e) {
  const pid = e.target.dataset.pid;
  const newCart = cart.filter((p) => p.id != pid);
  localStorage.setItem("cart", JSON.stringify(newCart));
  cartQty();
  showCart();
  showNavBarQty();
  totalCart();
}

//*Show and hidde MobileMenu Modal */
const mobileMenu = document.getElementById("navBar_mobileMenu");

const hamburguerBtn = document.getElementById("hamburger-btn");

const closeModalBtn = document.getElementById("closeModalBtn");

function openModalMenu() {
  mobileMenu.style.display = "block";
  setTimeout(() => {
    mobileMenu.style.opacity = 1;
  }, 10);
}

function closeModalMenu() {
  mobileMenu.style.opacity = 0;
  setTimeout(() => {
    mobileMenu.style.display = "none";
  }, 500);
}

window.onclick = function (e) {
  if (e.target === mobileMenu) {
    mobileMenu.style.opacity = 0;
    setTimeout(() => {
      mobileMenu.style.display = "none";
    }, 500);
  }
};

hamburguerBtn.addEventListener("click", openModalMenu);

closeModalBtn.addEventListener("click", closeModalMenu);

//**To Open Cart From MobileMenu & PromoSection */

const goToCartBtn = document.querySelector(".goToCart");
const goToCartBtnMobile = document.querySelector(".goToCartFromMobile");
const buyNowBtn = document.getElementById("buyNowBtn");

function showCartFromMobileMenu() {
  if (cart.length == 0) {
    catalogoSection.scrollIntoView({ behavior: "smooth" });
    closeModalMenu();
    return;
  } else {
    showCart();
    closeModalMenu();
  }
}

goToCartBtn.addEventListener("click", showCartFromMobileMenu);
goToCartBtnMobile.addEventListener("click", showCartFromMobileMenu);
buyNowBtn.addEventListener("click", showCartFromMobileMenu);

//**To Calculate and show discount */

function calcualteDiscount() {
  const disccountMsgContainer = document.getElementById("discountMsg");
  if (cartQty() >= 3) {
    disccountMsgContainer.innerHTML = `<p class="text-2xl sm:text-2xl text-green-400 lg:text-3xl">Llevas 3 o más. Tú envío es gratis!</p>`;
  } else {
    disccountMsgContainer.innerHTML = ``;
  }
}

//* Show Wtsp Icon *//
const handleWtspIcon = () => {
  const scrollPosition = window.scrollY;
  const wtspBtnContainer = document.querySelector(".wtspIconContainer");

  if (scrollPosition >= 1000) {
    wtspBtnContainer.classList.add("show");
  } else {
    wtspBtnContainer.classList.remove("show");
  }
};

window.addEventListener("scroll", handleWtspIcon);

// Configurar el IntersectionObserver
const observerOptions = {
  root: null, // viewport
  rootMargin: "0px",
  threshold: 0.05, // ejecuta cuando el 10% de la sección es visible
};

const catalogoObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      showProducts();
      observer.unobserve(entry.target); // Detener observación después de renderizar
    }
  });
}, observerOptions);

catalogoObserver.observe(catalogoSection);
