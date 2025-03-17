const buyBtn = document.querySelector(".buy-button")
const api = "http://localhost:8080/api/v1";
let productId;


function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get("name"),
        price: params.get("price"),
        image: params.get("image"),
        roastLevel: params.get("roastLevel"),
        originCountry: params.get("originCountry"),
        description: params.get("description"),
        id: params.get("productId"),
        userId: params.get("userId") 

    };
}

console.log(getQueryParams());

document.addEventListener("DOMContentLoaded", () => {
    const { name, price, image, roastLevel, originCountry, description, id, userId } = getQueryParams();
    console.log(id);
    productId = id;
    if (name && price && image) {
        document.getElementById("product-name").textContent = name;
        document.getElementById("product-price").textContent = price + " :-";
        document.getElementById("product-image").src = image;
    }

    if (roastLevel) {
        document.getElementById("product-roast").textContent = `Rostnivå: ${roastLevel}`;
    }

    if (originCountry) {
        document.getElementById("product-origin").textContent = `Ursprungsland: ${originCountry}`;
    }

    if (description) {
        document.getElementById("product-description").textContent = description;
    }
    console.log(`Ursprungsland: ${originCountry}`);
    console.log(image);
    console.log(name);
    console.log(userId);
});

async function addToCart(id, userId) {
    try {
        const response = await fetch(`${api}/cartItem/add?productId=${id}&amount=1&userId=${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("user")}`
            },

            });
        
            console.log('Response status:', response.status);
            const responseText = await response.text();
            console.log('Response body:', responseText);
        
            if (response.ok) {
                const data = JSON.parse(responseText);
                console.log('Product added to cart:', data);
                alert('Product added to cart successfully!');
            } else {
                console.error('Failed to add product to cart');
                alert('Failed to add product to cart. Please try again.');
            }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the product to the cart. Please try again.');
        }
    }

buyBtn.addEventListener("click", () => {
    const userId = localStorage.getItem("userId");
    console.log(userId);
    addToCart(productId,userId);
});

