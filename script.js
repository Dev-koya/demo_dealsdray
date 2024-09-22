let loginPageEl = document.getElementById("loginPage");
let username = document.getElementById("username");
let validpassword = document.getElementById("validpassword");

let usernameErrMsg = document.getElementById("usernameErrMsg");
let validpasswordErrMsg = document.getElementById("validpasswordErrMsg");

const validUser = {
    username: "admin",  
    password: "admin" 
};

username.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        usernameErrMsg.textContent = "Required*";
    } else {
        usernameErrMsg.textContent = "";
    }
});

validpassword.addEventListener("blur", function(event) {
    if (event.target.value === "") {
        validpasswordErrMsg.textContent = "Required*";
    } else {
        validpasswordErrMsg.textContent = "";
    }
});

loginPageEl.addEventListener("submit", function(event) {
    event.preventDefault(); 

    let inputUsername = username.value;
    let inputPassword = validpassword.value;

    if (inputUsername === validUser.username && inputPassword === validUser.password) {
        window.location.href = "user.html";
    } else {
        if (inputUsername !== validUser.username) {
            usernameErrMsg.textContent = "Invalid Username";
        } else {
            usernameErrMsg.textContent = "";
        }

        if (inputPassword !== validUser.password) {
            validpasswordErrMsg.textContent = "Invalid Password";
        } else {
            validpasswordErrMsg.textContent = "";
        }
        if (inputUsername !== validUser.username || inputPassword !== validUser.password) {
            alert("Invalid login details");
        }
    }
});
