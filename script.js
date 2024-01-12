
const productsContainer = document.querySelector(".productContainer");

function renderProducts(fetchData) {
    let itemList = fetchData.category_products;

    itemList.forEach((product) => {
        renderProduct(product.image, product.title, product.price, fetchData.category_name,product.compare_at_price,product.vendor);
    });
}

const renderProduct = (img, title, price, category,compare,vendor) => {
   let discount =parseInt(compare)-parseInt(price)
   let discountPercentage =Math.floor((discount/parseInt(compare))*100,2)

    let productCard = document.createElement("div");
    productCard.classList.add("productCard", category); 

    productsContainer.appendChild(productCard);

    let productImg = document.createElement("img");
    productImg.src = img;
    productImg.classList.add("card-img");
    productCard.appendChild(productImg);

    let productTitle = document.createElement("h3");
    productTitle.textContent = title;
    productTitle.classList.add("title");
    productCard.appendChild(productTitle);
    
    let priceContainer = document.createElement("div");
    priceContainer.classList.add("priceContainer");
    productCard.appendChild(priceContainer);



    let productPrice = document.createElement("p");
    productPrice.textContent = `RS ${price}`;
    productPrice.classList.add("price");
    priceContainer.appendChild(productPrice);
 

    let comparePrice = document.createElement("span");
    comparePrice.textContent = `RS ${compare}`;
    comparePrice.classList.add("compare-price");
    priceContainer.appendChild(comparePrice);


    let discountPrice = document.createElement("span");
    discountPrice.textContent = `${discountPercentage}% Off`;
    discountPrice.classList.add("discount-price");
    priceContainer.appendChild(discountPrice);

    let buyContainer = document.createElement("div");
    buyContainer.classList.add("buyContainer");
    productCard.appendChild(buyContainer);

    let wishList = document.createElement("span");
    wishList.innerHTML = vendor;
    wishList.classList.add("wishList");
    buyContainer.appendChild(wishList);

    let addToCart = document.createElement("button");
    addToCart.classList.add("add-to-cart");
    addToCart.textContent = "Add To Cart";
    buyContainer.appendChild(addToCart);
};

let url = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";

async function fetchData(categoryToFilter) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const categories = data.categories;


        productsContainer.innerHTML = "";

        for (let i = 0; i < categories.length; i++) {
            if (categories[i].category_name === categoryToFilter) {
                let fetchData = categories[i];
                renderProducts(fetchData);
                break; 
            }
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
