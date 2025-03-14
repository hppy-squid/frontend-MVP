import { api, loginContainer, loginBtn, loginForm } from './script.mjs';

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
        }
    } catch (error) {
        console.error('Error checking login status:', error);
        localStorage.removeItem('user');
        loginBtn.textContent = "Login";
    }
}


// Call on page load
checkLoginStatus();