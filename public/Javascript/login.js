let loginForm = document.getElementById("login-form")
loginForm.addEventListener('submit', loginSubmit)

console.log("Login script loaded")

async function loginSubmit(e) {
    console.log("Login form submitted")
    e.preventDefault();

    
    
    const username = document.getElementById("username").value
    const passkey = document.getElementById("passkey").value
    const route = '/user/login'


    
    try{
        
        console.log("Requesting fetch for login")

        const response = await fetch(`http://localhost:3500${route}`, { 
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({username, passkey}),
        credentials: 'include'
    })

    if (response.ok) {
            console.log("Login successful")
            window.location.href = "story.html"
    }   else {
            const errorData = await response.json()
            console.log("Login failed: " + errorData.message)
    }
    }

    catch(err) {
        console.error("Fetch error:", err)
    }

    
}