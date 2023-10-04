import {
  USERS,
  getItemInLocalStorage,
  setItemInLocalStorage,
  REMEMBER_ME,
  USER,
  authen,
} from "../../../helper.js";

setItemInLocalStorage("users", [
  { email: "nmquang.com", password: "quang460" },
]);
const signInBtn = document.getElementById("btn-login");


signInBtn.addEventListener('click', () => {
  const emailLogin = document.getElementById("email").value;
  const passLogin = document.getElementById("password").value;
  const users = getItemInLocalStorage(USERS);
  // so sanh user input voi user list
  const userFoundByEmailPass = users.find(
    (item) => item.email == emailLogin && item.password == passLogin
  );
  if (userFoundByEmailPass) console.log(userFoundByEmailPass);
  if (userFoundByEmailPass) {
    // 1.Tk dung
    // Check xem o remember Me true or false
    const inputRememberMe = document.getElementById("remember-me");
    if (inputRememberMe.checked) {
      // 1.1 True
      // set vao local 1 gia tri bang true
      setItemInLocalStorage(REMEMBER_ME, true);
    } else {
      // 1.2 False
      // set vao local 1 gia tri bang false
      setItemInLocalStorage(REMEMBER_ME, false);
    }
    setItemInLocalStorage(USER, userFoundByEmailPass);
    window.location.href = '/my-project/quang_dev/index-home.html'

    // redirect sang home
    // tk sai
    // alett Nhap laij tk
  } else {
    alert("Sai thông tin tài khoản");
  }
  
});
