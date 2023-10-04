import {
  PRODUCTS ,getItemInLocalStorage,setItemInLocalStorage,ID_EDIT,authen,SHOP,setCartHtml, CART
} from "../../../helper.js";
authen()

window.addEventListener("load", () => {
  const divSlice = document.getElementById("div-slice");
const olActive = document.getElementById("ol-active");
  // lay ra local va chuyen ve dang nguyen thuy
  const products = getItemInLocalStorage(PRODUCTS);
  //   Tao vong lap for qua cacs products
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    // tao ra cac the can thiet
    const divCarousel = document.createElement("div");
    divCarousel.classList.add("carousel-item");

    const divContainer = document.createElement("div");
    divContainer.classList.add("container");

    const divRow = document.createElement("div");
    divRow.classList.add("row", "p-5");

    const divImg = document.createElement("div");
    divImg.classList.add("mx-auto", "col-md-8", "col-lg-6", "order-lg-last");
    const image = document.createElement("img");
    image.classList.add("img-fluid");
    image.src = product.imageLink;

    // Them vao the Div Image
    divImg.appendChild(image);
    // ----  ____  -----
    const divItem = document.createElement("div");
    divItem.classList.add("col-lg-6", "mb-0", "d-flex", "align-items-center");
    const divItemText = document.createElement("div");
    divItemText.classList.add("text-align-left", "align-self-center");

    const itemH1 = document.createElement("h1");
    itemH1.classList.add("h1", "text-success");
    const itemB = document.createElement("b");
    itemB.innerText = "Producer :";
    const span = document.createElement("span");
    span.innerText = product.producer;

    //   Them thr B vao h1Item
    itemH1.appendChild(itemB);
    itemH1.appendChild(span);

    const itemH1Q = document.createElement("h1");
    itemH1Q.classList.add("h1", "text-success", "productQ");
    const itemB2 = document.createElement("b");
    itemB2.innerText = "Product :";
    const span01 = document.createElement("span");
    span01.innerText = product.productName;

    //   Them thr B vao h1Item
    itemH1Q.appendChild(itemB2);
    itemH1Q.appendChild(span01);

    const h4Price = document.createElement("h4");
    h4Price.classList.add("class-h4");
    h4Price.innerText = `Price : ${product.price} $`;

    const divFlex = document.createElement("div");
    divFlex.classList.add("flex");
    const divFlexH4 = document.createElement("h4");
    divFlexH4.innerText = `Status : `;
    const divFlexStatus = document.createElement("div");
    divFlexStatus.classList.add("status");
    const statusH4 = document.createElement("h4");
    statusH4.classList.add("con");
    statusH4.id = "statusQ";
    statusH4.innerText = `Status : ${product.status} `;

    if (product.status == "con hang") {
      statusH4.classList.add("blue");
    }
    statusH4.innerText = product.status;
    divFlexStatus.appendChild(statusH4);

    const h4Btn = document.createElement("h4");
    h4Btn.classList.add("btn-h4");
    // ----Edit---------------
    const editBtn = document.createElement("button");
    editBtn.classList.add("btn");
    editBtn.innerText = 'Edit'
    h4Btn.appendChild(editBtn);
    editBtn.addEventListener('click',()=>{
      setItemInLocalStorage(ID_EDIT,product.id)
      console.log();
      window.location.href = "/my-project/quang_dev/edit-index.html"
    })
    // -------Delete---------
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn");
    deleteBtn.innerText= "Delete"
    h4Btn.appendChild(deleteBtn);
    deleteBtn.addEventListener('click',()=>{
     
      const select =  confirm("Bạn có thực sự muốn xoá sản phẩm")
      if (select) {
        // Lay ra id product
            // lay duw lieu trong local
            const products = getItemInLocalStorage(PRODUCTS);
            // Thuc hien xoa du lieu tren Local
            const newProducts = products.filter(item => item.id != product.id)
            // Chuyen du lieu thanh string
           setItemInLocalStorage(PRODUCTS,newProducts)
            // Reload wed
            window.location.reload()
      }
       


    })
    // ol Active--------------
    const liActive =document.createElement('li')
    liActive.classList.add('liOld')
    for (let i = 0; i < products.length; i++) {
        olActive.appendChild(liActive) 
    }
    const liOldActive =document.getElementsByClassName('liOld')
    liOldActive[0].classList.add('active')
    

    //   Them the vao div_flex
    divFlex.appendChild(divFlexH4);
    divFlex.appendChild(divFlexStatus);
    //   Them the vao div ItemsText
    divItemText.appendChild(itemH1);
    divItemText.appendChild(itemH1Q);
    divItemText.appendChild(h4Price);
    divItemText.appendChild(divFlex);
    divItemText.appendChild(h4Btn);
    // Them vao the Div Items
    divItem.appendChild(divItemText);
    // Them vao the Div Row
    divRow.appendChild(divImg);
    divRow.appendChild(divItem);
    // Them vao the Div Container
    divContainer.appendChild(divRow);
    // Them vao the div Carousel
    divCarousel.appendChild(divContainer);
    // Them vao the Div Slice
    divSlice.appendChild(divCarousel);
    const carouselList = document.querySelectorAll('.carousel-item')
    carouselList[0].classList.add('active')
  }
   // TAo Shop
  const shopProducts = products.filter(item => item.status === "con hang")
    setItemInLocalStorage(SHOP,shopProducts)
  const carouselList = document.querySelectorAll('.carousel-item')
    const control = document.querySelectorAll('.w-auto')
    if (carouselList.length == 0) {
      control[0].classList.add('hideQ')
      control[1].classList.add('hideQ')
    }
    const cart = document.getElementById('counter')
    setCartHtml(cart)
    
});
