const e=document.querySelector(".cartQty"),t=document.getElementById("catalogoSection");function o(){let t=JSON.parse(localStorage.getItem("cart"));t?e.innerText=t.reduce((e,t)=>e+t.qty,0):e.innerText=0}o();class n{constructor(e,t,o,n){this.id=e,this.nombre=t,this.imagen=o,this.precio=n}}console.log("show products Function"),[{id:"cb1",nombre:"Claus Bag 1",imagen:"/public/products/HK-06_xs.webp",precio:"55000"},{id:"cb2",nombre:"Claus Bag 2",imagen:"/public/products/HK-08_xs.webp",precio:"55000"},{id:"cb3",nombre:"Claus Bag 3",imagen:"/public/products/cb_3_xs.webp",precio:"55000"},{id:"cb4",nombre:"Claus Bag 4",imagen:"/public/products/HK-X8_xs.webp",precio:"55000"},{id:"cb5",nombre:"Claus Bag 5",imagen:"/public/products/HK-32_xs.webp",precio:"55000"},{id:"cb6",nombre:"Claus Bag 6",imagen:"/public/products/CB-LineaVerde_xs.webp",precio:"55000"},{id:"cb7",nombre:"Claus Bag 7",imagen:"/public/products/CB-LineaRoja_xs.webp",precio:"55000"},{id:"cb8",nombre:"Claus Bag 8",imagen:"src/assets/products/HK-19_xs.webp",precio:"55000"}].forEach(e=>{let t=document.createElement("div");t.setAttribute("class","productContainer w-full shadow-xl flex flex-row p-1 sm:p-4 dark:bg-[#1E3D32] bg-white rounded-lg border border-gray-300  md:w-[48%] lg:w-[49%]"),t.innerHTML=`
      <figure class="flex align-top w-52 pb-0 rounded-lg ">
              <img
                src=${e.imagen}
                alt="car!"
                class="h-auto rounded-lg"
              />
            </figure>
            <div class="card-body p-2 px-1 pl-3 leading-3">
              <h5 class="card-title text-[1.7rem] tracking-widest dark:text-red-400">
                ${e.nombre}
              </h5>
              <div class="priceContainer flex flex-col">
                <span
                  class="text-lg font-medium text-gray-300 dark:text-white line-through italic"
                  >$70.000</span
                >
                <span class="text-xl font-bold text-green-500 dark:text-success"
                  >$${e.precio}</span
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
                  data-pid=${e.id}
                  data-name=${e.nombre.replaceAll(" ","_")}
                  data-price=${e.precio}
                  data-img=${e.imagen}
                  class="addToCartBtn btn btn-primary btn-sm rounded-full bg-gradient-to-br hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#50c540] border-none text-white mt-5 xl:text-xl"
                >
                  La Quiero!
                </button>
              </div>
            </div>
    `,document.querySelector(".catalogoProductsContainer").appendChild(t)}),document.querySelectorAll(".addToCartBtn").forEach(e=>{e.addEventListener("click",s)}),document.querySelectorAll(".btn-count").forEach(e=>{e.addEventListener("click",a)});const r={};function a(e){let t=e.target.closest(".productContainer"),o=t.querySelector("[data-pid]").dataset.pid;console.log(o);let n=t.querySelector(".item-count");if(!t){console.error("Product Container Not Found");return}if(!o){console.error("Product ID not found");return}r[o]||(r[o]=1,console.log(r)),"+"==e.target.textContent.trim()?(r[o]++,n.innerText=r[o]):"-"==e.target.textContent.trim()?r[o]>1&&(r[o]--,n.innerText=r[o]):console.log("doesn't should pass for here")}let l=JSON.parse(localStorage.getItem("cart"))?JSON.parse(localStorage.getItem("cart")):[];function s(e){let t=e.target.closest(".productContainer").querySelector(".item-count"),a=e.target.dataset.pid;console.log(a),console.log({cart:l});let s=l.findIndex(e=>e.id==a);if(console.log(s),-1==s){let o=new n(e.target.dataset.pid,e.target.dataset.name,e.target.dataset.img,e.target.dataset.price);o.qty=parseInt(t.textContent),l.push(o)}else l[s].qty+=parseInt(t.textContent);localStorage.setItem("cart",JSON.stringify(l)),o(),console.log(l),r[a]=1,Swal.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:2e3,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}}).fire({icon:"success",text:`A\xf1adiste ${parseInt(t.textContent)} ClausBag al carrito `}),t.innerText=r[a],console.log(r)}function i(){return l.reduce((e,t)=>e+=t.qty,0)}function c(){let e=document.querySelector(".totalCart"),t=l.reduce((e,t)=>e+=parseInt(t.qty)*parseInt(t.precio),0);console.log(t),e.innerHTML=`Total: <span class='bold dark:text-green-400'>$${t}</span>`}function d(){l=JSON.parse(localStorage.getItem("cart"))?JSON.parse(localStorage.getItem("cart")):[],console.log("testing button"),document.querySelector(".modalCartItemsContainer").innerHTML="";let e=document.querySelector(".buyBtnContainer");if(e.innerHTML="",0==l.length){document.querySelector(".purchaseQty").innerHTML=`
    <p>Tu carrito est\xe1 vac\xedo</p>`,document.querySelector(".buyBtnContainer").innerHTML=`
    <p class="mb-2 lg:text-4xl">Pr\xf3ximo paso:</p>
      <a href="#catalogoSection" id="goCataloge" class="btn mt-6 bg-gradient-to-br hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#FF5959] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white rounded-full py-2 px-2 shadow-md tracking-widest text-lg lg:text-md lg:p-2.5 lg:w-max">
    Explora Todos los Modelos
</a>`;let e=document.getElementById("goCataloge");e.removeEventListener("click",g),e.addEventListener("click",()=>{document.getElementById("modalCartContainer").classList.add("hidden")})}else l.sort((e,t)=>{let o=e.nombre.toLowerCase(),n=t.nombre.toLowerCase();return o<n?-1:o>n?1:0}).forEach(e=>{let t=document.createElement("div");t.setAttribute("class","productContainer w-full shadow-xl flex flex-row p-1 sm:p-2 bg-white rounded-lg border border-gray-300 gap-3 lg:w-[41%] dark:bg-[#1E3D32]"),t.innerHTML=`
    <div data-pid=${e.id} class="sm:w-40">
      <figure class="flex align-top w-28 h-28 sm:h-44  pb-0 rounded-lg m-1 sm:w-44">
              <img
                src=${e.imagen}
                alt="car!"
                class="h-auto rounded-lg"
              />
            </figure>
            <button class="deleteProductCart flex align-top w-7 h-7 pb-0 rounded-lg m-1 items-center dark:text-[#D1D6E0]" data-pid=${e.id}>
              <img
                src="src/assets/icons/borrarProducto.webp"
                alt="car!"
                class="h-auto rounded-lg"
              />
        Eliminar
            
            </button>
            
    </div>
            <div class="card-body p-2 px-1 leading-3 sm:ml-8">
              <h5 class="card-title text-[1.2rem] tracking-widest sm:text-xl dark:text-red-400">
                ${e.nombre.split("_").join(" ")}
              </h5>
              <div class="priceContainer flex flex-col">
                <span
                  class="text-sm font-medium text-gray-300 dark:text-white line-through italic"
                  >$70.000</span
                >
                <span class="text-lg font-bold text-green-500 dark:text-success"
                  >$${e.precio*e.qty}</span
                >
              </div>
              <!-- Item count buttons -->
              <div
                class="flex items-center text-center rounded-full btn btn-sm w-min p-0 flex-nowrap place-self-end mr-2 border-none h-auto dark:bg-gradient-to-br hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#FF5959]"
              >
                <button
                  class="btn-cartCount btn btn-md bg-gray-300 text-white px-2 rounded-full flex justify-center transition duration-300 border-none ease-in-out focus:outline-none w-10 text-4xl items-start pl-[0.89rem] dark:bg-gradient-to-br hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#FF5959]" data-pid=${e.id}
                >
                  -
                </button>
                <span
                  class="item-count text-lg font-bold px-2  text-gray-700 dark:text-[#FFFFFF]"
                >
                  ${e.qty}
                </span>
                <button
                  class="btn-cartCount btn btn-md bg-gray-300 text-white  rounded-full flex justify-center transition duration-300 ease-in-out border-none dark:bg-gradient-to-br hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#FF5959] focus:outline-none w-10 text-4xl items-start pl-[1.4rem]"
                >
                  +
                </button>
              </div>

              <!-- Buy button -->
              
            </div>`,document.querySelector(".modalCartItemsContainer").appendChild(t),document.querySelectorAll(".btn-cartCount").forEach(e=>e.addEventListener("click",u)),document.querySelectorAll(".deleteProductCart").forEach(e=>e.addEventListener("click",m)),document.querySelector(".purchaseQty").innerText=`Tienes ${i()} ClausBags en tu Carrito`}),document.querySelector(".buyBtnContainer").innerHTML=`
    <p class="mb-2 lg:text-4xl lg:mb-6 dark:text-red-400">Pr\xf3ximo paso:</p>
      <button id="confirmCartBtn" class="btn btn-wide bg-gradient-to-br hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#FF5959] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white rounded-full py-2 px-5 shadow-md text-lg lg:text-2xl lg:p-1.5">
    Personalizar <span class="pl-3"><img src="src/assets/icons/whatsapp.webp" alt="wtspIcon" width="28px"></span>
</button>`,e.classList.remove("hidden"),document.getElementById("confirmCartBtn").addEventListener("click",g),c(),function(){console.log("calculating disccount");let e=document.getElementById("discountMsg");console.log(i),i()>=3?e.innerHTML=`<p class="text-xl sm:text-xl text-green-400 lg:text-3xl">Llevas 3 o m\xe1s. Te haremos el descuento en Whatsapp</p>`:e.innerHTML=""}();let t=document.getElementById("modalCartContainer");t.classList.remove("hidden"),document.getElementById("closeModalCart").addEventListener("click",()=>t.classList.add("hidden"))}function u(e){let t=e.target.closest(".productContainer"),n=t.querySelector(".item-count"),r=t.querySelector("[data-pid]").dataset.pid;console.log(r);let a=l.findIndex(e=>e.id==r);"+"==e.target.textContent.trim()?(l[a].qty+=1,n.innerText=l[a].qty):"-"==e.target.textContent.trim()?(console.log(l[a].qty),l[a].qty>1?(l[a].qty-=1,n.innerText=l[a].qty,console.log("did enter in qty > 1?")):1==l[a].qty&&(console.log("did enter in qty == 1?"),m(e))):console.log("doesn't should pass for here"),localStorage.setItem("cart",JSON.stringify(l)),i(),d(),o()}function g(){console.log(l);let e=l.sort((e,t)=>{let o=e.nombre.toLowerCase(),n=t.nombre.toLowerCase();return o<n?-1:o>n?1:0}).map(e=>`Modelo: ${e.nombre.replace(/_/g," ")} - Cantidad: ${e.qty}`).join("\n"),t=`Hola, Quisiera Comprar estas ClausBags \u{1F381}: 
${e}`,o=`https://wa.me/573209389966?text=${encodeURIComponent(t)}`;window.open(o,"_blank")}function m(e){let t=e.target.dataset.pid;console.log(t),console.log(l);let n=l.filter(e=>e.id!=t);console.log(n),localStorage.setItem("cart",JSON.stringify(n)),i(),d(),o(),c()}console.log({cart:l}),console.log(!!localStorage.getItem("cart")),document.getElementById("cartList").addEventListener("click",d);const p=document.getElementById("navBar_mobileMenu"),b=document.getElementById("hamburger-btn"),x=document.getElementById("closeModalBtn");function f(){console.log("hiii"),p.style.opacity=0,setTimeout(()=>{p.style.display="none"},500)}window.onclick=function(e){e.target===p&&(p.style.opacity=0,setTimeout(()=>{p.style.display="none"},500))},b.addEventListener("click",function(){p.style.display="block",setTimeout(()=>{p.style.opacity=1},10)}),x.addEventListener("click",f);const y=document.querySelector(".goToCart"),h=document.querySelector(".goToCartFromMobile"),w=document.getElementById("buyNowBtn");function C(){if(console.log("hii"),console.log({cart:l}),0==l.length){t.scrollIntoView({behavior:"smooth"}),f();return}d(),f()}y.addEventListener("click",C),h.addEventListener("click",C),w.addEventListener("click",C);
//# sourceMappingURL=index.3a7fa770.js.map
