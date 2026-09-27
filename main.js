

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartBox = document.getElementById("cartBox");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");
const addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const product = {
            name: name,
            price: price
        };

        cart.push(product);

        saveCart();

        showCart();

        showToast("تم إضافة المنتج إلى السلة 🛒");

    });

});

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

}

function showCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((product, index) => {

        total += product.price;

        const item = document.createElement("div");

        item.classList.add("cart-item");

        item.innerHTML = `
         <div> <h4>${product.name}</h4>
          <span>${product.price} جنيه</span> </div>
            <button
                class="remove-item"
                onclick="removeItem(${index})">
                حذف
            </button>
        `;

        cartItems.appendChild(item);

    });

    totalPrice.textContent = total;

}
function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    showCart();

    showToast("تم حذف المنتج");

}
document.querySelector(".cart").addEventListener("click", () => {

    cartBox.classList.add("active");

    showCart();

});

document.getElementById("closeCart").addEventListener("click", () => {

    cartBox.classList.remove("active");

});

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}
document.getElementById("checkout").addEventListener("click", () => {

    if (cart.length === 0) {

        alert("السلة فارغة!");

        return;

    }

    alert("تم استلام طلبك بنجاح ❤️");

    cart = [];

    saveCart();

    showCart();

});
const searchInput = document.querySelector(".search input");

searchInput.addEventListener("input", () => {

    const searchValue = searchInput.value.toLowerCase();

    const products = document.querySelectorAll(".product");

    products.forEach(product => {

        const productName =
            product.dataset.name.toLowerCase();

        if (productName.includes(searchValue)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

});

