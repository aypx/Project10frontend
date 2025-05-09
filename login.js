async function getLogin() {
    
    const userInput = document.getElementById("username-input").value;
    const passInput = document.getElementById("password-input").value;
    
    const response = await fetch('http://localhost:3001/login', {
        method: "POST",
        body: JSON.stringify({
            username: userInput,
            password: passInput
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const auth = await response.json();
    
    if (auth.token) {
        localStorage.setItem("authToken", auth.token);
        window.location.href = "create.html";
    }
}