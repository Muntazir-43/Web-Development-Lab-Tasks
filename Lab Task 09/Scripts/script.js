let f_name = document.getElementById("fname");
let l_name = document.getElementById("lname");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let password = document.getElementById("password");
let confirm_password = document.getElementById("confirm-password");
let btn = document.getElementById("btn");
let form = document.getElementById("myForm");

btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (validation()) {
        form.submit(); 
    }
});

function error(input, message) {
    let small = input.parentElement.children[2];
    small.innerHTML = message;
    small.className = "error";
    input.style.outline = "2px solid red";
    input.style.border = "none";
    input.style.boxShadow = "0 0 5px rgba(255, 0, 0, 0.5)";
}

function success(input) {
    let small = input.parentElement.children[2];
    input.style.outline = "2px solid green";
    input.style.border = "none";
    small.classList.remove("error");
    input.style.boxShadow = "0 0 5px rgba(0, 128, 0, 0.5)";
    small.innerHTML = "";
}


function validation() {
    let valid = true;

    if (f_name.value.trim() === "") {
        error(f_name, "Enter first name between 3 to 10 characters");
        valid = false;
    } else if (f_name.value.trim().length < 3) {
        error(f_name, "Enter first name of minimum 3 characters");
        valid = false;
    } else if (f_name.value.trim().length > 10) {
        error(f_name, "Enter first name of maximum 10 characters");
        valid = false;
    } else {
        success(f_name);
    }

    if (l_name.value.trim() === "") {
        error(l_name, "Enter last name between 3 to 10 characters");
        valid = false;
    } else if (l_name.value.trim().length < 3) {
        error(l_name, "Enter last name of minimum 3 characters");
        valid = false;
    } else if (l_name.value.trim().length > 10) {
        error(l_name, "Enter last name of maximum 10 characters");
        valid = false;
    } else {
        success(l_name);
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email.value.trim() === "") {
        error(email, "Enter an email");
        valid = false;
    } else if (!emailRegex.test(email.value.trim())) {
        error(email, "Enter a valid email");
        valid = false;
    } else {
        success(email);
    }

    const pkPhoneRegex = /^(?:\+92|0)3[0-9]{9}$/;
    if (phone.value.trim() === "") {
        error(phone, "Enter your phone number");
        valid = false;
    } else if (!pkPhoneRegex.test(phone.value.trim())) {
        error(phone, "Enter a valid Pakistani phone number (e.g., 03001234567 or +923001234567)");
        valid = false;
    } else {
        success(phone);
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
    if (password.value.trim() === "") {
        error(password, "Enter a password");
        valid = false;
    } else if (!passwordRegex.test(password.value.trim())) {
        error(password, "Password must be at least 8 characters and include 1 uppercase letter, 1 digit, and 1 special character");
        valid = false;
    } else {
        success(password);
    }

    if (confirm_password.value.trim() === "") {
        error(confirm_password, "Please confirm your password");
        valid = false;
    } else if (confirm_password.value.trim() !== password.value.trim()) {
        error(confirm_password, "Passwords do not match");
        valid = false;
    } else {
        success(confirm_password);
    }

    return valid;
}

