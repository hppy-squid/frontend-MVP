console.log("funkar");
const form = document.getElementById("thisForm");
if (form) {
    console.log("Form kopplad korrekt");
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("registerPassword").value;
    const adress = document.getElementById("adress").value;
    const postCode = document.getElementById("postCode").value;

    if (!firstName || !lastName) {
        console.log("First and last name are required");
        return;
    }

    if (!email.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}/)) {
        console.log("Invalid email format");
        return
    }

    if (password.length < 8) {
        console.log("Password must be at least 8 characters long");
        return;
    }

    if (!adress || !postCode) {
        console.log("Adress and postcode are required");
        return;
    }

    const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        adress: adress,
        postCode: postCode
    };

    fetch("http://localhost:8080/api/v1/users/add", {
        method: "POST" ,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Kunde ej nå server");
        }
        return response.json();
    })
    .then(data => {
        console.log("User skapad: ", data);
    })
    .catch(error => {
        console.error("Kunde ej skapa user")
    });

});