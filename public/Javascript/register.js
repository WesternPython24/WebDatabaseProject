let registerForm = document.getElementById("register-form")
registerForm.addEventListener("submit", registerAttempt)

console.log('Register script loaded')

async function registerAttempt(e) {
    e.preventDefault()
    
    const email = document.getElementById("email").value
    const username = document.getElementById("username").value
    const passkey = document.getElementById("passkey").value
    
    const route = '/user/register'

    try {

        console.log('Attempting fetch for registering user')

        const response = await fetch(`http://localhost:3500${route}`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, username, passkey}),
            credentials: 'include'
        })

        if (response.ok) {
            console.log('Registration successful')
            window.location.href = "story.html"
        }
    
        else {
            const errorData = await response.json()
            console.log('Registration Failed:', errorData.message)
        }

     } catch(err) {
        console.error('Fetch error:', err)
     }
}