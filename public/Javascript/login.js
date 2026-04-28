let loginForm = document.getElementById("login-form")
loginForm.addEventListener('submit', loginSubmit)
function loginSubmit(e) {
    e.preventDefault();
    const loginAttempt = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    
    }
    console.log("Login Attempt: ", loginAttempt);
    

}