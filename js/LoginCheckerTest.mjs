
const api = "http://localhost:8080/api/v1";
const loginContainer = document.getElementById("login-container");
const loginBtn = document.getElementById("login-btn");
const loginForm = document.getElementById("login-form");



// Funktion som visar login-formuläret när login-knappen klickas
export function loginContainerEvent() {
    loginBtn.addEventListener("click", () => {
        loginContainer.style.display = "block";
    });
}

// Funktion som hanterar login-formuläret när det skickas
export async function loginFormEvent() {
    loginForm.addEventListener("submit", async (event) => {
         // Förhindrar standardbeteendet för formulär
        event.preventDefault();
    
        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;
    
    
        console.log('Attempting login with:', { email });
    
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);
    
        try {
            // Skickar en POST-förfrågan till API:et för att logga in användaren
            const response = await fetch(`${api}/auth/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                },
                body: formData.toString()
            });
    
            console.log('Response status:', response.status);
            const responseText = await response.text();
            console.log('Response body:', responseText);
    
            if (response.ok) {
                const data = JSON.parse(responseText);
                console.log('Login successful:', data);
                loginContainer.style.display = "none";
                loginBtn.textContent = "Logout";
                 // Sparar användardata i localStorage
                localStorage.setItem('user', JSON.stringify(data.data));
                localStorage.setItem('userId', data.data.userId);
                window.location.reload();
               
            } else {
                console.error('Login failed');
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login.');
        }
    });
}

// Funktion som stänger login-formuläret när det klickas utanför formuläret
export function loginContainerClose() {
    window.addEventListener("click", (event) => {
        if (event.target === loginContainer) {
            loginContainer.style.display = "none";
        }
    });
}

// Funktion som kontrollerar om användaren är inloggad
export async function checkLoginStatus() {
    try {
        // Skickar en GET-förfrågan till API:et för att kontrollera om användaren är inloggad
        const response = await fetch(`${api}/auth/loggedInUser`, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        console.log('Response status:', response.status);
        const responseText = await response.text();
        console.log('Response body:', responseText);
        
        if (response.ok) {
            const data = JSON.parse(responseText);
            loginBtn.textContent = "Logout";
            localStorage.setItem('user', JSON.stringify(data.data));
            document.getElementById("hide-form").style.display = "none";
           
        } else {
            document.getElementById("hide-konto").style.display = "none";

        }
    } catch (error) {
        console.error('Error checking login status:', error);
        localStorage.removeItem('user');
        loginBtn.textContent = "Login";
       
    }
}

// Funktion som loggar ut användaren
export async function logout(){
    loginBtn.addEventListener("click", async () => {
        // Kontrollerar om användaren är inloggad
        if(loginBtn.textContent === "Logout"){
            try {
                // Skickar en POST-förfrågan till API:et för att logga ut användaren
                const response = await fetch(`${api}/auth/logout`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if(response.ok){
                    // Tar bort användarinformationen från localStorage
                    localStorage.removeItem('user');
                    localStorage.removeItem('userId');
                    localStorage.removeItem('JSESSIONID');
                    loginBtn.textContent = "Login";
                    window.location.reload();
                   
                } else {
                    console.error('Logout failed');
                    alert('Logout failed. Please try again.');
                }
            } catch (error) {
                console.error('Error during logout:', error);
                alert('An error occurred during logout.');
            }
        }
    });
}


