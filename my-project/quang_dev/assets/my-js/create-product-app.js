import {
  randomId,
  getItemInLocalStorage,
  PRODUCTS,
  setItemInLocalStorage,
  authen,setCartHtml,CART,SHOP
} from "../../../helper.js";
authen()
const cart = document.getElementById('counter')
  setCartHtml(cart)
const productName = document.getElementById("basic-icon-default-productName");
const producer = document.getElementById("basic-icon-default-producer");
const status = document.getElementById("basic-icon-default-status");
const imageLink = document.getElementById("basic-icon-default-imageLink");
const price = document.getElementById("basic-icon-default-price");
const submit = document.getElementById("btn-submit");

submit.addEventListener("click", () => {
  let productObj = {
    productName: productName.value,
    producer: producer.value,
    status: status.value,
    imageLink: imageLink.value,
    price: price.value,
    id:randomId()
  };
  const products = getItemInLocalStorage(PRODUCTS);
  //    Chuyen sang dang nguyen thuy productList
  //   Them san pham moi
  products.push(productObj);
  // Luu lai vao local storage
  // -bien listProduct thanh string==>save
 //   <-- ! -->

 //   function setItemInLocalStorage(key,value) {
 //     const strData = JSON.stringify(value)
  //     // Save Local
//     localStorage.setItem(key,strData)
  // }
  if (
    productName.value == "" &&
    producer.value == "" &&
    imageLink.value == "" &&
    price.value == ""
  ) {
    alert("Bạn chưa nhập đầy đủ thông tin sản phẩm");
  } else {
    setItemInLocalStorage(PRODUCTS, products);
    window.location.href = "/my-project/quang_dev/index-home.html";
  }
  

});
