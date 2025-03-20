const form = document.getElementById("thisForm");

// Lägger till en EventListener för när formuläret skickas
form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Hämtar alla formulärfält och deras värden
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("registerPassword").value;
    const adress = document.getElementById("adress").value;
    const postCode = document.getElementById("postCode").value;

    // Kontrollerar om förnamn och efternamn är ifyllda
    if (!firstName || !lastName) {
        console.log("First and last name are required");
        return;
    }

    // Kontrollerar om e-postformatet är korrekt
    if (!email.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}/)) {
        console.log("Invalid email format");
        return
    }

    // Kontrollerar om lösenordet är minst 8 tecken långt
    if (password.length < 8) {
        console.log("Password must be at least 8 characters long");
        return;
    }

    // Kontrollerar om adress och postnummer är ifyllda
    if (!adress || !postCode) {
        console.log("Adress and postcode are required");
        return;
    }

    // Skapar en JSON-objekt med användarinformationen
    const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        adress: adress,
        postCode: postCode
    };

    // Skickar en POST-förfrågan till API:et för att skapa en ny användare
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
        // Loggar in användaren
        console.log("User skapad: ", data);
    })
    .catch(error => {
        console.error("Kunde ej skapa user")
    });

});