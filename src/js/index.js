// import { Carousel } from "flowbite";

const btnAddWtspProduct = document.getElementById('btnWtspProduct')

const btnsItemCount = document.querySelectorAll('.btn-count')

//** Item Count */
let itemCount = 1;

export function handleItemCount(e) {
  const targetContainer = e.target.closest('.productContainer')

  if (!targetContainer) {
    console.error(`Product Container Not Found`)
    return 
    }

  const itemCountHTML = targetContainer.querySelector('.item-count')

  console.log(itemCount);
  if (e.target.textContent.trim() == '+') {
    itemCount++;
    itemCountHTML.innerText = itemCount;
  } else if (e.target.textContent.trim() == '-') {
    if (itemCount > 1) {
      itemCount--;
      itemCountHTML.innerText = itemCount;
    }
  } else {
    console.log(`doesn't should pass for here`);
  }
}
//**TO-DO Make the logic to catch only itemCount of each product and not the others */

function handleAddProductWtsp(e) {
  console.log(e.target.dataset.pid);
  console.log(itemCount);
  const phoneNumber = 573209389966

  const message = `Hola! Quisiera comprar ${itemCount} unidades de la ClausBag ${e.target.dataset.pid} por favor.`
  console.log(message);

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  window.open(whatsappLink, '_blank')
}

btnsItemCount.forEach(e => {
  e.addEventListener('click', handleItemCount)
}) 

btnAddWtspProduct.addEventListener('click', handleAddProductWtsp)