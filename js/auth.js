function login(){

let username=document.getElementById("username").value;

let password=document.getElementById("password").value;

if(username==="admin" && password==="123456"){

alert("Login Berhasil");

window.location.href="dashboard.html";

}else{

document.getElementById("pesan").innerHTML="Username atau Password Salah!";

}

}