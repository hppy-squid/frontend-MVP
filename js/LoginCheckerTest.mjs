const api = "http://localhost:8080/api/v1";
const loginContainer = document.getElementById("login-container");
const loginBtn = document.getElementById("login-btn");
const loginForm = document.getElementById("login-form");




export function loginContainerEvent() {
    loginBtn.addEventListener("click", () => {
        loginContainer.style.display = "block";
    });
}

export async function loginFormEvent() {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
    
        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;
    
    
        console.log('Attempting login with:', { email });
    
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);
    
        try {
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
                localStorage.setItem('user', JSON.stringify(data.data));
                localStorage.setItem('userId', data.data.userId);
               
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



export function loginContainerClose() {
    window.addEventListener("click", (event) => {
        if (event.target === loginContainer) {
            loginContainer.style.display = "none";
        }
    });
}


export async function checkLoginStatus() {
    try {
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

            document.getElementById("hide-konto").style.display = "block";
            document.getElementById("hide-form").style.display = "none";
           

            

        }
    } catch (error) {
        console.error('Error checking login status:', error);
        localStorage.removeItem('user');
        loginBtn.textContent = "Login";
       
    }
}
// document.addEventListener("DOMContentLoaded", () => {
//     checkLoginStatus();
// });



// Call on page load
