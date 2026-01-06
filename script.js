let cart = [];

function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.length;
}

function addToCart(name, price) {
    cart.push({name, price});
    updateCartCount();
    alert(name + " added to cart!");
}

function displayCart() {
    let table = document.getElementById("cart-table");
    let total = 0;

    // Clear previous rows except header
    table.innerHTML = `<tr>
        <th>Product</th>
        <th>Price</th>
        <th>Remove</th>
    </tr>`;

    cart.forEach((item, index) => {
        let row = table.insertRow();
        row.insertCell(0).innerText = item.name;
        row.insertCell(1).innerText = "?" + item.price;
        row.insertCell(2).innerHTML = `<button onclick="removeFromCart(${index})">Remove</button>`;
        total += item.price;
    });

    document.getElementById("total-price").innerText = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
    updateCartCount();
}

// COD form submission
if(document.getElementById("checkout-form")){
    document.getElementById("checkout-form").addEventListener("submit", function(e){
        e.preventDefault();
        let name = document.getElementById("name").value;
        document.getElementById("confirmation-msg").innerText = `Thank you ${name}! Your COD order has been placed.`;
        cart = [];
        updateCartCount();
    });
}

// Auto display cart page
if(document.getElementById("cart-table")){
    displayCart();
}
