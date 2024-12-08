const e=document.querySelector(".cartQty"),t=document.getElementById("catalogoSection");function o(){let t=JSON.parse(localStorage.getItem("cart"));t?e.innerText=t.reduce((e,t)=>e+t.qty,0):e.innerText=0}o();class r{constructor(e,t,o,r,n){this.id=e,this.nombre=t,this.imagen=o,this.precio=r,this.precio_viejo=n}}let n=[{id:"cb1",nombre:"Claus Bag 1",imagen:"products/cbRed_xs.webp",imagen2:"products/cb1.webp",precio:"55000",precio_viejo:"70,000"},{id:"cb2",nombre:"Claus Bag 2",imagen:"products/cbGreen_xs.webp",imagen2:"products/cb2.png",precio:"55000",precio_viejo:"70,000"},{id:"cb3",nombre:"Claus Bag 3",imagen:"products/cb_3_xs.webp",imagen2:"products/cb3.webp",precio:"50000",precio_viejo:"65,000"},{id:"cb4",nombre:"Claus Bag 4",imagen:"products/HK-X8_xs.webp",imagen2:"products/cb4.webp",precio:"50000",precio_viejo:"65,000"},{id:"cb5",nombre:"Claus Bag 5",imagen:"products/HK-32_xs.webp",imagen2:"products/cb5.webp",precio:"60000",precio_viejo:"75,000"},{id:"cb6",nombre:"Claus Bag 6",imagen:"products/CB-LineaVerde_xs.webp",imagen2:"products/cb6.webp",precio:"60000",precio_viejo:"75,000"},{id:"cb7",nombre:"Claus Bag 7",imagen:"products/CB-LineaRoja_xs.webp",imagen2:"products/cb7.webp",precio:"60000",precio_viejo:"75,000"},{id:"cb8",nombre:"Claus Bag 8",imagen:"products/HK-19_xs.webp",imagen2:"products/cb8.webp",precio:"50000",precio_viejo:"65,000"}];const a={};function i(e){let t=e.target.closest(".productContainer"),o=t.querySelector("[data-pid]").dataset.pid,r=t.querySelector(".item-count");if(!t){console.error("Product Container Not Found");return}if(!o){console.error("Product ID not found");return}a[o]||(a[o]=1),"+"==e.target.textContent.trim()?(a[o]++,r.innerText=a[o]):"-"==e.target.textContent.trim()?a[o]>1&&(a[o]--,r.innerText=a[o]):console.log("doesn't should pass for here")}let s=JSON.parse(localStorage.getItem("cart"))?JSON.parse(localStorage.getItem("cart")):[];function l(e){let t=e.target.closest(".productContainer").querySelector(".item-count"),n=e.target.dataset.pid,i=s.findIndex(e=>e.id==n);if(-1==i){let o=new r(e.target.dataset.pid,e.target.dataset.name,e.target.dataset.img,e.target.dataset.price);o.qty=parseInt(t.textContent),s.push(o)}else s[i].qty+=parseInt(t.textContent);localStorage.setItem("cart",JSON.stringify(s)),o(),a[n]=1,Swal.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:2e3,timerProgressBar:!0,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}}).fire({icon:"success",text:`A\xf1adiste ${parseInt(t.textContent)} ClausBag al carrito `}),t.innerText=a[n],fbq("track","AddToCart",{model:n,qty:a[n]})}function c(){return s.reduce((e,t)=>e+=t.qty,0)}function d(){let e=document.querySelector(".totalCart"),t=s.reduce((e,t)=>(console.log({precio:t.precio}),console.log({total:e+=parseInt(t.qty)*parseInt(t.precio)}),e),0),o=`${t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}`;return console.log(t),e.innerHTML=`Total: <span class='bold dark:text-green-400'>$${o}</span>`,t}function u(){s=JSON.parse(localStorage.getItem("cart"))?JSON.parse(localStorage.getItem("cart")):[],document.querySelector(".modalCartItemsContainer").innerHTML="";let e=document.querySelector(".buyBtnContainer");if(e.innerHTML="",0==s.length){document.querySelector(".purchaseQty").innerHTML=`
    <p>Tu carrito est\xe1 vac\xedo</p>`,document.querySelector(".buyBtnContainer").innerHTML=`
    <p class="mb-2 lg:text-4xl">Pr\xf3ximo paso:</p>
      <a href="#catalogoSection" id="goCataloge" class="btn mt-6 bg-gradient-to-br hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#FF5959] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white rounded-full py-2 px-2 shadow-md tracking-widest text-lg lg:text-md lg:p-2.5 lg:w-max">
    Explora Todos los Modelos
</a>`;let e=document.getElementById("goCataloge");e.removeEventListener("click",g),e.addEventListener("click",()=>{document.getElementById("modalCartContainer").classList.add("hidden")})}else s.sort((e,t)=>{let o=e.nombre.toLowerCase(),r=t.nombre.toLowerCase();return o<r?-1:o>r?1:0}).forEach(e=>{let t=document.createElement("div"),o=`${(e.precio*e.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}`;t.setAttribute("class","productContainer w-full shadow-xl flex flex-row p-1 sm:p-2 bg-white rounded-lg border border-gray-300 gap-3 lg:w-[41%] dark:bg-[#1E3D32]"),t.innerHTML=`
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
                src="/icons/borrarProducto.webp"
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
                
                <span class="text-lg font-bold text-green-500 dark:text-success"
                  >$${o}</span
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
              
            </div>`,document.querySelector(".modalCartItemsContainer").appendChild(t),document.querySelectorAll(".btn-cartCount").forEach(e=>e.addEventListener("click",m)),document.querySelectorAll(".deleteProductCart").forEach(e=>e.addEventListener("click",p)),document.querySelector(".purchaseQty").innerText=`Tienes ${c()} ClausBags en tu Carrito`}),document.querySelector(".buyBtnContainer").innerHTML=`
    <p class="mb-2 lg:text-4xl lg:mb-6 dark:text-red-400">Pr\xf3ximo paso:</p>
      <button id="confirmCartBtn" class="btn btn-wide bg-gradient-to-br hover:from-[#FF5959] hover:to-[#FFD700] from-[#1EB71E] to-[#FF5959] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white rounded-full py-2 px-5 shadow-md text-lg lg:text-2xl lg:p-1.5">
    Personalizar <span class="pl-2"><img src="/icons/whatsapp.webp" alt="wtspIcon" width="28px"></span>
</button>`,e.classList.remove("hidden"),document.getElementById("confirmCartBtn").addEventListener("click",g),d(),function(){let e=document.getElementById("discountMsg");c()>=3?e.innerHTML=`<p class="text-2xl sm:text-2xl text-green-400 lg:text-3xl">Llevas 3 o m\xe1s. T\xfa env\xedo es gratis!</p>`:e.innerHTML=""}();let t=document.getElementById("modalCartContainer");t.classList.remove("hidden"),document.getElementById("closeModalCart").addEventListener("click",()=>t.classList.add("hidden"))}function m(e){let t=e.target.closest(".productContainer"),r=t.querySelector(".item-count"),n=t.querySelector("[data-pid]").dataset.pid,a=s.findIndex(e=>e.id==n);"+"==e.target.textContent.trim()?(s[a].qty+=1,r.innerText=s[a].qty):"-"==e.target.textContent.trim()?s[a].qty>1?(s[a].qty-=1,r.innerText=s[a].qty):1==s[a].qty&&p(e):console.log("doesn't should pass for here"),localStorage.setItem("cart",JSON.stringify(s)),c(),u(),o()}function g(){let e=s.sort((e,t)=>{let o=e.nombre.toLowerCase(),r=t.nombre.toLowerCase();return o<r?-1:o>r?1:0}).map(e=>`Modelo: *${e.nombre.replace(/_/g," ")}.* Precio: *${e.precio}* x Cantidad: *${e.qty}* = *${e.precio*e.qty}*`).join("\n"),t=`Hola, Quisiera Comprar estas ClausBags \u{1F381}: 
${e}
*Total Pedido = ${d()}*`,o=`https://wa.me/573202806790?text=${encodeURIComponent(t)}`;fbq("track","Purchase",{amount:d(),cartQty:c()}),window.open(o,"_blank")}function p(e){let t=e.target.dataset.pid,r=s.filter(e=>e.id!=t);localStorage.setItem("cart",JSON.stringify(r)),c(),u(),o(),d()}document.getElementById("cartList").addEventListener("click",u);const b=document.getElementById("navBar_mobileMenu"),x=document.getElementById("hamburger-btn"),f=document.getElementById("closeModalBtn");function y(){b.style.opacity=0,setTimeout(()=>{b.style.display="none"},500)}window.onclick=function(e){e.target===b&&(b.style.opacity=0,setTimeout(()=>{b.style.display="none"},500))},x.addEventListener("click",function(){b.style.display="block",setTimeout(()=>{b.style.opacity=1},10)}),f.addEventListener("click",y);const v=document.querySelector(".goToCart"),h=document.querySelector(".goToCartFromMobile"),w=document.getElementById("buyNowBtn");function C(){if(0==s.length){t.scrollIntoView({behavior:"smooth"}),y();return}u(),y()}v.addEventListener("click",C),h.addEventListener("click",C),w.addEventListener("click",C),window.addEventListener("scroll",()=>{let e=window.scrollY,t=document.querySelector(".wtspIconContainer");e>=1e3?t.classList.add("show"):t.classList.remove("show")}),new IntersectionObserver((e,t)=>{e.forEach(e=>{e.isIntersecting&&(console.log("showing products"),n.forEach((e,t)=>{let o=document.createElement("div"),r=`$${e.precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}`;o.setAttribute("class","productContainer w-full shadow-xl flex flex-row p-1 sm:p-4 dark:bg-[#1E3D32] bg-white rounded-lg border border-gray-300  md:w-[48%] lg:w-[49%]"),o.innerHTML=`
            <div id="carouselImgs-${t}" class="carousel">
            <figure id="slide1-${t}" class="carousel-item flex align-top w-52 pb-0 rounded-lg active">
              <img src=${e.imagen} alt="bag" />
                <div class="nav-buttons">
                <button class="prev" data-index="${t}">\u{276E}</button>
                <button class="next" data-index="${t}">\u{276F}</button>
                </div>
            </figure>
            <figure id="slide2-${t}" class="carousel-item flex align-top w-52 pb-0 rounded-lg">
              <img src=${e.imagen2} class="shadowImg" alt="bag" />
                <div class="nav-buttons">
                <button class="prev" data-index="${t}">\u{276E}</button>
                <button class="next" data-index="${t}">\u{276F}</button>
                </div>
            </figure>
            </div>
            <div class="card-body p-2 px-1 pl-3 leading-3">
              <h5 class="card-title text-[1.7rem] tracking-widest dark:text-red-400">
                ${e.nombre}
              </h5>
              <div class="priceContainer flex flex-col">
                <span
                  class="text-lg font-medium text-gray-300 dark:text-white line-through italic"
                  >$${e.precio_viejo}</span
                >
                <span class="text-xl font-bold text-green-500 dark:text-success"
                  >${r}</span
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
    `,document.querySelector(".catalogoProductsContainer").appendChild(o)}),document.querySelectorAll(".nav-buttons button").forEach(e=>{e.addEventListener("click",e=>{let t=e.target.getAttribute("data-index");console.log({index:t});let o=e.target.classList.contains("next")?1:-1;console.log({direction:o}),function(e,t){console.log({index:e});let o=document.querySelectorAll(`#carouselImgs-${e} .carousel-item`);console.log({slides:o});let r=document.querySelector(`#carouselImgs-${e} .carousel-item.active`);console.log({activeSlide:r});let n=Array.from(o).indexOf(r),a=(n+t+o.length)%o.length;o[n].classList.remove("active"),o[a].classList.add("active")}(t,o)})}),document.querySelectorAll(".addToCartBtn").forEach(e=>{e.addEventListener("click",l)}),document.querySelectorAll(".btn-count").forEach(e=>{e.addEventListener("click",i)}),t.unobserve(e.target))})},{root:null,rootMargin:"0px",threshold:.05}).observe(t);
//# sourceMappingURL=index.2c3ed863.js.map
