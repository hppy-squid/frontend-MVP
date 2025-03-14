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

    const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
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