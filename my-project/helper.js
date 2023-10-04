const PRODUCTS = 'products'
const ID_EDIT = 'id-edit'
const USERS = 'users'
const USER = 'user'
const REMEMBER_ME="remember-me"
const SHOP="shop"
const CART ="cart"
function randomId() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
function getItemInLocalStorage(key) {
    const itemInLocal = localStorage.getItem(key)
    const result =JSON.parse(itemInLocal)
    return result  ?? []
} 
function setItemInLocalStorage(key,value) {
    const strData = JSON.stringify(value)
    // Save Local
    localStorage.setItem(key,strData)
}
function authen() {
    // check users dawng nhap 
    const userLogin = getItemInLocalStorage(USER)
    
    if (userLogin.length ===undefined) {
        
        return
        // 1.1 Có
    //  1.2 Không

    }else{
        window.location.href ="/my-project/quang_dev/index-login.html"
    }
    
}
function setCartHtml(x) {
    const productsCart = getItemInLocalStorage(CART)
    let total = 0
    for (let i = 0; i < productsCart.length; i++) {
        const product = productsCart[i];
        total += product.counter
    }
    x.innerText = total
}
export {randomId,getItemInLocalStorage,PRODUCTS,setItemInLocalStorage,ID_EDIT,USERS,REMEMBER_ME,USER,authen,CART,SHOP,setCartHtml}