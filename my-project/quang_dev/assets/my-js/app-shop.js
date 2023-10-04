import {
  PRODUCTS,
  getItemInLocalStorage,
  setItemInLocalStorage,
  ID_EDIT,
  authen,
  SHOP,CART,setCartHtml
} from "../../../helper.js";
const cartCounter = document.getElementById('counter')
window.addEventListener("load", () => {
  const rowItems = document.getElementById("rowItems");

  const carts = getItemInLocalStorage(SHOP);

  // Tao ra cac the
  for (let i = 0; i < carts.length; i++) {
    const cartItem = carts[i];
    const divItem = document.createElement("div");
    divItem.classList.add("col-12", "col-md-4", "col-lg-3", "mb-5");
    const aItem = document.createElement("a");
    aItem.classList.add("product-item");
    aItem.href = "#";
    const imageItem = document.createElement("img");
    imageItem.classList.add("img-fluid", "product-thumbnail" ,"imageQ");
    imageItem.src = cartItem.imageLink;
    const h3Item = document.createElement("h3");
    h3Item.classList.add("product-title");
    h3Item.innerText = cartItem.productName;
    const strongItem = document.createElement("strong");
    strongItem.classList.add("product-price");
    strongItem.innerText = '$'+ Number(cartItem.price)+'.00';
    const spanItem = document.createElement("span");
    spanItem.classList.add("icon-cross");
    // Tao Counter cho Item
    spanItem.addEventListener('click',()=>{
        const cartLater = getItemInLocalStorage(CART)
        // cartLater.push(cartItem)
        const findProduct = cartLater.find(item => item.id === cartItem.id)
        if (findProduct) {
            const newCart = cartLater.map(item => {
                if ( item.id === findProduct.id) {
                    item.counter += 1
                    item.productName = cartItem.productName
                    item.price = cartItem.price
                    item.imageLink = cartItem.imageLink
                    item.status = cartItem.status
                }
                 return item 

            })
            setItemInLocalStorage(CART,newCart)
        }else{
            cartLater.push({ ... cartItem ,counter : 1})
            setItemInLocalStorage(CART,cartLater)
        }
        setCartHtml(cartCounter)

    })
    
   
   


    const imageSpan = document.createElement("img");
    imageSpan.classList.add("img-fluid");
    imageSpan.src = "../Shop/images/cross.svg";
    spanItem.appendChild(imageSpan)

    // Them cac the vao a Item
    aItem.appendChild(imageItem);
    aItem.appendChild(h3Item);
    aItem.appendChild(strongItem);
    aItem.appendChild(spanItem);
    // them cac the vao divItem
    divItem.appendChild(aItem);
    // Them cac the vao Row Items
    rowItems.appendChild(divItem)
  }
 
  setCartHtml(cartCounter)
});


