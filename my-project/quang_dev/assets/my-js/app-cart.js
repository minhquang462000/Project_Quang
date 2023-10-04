import {
  PRODUCTS,
  getItemInLocalStorage,
  setItemInLocalStorage,
  ID_EDIT,
  authen,
  SHOP,
  CART,
  setCartHtml,
} from "../../../helper.js";
const cartItems = getItemInLocalStorage(SHOP);
for (let i = 0; i < cartItems.length; i++) {
  const cartItem = cartItems[i];
  const cartLater = getItemInLocalStorage(CART);
  // cartLater.push(cartItem)
  const findProduct = cartLater.find((item) => item.id === cartItem.id);
  if (findProduct) {
    const newCart = cartLater.map((item) => {
      if (item.id === findProduct.id) {
        item.productName = cartItem.productName;
        item.price = cartItem.price;
        item.imageLink = cartItem.imageLink;
        item.status = cartItem.status;
      }
      return item;
    });
    setItemInLocalStorage(CART, newCart);
  }
}

window.addEventListener("load", () => {
  const cart = document.getElementById("counter");
  setCartHtml(cart);
  totalCart();
  const products = getItemInLocalStorage(CART);

  const tbody = document.getElementById("tbody");
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    // tao ra ca the
    const tr = document.createElement("tr");
    const tdNo1 = document.createElement("td");
    tdNo1.classList.add("product-thumbnail");
    const tdNo1Img = document.createElement("img");
    tdNo1Img.src = product.imageLink;
    tdNo1Img.alt = "Image";
    tdNo1Img.classList.add("img-fluid", "img-hight");
    tdNo1.appendChild(tdNo1Img);
    // tdNo2
    const tdNo2 = document.createElement("td");
    tdNo2.classList.add("product-name");

    const tdNo2H2 = document.createElement("h2");
    tdNo2H2.classList.add("h5", "text-black");
    tdNo2H2.innerText = product.productName;
    tdNo2.appendChild(tdNo2H2);
    // TD NO3---------
    const tdNo3 = document.createElement("td");
    tdNo3.innerText = `$${Number(product.price)}.00`;
    // Td no4-----------
    const tdNo4 = document.createElement("td");
    tdNo4.classList.add("tdQ");
    const divTd04 = document.createElement("div");
    divTd04.classList.add("input-group", "align-items-center", "divQ");

    const divTdNo401 = document.createElement("div");
    divTdNo401.classList.add("input-group-prepend");
    const btnDiv01 = document.createElement("div");
    btnDiv01.classList.add("btn", "btn-outline-black", "decrease");
    btnDiv01.textContent = "-";
    btnDiv01.addEventListener("click", () => {
      const cartLater = getItemInLocalStorage(CART);
      const productFind = cartLater.find((item) => item.id === product.id);
      if (productFind) {
        const newCart = cartLater.map((item) => {
          if (item.id === productFind.id && item.counter > 1) {
            item.counter -= 1;
          }
          return item;
        });
        setItemInLocalStorage(CART, newCart);
        const inputCurrent = document.getElementById(product.id);
        const newProductCart = newCart.find((item) => item.id === product.id);
        inputCurrent.value = newProductCart.counter;
        priceTd05(
          product.id,
          Number(newProductCart.counter),
          Number(newProductCart.price)
        );
        totalCart();
        setCartHtml(cart);
      }
    });
    divTdNo401.appendChild(btnDiv01);
    divTd04.appendChild(divTdNo401);

    const inputTd04 = document.createElement("input");
    inputTd04.type = "text";
    inputTd04.classList.add(
      "form-control",
      "text-center",
      "quantity-amount",
      "inputQ"
    );
    inputTd04.value = "1";
    inputTd04.value = product.counter;
    inputTd04.id = product.id;
    inputTd04.addEventListener("change", () => {
      const cartLater = getItemInLocalStorage(CART);
      const productFind = cartLater.find((item) => item.id === product.id);
      if (productFind) {
        const newCart = cartLater.map((item) => {
          if (item.id === productFind.id) {
            item.counter = Number(inputTd04.value);
          }
          return item;
        });
        setItemInLocalStorage(CART, newCart);
        const inputCurrent = document.getElementById(product.id);
        const newProductCart = newCart.find((item) => item.id === product.id);
        priceTd05(
          product.id,
          Number(newProductCart.counter),
          Number(newProductCart.price)
        );
        totalCart();
        setCartHtml(cart);
      }
    });
    // inputTd04.aria-label = "Example text with button addon"
    // inputTd04.aria-describedby = "button-addon1"
    divTd04.appendChild(inputTd04);

    const divTdNo402 = document.createElement("div");
    divTdNo402.classList.add("input-group-append");
    const btnDiv02 = document.createElement("div");
    btnDiv02.classList.add("btn", "btn-outline-black", "increase");
    btnDiv02.textContent = "+";
    divTdNo402.appendChild(btnDiv02);
    divTd04.appendChild(divTdNo402);
    tdNo4.appendChild(divTd04);
    btnDiv02.addEventListener("click", () => {
      const cartLater = getItemInLocalStorage(CART);
      const productFind = cartLater.find((item) => item.id === product.id);
      if (productFind) {
        const newCart = cartLater.map((item) => {
          if (item.id === productFind.id) {
            item.counter += 1;
          }
          return item;
        });
        setItemInLocalStorage(CART, newCart);
        const inputCurrent = document.getElementById(product.id);
        const newProductCart = newCart.find((item) => item.id === product.id);
        inputCurrent.value = newProductCart.counter;
        priceTd05(
          product.id,
          Number(newProductCart.counter),
          Number(newProductCart.price)
        );
        totalCart();
        setCartHtml(cart);
      }
    });

    const tdNo5 = document.createElement("td");
    tdNo5.innerText = `$${Number(product.price) * inputTd04.value}.00`;
    tdNo5.id = `td05-${product.id}`;

    const tdNo6 = document.createElement("td");
    const aTdNo6 = document.createElement("a");
    aTdNo6.href = "#";
    aTdNo6.classList.add("btn", "btn-black", "btn-sm");
    aTdNo6.innerText = "X";
    // Xoa sp---------
    aTdNo6.addEventListener("click", () => {
      const select = confirm("Bạn có thực sự muốn xoá sản phẩm");
      if (select) {
        // Lay ra id product
        // lay duw lieu trong local
        const products = getItemInLocalStorage(CART);
        // Thuc hien xoa du lieu tren Local
        const newProducts = products.filter((item) => item.id != product.id);
        // Chuyen du lieu thanh string
        setItemInLocalStorage(CART, newProducts);
        // Reload wed
        totalCart();
        window.location.reload();
      }
    });
    tdNo6.appendChild(aTdNo6);
    // them cac the vao tr
    tr.appendChild(tdNo1);
    tr.appendChild(tdNo2);
    tr.appendChild(tdNo3);
    tr.appendChild(tdNo4);
    tr.appendChild(tdNo5);
    tr.appendChild(tdNo6);
    // Them the vao tbody
    tbody.appendChild(tr);
    // Function thay doi CartTotal Sap Pham
    function priceTd05(id, counter, price) {
      const td = document.getElementById(`td05-${id}`);
      td.innerText = "$" + counter * price + ".00";
    }
    // tinh tong tien
  }
  function totalCart() {
    const carts = getItemInLocalStorage(CART);
    let total = 0;
    for (let i = 0; i < carts.length; i++) {
      const product = carts[i];
      const priceProduct = product.price * product.counter;
      total += priceProduct;
    }
    const totalPrice = document.querySelectorAll(".total-price");
    totalPrice[0].innerText = "$" + total + ".00";
    totalPrice[1].innerText = "$" + total + ".00";
  }
});
