const productGrid = document.getElementById("product-grid")
if (productGrid) {
    console.log("Kunde hitta product-grid");
}

fetch("http://localhost:8080/api/v1/allProduct", {
    method: "GET" ,
    headers: {
        "Content-Type": "application/json"
    },
})
.then(response => {
    if (!response.ok) {
        throw new Error("Kunde ej nå server");
    }
    return response.json();
})
.then(data => {
    console.log("Produkter hämtade: ", data);
    displayProducts(data);

})
.catch(error => {
    console.error("Kunde ej hämta produkter")
});

function displayProducts(products) {
    

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-card');
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Pris: ${product.price} kr</p>
            <p>Beskrivning: ${product.description}</p>
            <button onclick="addToCart(${product.id})">Lägg till i kundvagn</button>
        `;
        productGrid.appendChild(productElement); 
        if (productElement) {
        console.log('productElement hittades');
    }
    });
}
