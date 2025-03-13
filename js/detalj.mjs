
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get("name"),
        price: params.get("price"),
        image: params.get("image"),
        roastLevel: params.get("roastLevel"),
        originCountry: params.get("originCountry"),
        description: params.get("description"),
    };
}

document.addEventListener("DOMContentLoaded", () => {
    const { name, price, image, roastLevel, originCountry, description } = getQueryParams();
    
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
});