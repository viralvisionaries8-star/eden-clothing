// ==========================================
// EDEN CLOTHING — SHOPPING CART
// ==========================================

const CART_KEY = "edenCart";

// Get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

// Save cart
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Update cart count in navigation
function updateCartCount() {
    const cart = getCart();

    const count = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    document.querySelectorAll(".cart-count").forEach(element => {
        element.textContent = count;
    });
}

// Add product to cart
function addToCart(product) {
    const cart = getCart();

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartCount();

    alert(product.name + " added to your cart!");
}

// Automatically add Add to Cart buttons to product cards
function setupProductButtons() {
    const productCards = document.querySelectorAll(".shop-product-card");

    productCards.forEach((card, index) => {
        if (card.querySelector(".add-to-cart-btn")) return;

        const name = card.querySelector("h3")?.textContent.trim();
        const priceText = card.querySelector(".shop-product-price")?.textContent || "";
        const price = Number(priceText.replace(/[^\d.]/g, ""));
        const image = card.querySelector("img")?.src;

        if (!name || !price || !image) return;

        const product = {
            id: "eden-product-" + (index + 1),
            name,
            price,
            image
        };

        const button = document.createElement("button");
        button.className = "add-to-cart-btn";
        button.type = "button";
        button.textContent = "ADD TO CART +";

        button.addEventListener("click", () => {
            addToCart(product);
        });

        card.appendChild(button);
    });
}

// Render cart page
function renderCart() {
    const cartItemsContainer = document.getElementById("cartItems");
    const cartSubtotal = document.getElementById("cartSubtotal");
    const cartTotal = document.getElementById("cartTotal");
    const emptyMessage = document.getElementById("emptyCart");
    const checkoutSection = document.getElementById("checkoutSection");

    if (!cartItemsContainer) return;

    const cart = getCart();

    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        emptyMessage.style.display = "block";
        checkoutSection.style.display = "none";
        cartSubtotal.textContent = "₹0";
        cartTotal.textContent = "₹0";
        updateCartCount();
        return;
    }

    emptyMessage.style.display = "none";
    checkoutSection.style.display = "block";

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;

        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";

        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">

            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>

                <div class="quantity-controls">
                    <button type="button" class="decrease">−</button>
                    <span>${item.quantity}</span>
                    <button type="button" class="increase">+</button>
                </div>

                <button type="button" class="remove-item">
                    Remove
                </button>
            </div>

            <strong>₹${item.price * item.quantity}</strong>
        `;

        itemElement.querySelector(".increase").addEventListener("click", () => {
            changeQuantity(item.id, 1);
        });

        itemElement.querySelector(".decrease").addEventListener("click", () => {
            changeQuantity(item.id, -1);
        });

        itemElement.querySelector(".remove-item").addEventListener("click", () => {
            removeFromCart(item.id);
        });

        cartItemsContainer.appendChild(itemElement);
    });

    cartSubtotal.textContent = "₹" + subtotal;
    cartTotal.textContent = "₹" + subtotal;

    updateCartCount();
}

// Change quantity
function changeQuantity(productId, amount) {
    let cart = getCart();

    const product = cart.find(item => item.id === productId);

    if (!product) return;

    product.quantity += amount;

    if (product.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    }

    saveCart(cart);
    renderCart();
}

// Remove product
function removeFromCart(productId) {
    const cart = getCart().filter(item => item.id !== productId);

    saveCart(cart);
    renderCart();
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    setupProductButtons();
    updateCartCount();
    renderCart();
});