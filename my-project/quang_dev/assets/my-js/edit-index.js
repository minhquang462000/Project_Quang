import {
    PRODUCTS ,getItemInLocalStorage,setItemInLocalStorage,ID_EDIT,authen
  } from "../../../helper.js";
authen()
window.addEventListener('load',()=>{
    const products = getItemInLocalStorage(PRODUCTS)
    const idProduct =getItemInLocalStorage(ID_EDIT)
    const productEdit = products.find(item => item.id === idProduct)
    
    const productName = document.getElementById('basic-icon-default-productName')
    const producer = document.getElementById('basic-icon-default-producer')
    const status =document.getElementById('basic-icon-default-status')
    const price = document.getElementById('basic-icon-default-price')
    const imageLink = document.getElementById('basic-icon-default-imageLink')

    productName.value = productEdit.productName
    producer.value = productEdit.producer
    status.value = productEdit.status
    price.value = productEdit.price
    imageLink.value = productEdit.imageLink
})

const btnUpdate =document.getElementById("btn-update")
btnUpdate.addEventListener('click',()=>{
    const productName = document.getElementById('basic-icon-default-productName').value
    const producer = document.getElementById('basic-icon-default-producer').value
    const status =document.getElementById('basic-icon-default-status').value
    const price = document.getElementById('basic-icon-default-price').value
    const imageLink = document.getElementById('basic-icon-default-imageLink').value
     // Lay ra list product ra tu local Storage
     const products = getItemInLocalStorage(PRODUCTS)
     // Lay ID can Update
     const idEdit = getItemInLocalStorage(ID_EDIT);
     // Sua du lieu
     const newData = products.map( item => {
         if (item.id == idEdit) {
             item.productName = productName
             item.producer = producer
             item.status = status
             item.price = price
             item.imageLink = imageLink
         } 
         return item
     })
        
      // Cap nhap vao local Storage
      const select =  confirm("Bạn có thực sự muốn thay đổi sản phẩm")
      if (select) {
        setItemInLocalStorage(PRODUCTS, newData)
        window.location.href='/my-project/quang_dev/index-home.html'
      }
     
})