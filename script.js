// CART DATA (persistent)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// SAVE CART
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ADD TO CART
function addToCart(name, price) {
    const item = cart.find(p => p.name === name);
    if (item) {
        item.qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    saveCart();
    updateCartCount();
    alert(name + " added to cart");
}

// UPDATE CART COUNT (header)
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll("#cart-count").forEach(el => {
        el.innerText = count;
    });
}

// DISPLAY CART PAGE
function displayCart() {
    const table = document.getElementById("cart-table");
    const totalEl = document.getElementById("total-price");
    if (!table || !totalEl) return;

    table.innerHTML = `
        <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Remove</th>
        </tr>
    `;

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;
        table.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>?${item.price * item.qty}</td>
                <td>
                    <button onclick="removeFromCart(${index})">X</button>
                </td>
            </tr>
        `;
    });

    totalEl.innerText = total;
}

// REMOVE ITEM
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
    updateCartCount();
}

// CHECKOUT SUMMARY
function displaySummary() {
    const list = document.getElementById("summary");
    const totalEl = document.getElementById("summary-total");
    if (!list || !totalEl) return;

    list.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        list.innerHTML += `<li>${item.name} x ${item.qty}</li>`;
        total += item.price * item.qty;
    });

    totalEl.innerText = total;
}

// INIT
updateCartCount();
displayCart();
displaySummary();
