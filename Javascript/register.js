let registerForm = document.getElementById("register-form")
registerForm.addEventListener("submit", registerAttempt)

function registerAttempt(e) {
    e.preventDefault()
    const registerAttempt = {
        email: document.getElementById("email").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    }
    console.log("Register Attempt: ", registerAttempt)
}