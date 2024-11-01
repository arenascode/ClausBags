const t=document.querySelector(".cartQty"),e=document.getElementById("catalogoSection");function o(){let e=JSON.parse(localStorage.getItem("cart"));e?t.innerText=e.reduce((t,e)=>t+e.qty,0):t.innerText=0}o();class n{constructor(t,e,o,n){this.id=t,this.nombre=e,this.imagen=o,this.precio=n}}let r=[];fetch("src/db/products.json").then(t=>t.json()).then(t=>{t.forEach(t=>{let e=document.createElement("div");e.setAttribute("class","productContainer w-full shadow-xl flex flex-row p-1 sm:p-4 dark:bg-[#1E3D32] bg-white rounded-lg border border-gray-300  md:w-[48%] lg:w-[49%]"),e.innerHTML=`
      <figure class="flex align-top w-52 pb-0 rounded-lg ">
              <img
                src=${t.imagen}
                alt="car!"
                class="h-auto rounded-lg"
              />
            </figure>
            <div class="card-body p-2 px-1 pl-3 leading-3">
              <h5 class="card-title text-[1.7rem] tracking-widest dark:text-red-400">
                ${t.nombre}
              </h5>
              <div class="priceContainer flex flex-col">
                <span
                  class="text-lg font-medium text-gray-300 dark:text-white line-through italic"
                  >$70.000</span
                >
                <span class="text-xl font-bold text-green-500 dark:text-success"
                  >$${t.precio}</span
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
                  data-pid=${t.id}
                  data-name=${t.nombre.replaceAll(" ","_")}
                  data-price=${t.precio}
                  data-img=${t.imagen}
                  class="addToCartBtn btn btn-primary btn-sm rounded-full bg-gradient-to-br hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#50c540] border-none text-white mt-5 xl:text-xl"
                >
                  La Quiero!
                </button>
              </div>
            </div>
    `,document.querySelector(".catalogoProductsContainer").appendChild(e)}),document.querySelectorAll(".addToCartBtn").forEach(t=>{t.addEventListener("click",i)}),document.querySelectorAll(".btn-count").forEach(t=>{t.addEventListener("click",l)})});const a={};function l(t){let e=t.target.closest(".productContainer"),o=e.querySelector("[data-pid]").dataset.pid;console.log(o);let n=e.querySelector(".item-count");if(!e){console.error("Product Container Not Found");return}if(!o){console.error("Product ID not found");return}a[o]||(a[o]=1,console.log(a)),"+"==t.target.textContent.trim()?(a[o]++,n.innerText=a[o]):"-"==t.target.textContent.trim()?a[o]>1&&(a[o]--,n.innerText=a[o]):console.log("doesn't should pass for here")}let s=JSON.parse(localStorage.getItem("cart"))?JSON.parse(localStorage.getItem("cart")):[];function i(t){let e=t.target.closest(".productContainer").querySelector(".item-count"),r=t.target.dataset.pid;console.log(r),console.log({cart:s});let l=s.findIndex(t=>t.id==r);if(console.log(l),-1==l){let o=new n(t.target.dataset.pid,t.target.dataset.name,t.target.dataset.img,t.target.dataset.price);o.qty=parseInt(e.textContent),s.push(o)}else s[l].qty+=parseInt(e.textContent);localStorage.setItem("cart",JSON.stringify(s)),o(),console.log(s),a[r]=1,Swal.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:2e3,timerProgressBar:!0,didOpen:t=>{t.addEventListener("mouseenter",Swal.stopTimer),t.addEventListener("mouseleave",Swal.resumeTimer)}}).fire({icon:"success",text:`A\xf1adiste ${parseInt(e.textContent)} ClausBag al carrito `}),e.innerText=a[r],console.log(a)}function c(){return s.reduce((t,e)=>t+=e.qty,0)}function d(){let t=document.querySelector(".totalCart"),e=s.reduce((t,e)=>t+=parseInt(e.qty)*parseInt(e.precio),0);console.log(e),t.innerHTML=`Total: <span class='bold dark:text-green-400'>$${e}</span>`}function u(){s=JSON.parse(localStorage.getItem("cart"))?JSON.parse(localStorage.getItem("cart")):[],console.log("testing button"),document.querySelector(".modalCartItemsContainer").innerHTML="";let t=document.querySelector(".buyBtnContainer");if(t.innerHTML="",0==s.length){document.querySelector(".purchaseQty").innerHTML=`
    <p>Tu carrito est\xe1 vac\xedo</p>`,document.querySelector(".buyBtnContainer").innerHTML=`
    <p class="mb-2 lg:text-4xl">Pr\xf3ximo paso:</p>
      <a href="#catalogoSection" id="goCataloge" class="btn mt-6 bg-gradient-to-br hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#FF5959] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white rounded-full py-2 px-2 shadow-md tracking-widest text-lg lg:text-md lg:p-2.5 lg:w-max">
    Explora Todos los Modelos
</a>`;let t=document.getElementById("goCataloge");t.removeEventListener("click",m),t.addEventListener("click",()=>{document.getElementById("modalCartContainer").classList.add("hidden")})}else s.sort((t,e)=>{let o=t.nombre.toLowerCase(),n=e.nombre.toLowerCase();return o<n?-1:o>n?1:0}).forEach(t=>{let e=document.createElement("div");e.setAttribute("class","productContainer w-full shadow-xl flex flex-row p-1 sm:p-2 bg-white rounded-lg border border-gray-300 gap-3 lg:w-[41%] dark:bg-[#1E3D32]"),e.innerHTML=`
    <div data-pid=${t.id} class="sm:w-40">
      <figure class="flex align-top w-28 h-28 sm:h-44  pb-0 rounded-lg m-1 sm:w-44">
              <img
                src=${t.imagen}
                alt="car!"
                class="h-auto rounded-lg"
              />
            </figure>
            <button class="deleteProductCart flex align-top w-7 h-7 pb-0 rounded-lg m-1 items-center dark:text-[#D1D6E0]" data-pid=${t.id}>
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
                ${t.nombre.split("_").join(" ")}
              </h5>
              <div class="priceContainer flex flex-col">
                <span
                  class="text-sm font-medium text-gray-300 dark:text-white line-through italic"
                  >$70.000</span
                >
                <span class="text-lg font-bold text-green-500 dark:text-success"
                  >$${t.precio*t.qty}</span
                >
              </div>
              <!-- Item count buttons -->
              <div
                class="flex items-center text-center rounded-full btn btn-sm w-min p-0 flex-nowrap place-self-end mr-2 border-none h-auto dark:bg-gradient-to-br hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#FF5959]"
              >
                <button
                  class="btn-cartCount btn btn-md bg-gray-300 text-white px-2 rounded-full flex justify-center transition duration-300 border-none ease-in-out focus:outline-none w-10 text-4xl items-start pl-[0.89rem] dark:bg-gradient-to-br hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#FF5959]" data-pid=${t.id}
                >
                  -
                </button>
                <span
                  class="item-count text-lg font-bold px-2  text-gray-700 dark:text-[#FFFFFF]"
                >
                  ${t.qty}
                </span>
                <button
                  class="btn-cartCount btn btn-md bg-gray-300 text-white  rounded-full flex justify-center transition duration-300 ease-in-out border-none dark:bg-gradient-to-br hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#FF5959] focus:outline-none w-10 text-4xl items-start pl-[1.4rem]"
                >
                  +
                </button>
              </div>

              <!-- Buy button -->
              
            </div>`,document.querySelector(".modalCartItemsContainer").appendChild(e),document.querySelectorAll(".btn-cartCount").forEach(t=>t.addEventListener("click",g)),document.querySelectorAll(".deleteProductCart").forEach(t=>t.addEventListener("click",p)),document.querySelector(".purchaseQty").innerText=`Tienes ${c()} ClausBags en tu Carrito`}),document.querySelector(".buyBtnContainer").innerHTML=`
    <p class="mb-2 lg:text-4xl lg:mb-6 dark:text-red-400">Pr\xf3ximo paso:</p>
      <button id="confirmCartBtn" class="btn btn-wide bg-gradient-to-br hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#FF5959] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white rounded-full py-2 px-5 shadow-md text-lg lg:text-2xl lg:p-1.5">
    Personalizar <span class="pl-3"><img src="src/assets/icons/whatsapp.webp" alt="wtspIcon" width="28px"></span>
</button>`,t.classList.remove("hidden"),document.getElementById("confirmCartBtn").addEventListener("click",m),d(),function(){console.log("calculating disccount");let t=document.getElementById("discountMsg");console.log(c),c()>=3?t.innerHTML=`<p class="text-xl sm:text-xl text-green-400 lg:text-3xl">Llevas 3 o m\xe1s. Te haremos el descuento en Whatsapp</p>`:t.innerHTML=""}();let e=document.getElementById("modalCartContainer");e.classList.remove("hidden"),document.getElementById("closeModalCart").addEventListener("click",()=>e.classList.add("hidden"))}function g(t){let e=t.target.closest(".productContainer"),n=e.querySelector(".item-count"),r=e.querySelector("[data-pid]").dataset.pid;console.log(r);let a=s.findIndex(t=>t.id==r);"+"==t.target.textContent.trim()?(s[a].qty+=1,n.innerText=s[a].qty):"-"==t.target.textContent.trim()?(console.log(s[a].qty),s[a].qty>1?(s[a].qty-=1,n.innerText=s[a].qty,console.log("did enter in qty > 1?")):1==s[a].qty&&(console.log("did enter in qty == 1?"),p(t))):console.log("doesn't should pass for here"),localStorage.setItem("cart",JSON.stringify(s)),c(),u(),o()}function m(){console.log(s);let t=s.sort((t,e)=>{let o=t.nombre.toLowerCase(),n=e.nombre.toLowerCase();return o<n?-1:o>n?1:0}).map(t=>`Modelo: ${t.nombre.replace(/_/g," ")} - Cantidad: ${t.qty}`).join("\n"),e=`Hola, Quisiera Comprar estas ClausBags \u{1F381}: 
${t}`,o=`https://wa.me/573209389966?text=${encodeURIComponent(e)}`;window.open(o,"_blank")}function p(t){let e=t.target.dataset.pid;console.log(e),console.log(s);let n=s.filter(t=>t.id!=e);console.log(n),localStorage.setItem("cart",JSON.stringify(n)),c(),u(),o(),d()}console.log({cart:s}),console.log(!!localStorage.getItem("cart")),document.getElementById("cartList").addEventListener("click",u);const b=document.getElementById("navBar_mobileMenu"),x=document.getElementById("hamburger-btn"),f=document.getElementById("closeModalBtn");function y(){console.log("hiii"),b.style.opacity=0,setTimeout(()=>{b.style.display="none"},500)}window.onclick=function(t){t.target===b&&(b.style.opacity=0,setTimeout(()=>{b.style.display="none"},500))},x.addEventListener("click",function(){b.style.display="block",setTimeout(()=>{b.style.opacity=1},10)}),f.addEventListener("click",y);const h=document.querySelector(".goToCart"),v=document.querySelector(".goToCartFromMobile"),F=document.getElementById("buyNowBtn");function w(){if(console.log("hii"),console.log({cart:s}),0==s.length){e.scrollIntoView({behavior:"smooth"}),y();return}u(),y()}h.addEventListener("click",w),v.addEventListener("click",w),F.addEventListener("click",w);
//# sourceMappingURL=index.bfde6244.js.map
