const productGrid = document.getElementById("product-grid")
let allProducts = []; 

//hämtar alla produkter från backend
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
    allProducts = data;
    allProducts = data;
    displayProducts(data);
    displayProducts(allProducts);

})
.catch(error => {
    console.error("Kunde ej hämta produkter")
});

function displayProducts(products) {
    productGrid.innerHTML = "";
    

    //hämtar alla produkter i databas och listar ut dem som kort på produktsidan.
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-card');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price} kr</p>
            <p>${product.roastLevel}</p>
            <p>${product.originCountry}</p>
            <button class="addToCartBtn" onclick="addToCart(${product.id})">🛒</button>
        `;

        productGrid.appendChild(productElement);
        productElement.addEventListener('click', () => {
            goToProduct(
                product.name, 
                product.price, 
                product.image, 
                product.roastLevel, 
                product.originCountry, 
                product.description,
                product.id
            );
        });
        if (productElement) {
        console.log('productElement hittades');
    }
    });
}
//filter
document.addEventListener("DOMContentLoaded", () => {
    let roastLevel = "All";
    let originCountry = "All";

    document.querySelectorAll(".roast-filter").forEach(button => {
        button.addEventListener("click", () => {
            roastLevel = button.dataset.filter;
            filterProducts(roastLevel, originCountry);
        });
    });

    document.querySelectorAll(".country-filter").forEach(button => {
        button.addEventListener("click", () => {
            originCountry = button.dataset.country;
            filterProducts(roastLevel, originCountry);
        });
    });
});

//filter
function filterProducts(roastCategory, countryCategory) {
    let products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        const roastLevel = product.querySelector('p:nth-child(4)').textContent.trim();
        const originCountry = product.querySelector('p:nth-child(5)').textContent.trim();

        const matchRoast = roastCategory === "All" || roastLevel.includes(roastCategory);
        const matchCountry = countryCategory === "All" || originCountry.includes(countryCategory);

        if (matchRoast && matchCountry) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".filters input[type='text']");

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = allProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });

});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".filters button:nth-child(3)").addEventListener("click", () => {
        displayProducts([...allProducts].sort((a, b) => a.price - b.price));
    });

    document.querySelector(".filters button:nth-child(4)").addEventListener("click", () => {
        displayProducts([...allProducts].sort((a, b) => b.price - a.price));
    });

});

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".filters input[type='text']");

    searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = allProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });

});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".filters button:nth-child(3)").addEventListener("click", () => {
        displayProducts([...allProducts].sort((a, b) => a.price - b.price));
    });

    document.querySelector(".filters button:nth-child(4)").addEventListener("click", () => {
        displayProducts([...allProducts].sort((a, b) => b.price - a.price));
    });

});


//skapar länkar till varje produkts detaljsida
function goToProduct(name, price, image, roastLevel, originCountry, description, id) {
    const userId = localStorage.getItem("userId");
    const url = `detalj.html?name=${encodeURIComponent(name)}
        &price=${encodeURIComponent(price)}
        &image=${encodeURIComponent(image)}
        &roastLevel=${encodeURIComponent(roastLevel)}
        &originCountry=${encodeURIComponent(originCountry)}
        &description=${encodeURIComponent(description)}
        &productId=${encodeURIComponent(id)}
        &userId=${encodeURIComponent(userId)}`;
    window.location.href = url;
}

