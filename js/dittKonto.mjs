const userInfoForm = document.getElementById('user-info-form');
const api = 'http://localhost:8080/api/v1'; 

document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        document.getElementById('firstName').value = user.firstName || '';
        document.getElementById('lastName').value = user.lastName || '';
        document.getElementById('email').value = user.email || '';
    }
});

async function updateUserInfo(event) {
    event.preventDefault();
    
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("changePassword").value;
    const userId = localStorage.getItem("userId");

    if (!userId) {
        console.error('No user ID found in localStorage');
        alert('Please log in to update your profile');
        return;
    }

    try {
        console.log('Attempting to update user:', userId);
        const response = await fetch(`${api}/users/update/${userId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
           body: JSON.stringify({
                firstName: firstName || null,
                lastName: lastName || null,
                email: email || null,
                password: password
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

if (userInfoForm) {
    userInfoForm.addEventListener("submit", updateUserInfo);
} else {
    console.error('User info form not found in DOM');
}
