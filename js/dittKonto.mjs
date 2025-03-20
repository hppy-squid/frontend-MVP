const userInfoForm = document.getElementById('user-info-form');
const api = 'http://localhost:8080/api/v1'; 
const deleteUserBtn = document.getElementById("delete-btn");

// Laddar användarinformation från localStorage när sidan laddas
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        document.getElementById('firstName').value = user.firstName || '';
        document.getElementById('lastName').value = user.lastName || '';
        document.getElementById('email').value = user.email || '';
        document.getElementById('homeAdress').value = user.adress || '';
        document.getElementById('areaCode').value = user.postCode || '';
    }
});

// Funktion för att uppdatera användarinformation
async function updateUserInfo(event) {
    event.preventDefault();
    
    // Hämtar alla formulärvärden
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("changePassword").value;
    const userId = localStorage.getItem("userId");
    const adress = document.getElementById("homeAdress").value;
    const areaCode = document.getElementById("areaCode").value;

    // Kontrollerar om användaren är inloggad
    if (!userId) {
        console.error('No user ID found in localStorage');
        alert('Please log in to update your profile');
        return;
    }

    try {
        console.log('Attempting to update user:', userId);
        // Skickar en PUT-förfrågan till API:et för att uppdatera användarinformationen
        const response = await fetch(`${api}/users/update/${userId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

            // Konverterar data till JSON och hanterar tomma fält
           body: JSON.stringify({
                firstName: firstName || null,
                lastName: lastName || null,
                email: email || null,
                password: password || null,
                adress: adress || null,
                postCode: areaCode || null
    })


        });

        const responseData = await response.json();

        if (response.ok) {
            console.log('Profile updated successfully:', responseData);
            alert(responseData.message || 'Profile updated successfully!');
        } else {
            alert('Failed to update profile');
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('An error occurred while updating your profile');
    }
}

// Lägger till event listener för formuläret om det finns i DOM
if (userInfoForm) {
    userInfoForm.addEventListener("submit", updateUserInfo);
} else {
    console.error('User info form not found in DOM');
}

// Funktion för att ta bort användaren
async function deleteUser(event) {
    event.preventDefault();

    // Verifierar att användaren är inloggad via localStorage
    const userId = localStorage.getItem("userId");
    if (!userId) {
        console.error('No user ID found in localStorage');
        alert('Please log in to delete your account');
        return;
    }

    // Frågar användaren om de verkligen vill ta bort sitt konto
    const confirmDelete = confirm("Vill du verkligen ta bort ditt konto? Detta val går ej att ångra.");
    if (!confirmDelete) {
        alert('Handlingen är avbruten');
        return;
    }

    // Skickar en DELETE-förfrågan till API:et för att ta bort användaren
    try {
        const response = await fetch(`${api}/users/delete/${userId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (response.ok) {
            console.log('User deleted successfully');
            alert('Ditt konto har tagits bort');
            // Tar bort användarinformationen från localStorage
            localStorage.removeItem('user');
            localStorage.removeItem('userId');
            localStorage.removeItem('JSESSIONID');
            window.location.href = '/';
        } else {
            alert('Failed to delete account');
        }
    } catch (error) {
        console.error('Error deleting account:', error);
        alert('An error occurred while deleting your account');
    }
}

if (deleteUserBtn) {
    deleteUserBtn.addEventListener('click', deleteUser);
} else {
    console.error('Delete user button not found in DOM');
}



