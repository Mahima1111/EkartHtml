 function showForm(formId) {
      ['login', 'signup', 'reset'].forEach(id => {
        document.getElementById(id + '-form').classList.remove('active');
      });
      document.getElementById(formId + '-form').classList.add('active');
    }

    function togglePassword(id,icon) {
    const field = document.getElementById(id);
    if (field.type === 'password') {
    field.type = 'text';
    icon.textContent = '👁️'; 
  } else {
    field.type = 'password';
    icon.textContent = '👁️‍🗨️'; 
  }
    }

    function validateLogin() {
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      const error = document.getElementById("login-error");


  if (!email.includes("@") || !email.includes(".com") || password.length < 6) {
  error.textContent = "Invalid email or password (min 6 characters).";
  return false;
  }
  error.textContent = "";
  alert("Login successful!");
  window.location.href = "ekhome.html"; 
  return false;
    }

    function validateSignup() {
      const name = document.getElementById("signup-name").value;
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;
      const error = document.getElementById("signup-error");

      const namePattern = /^[A-Za-z\s]+$/;

  if (!name || !namePattern.test(name)) {
    error.textContent = "Name must contain letters only.";
    return false;
  }


      if (!name || !email.includes("@") || !email.includes(".com") || password.length < 6) {
        error.textContent = "Please enter valid information.";
        return false;
      }
      error.textContent = "";
      alert("Signup successful!");
      return true;
    }

    function validateReset() {
      const email = document.getElementById("reset-email").value;
      const password = document.getElementById("reset-password").value;
      const confirm = document.getElementById("reset-confirm").value;
      const error = document.getElementById("reset-error");

      if (!email.includes("@") || !email.includes(".com") || password.length < 6 || password !== confirm) {
        error.textContent = "Invalid input or passwords do not match.";
        return false;
      }
      error.textContent = "";
      alert("Password reset successful!");
      return true;
    }

    
let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 5000);

function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
}

  setInterval(nextSlide, 5000);

  function searchProducts() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".product-card");

  cards.forEach(card => {
    const name = card.querySelector("h4").textContent.toLowerCase();
    card.style.display = name.includes(query) ? "block" : "none";
  });
}

function updateCounts() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  document.getElementById("wishlist-count").textContent = wishlist.length;
  document.getElementById("cart-count").textContent = cart.length;
}

updateCounts(); 

function addToCart(name, price, button) {
  const productCard = button.closest(".product-card");
  const image = productCard.querySelector("img").src;

  const item = {
    name,
    price,
    image
  };
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  showToast("✅ Added to Cart");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}


function addToWishlist(icon) {
  const productCard = icon.closest(".product-card");
  const name = productCard.querySelector("h3").textContent;
  const price = parseFloat(productCard.querySelector(".price").textContent.replace("₹", ""));
  const mrp = parseFloat(productCard.querySelector(".mrp").textContent.replace("₹", ""));
  const image = productCard.querySelector("img").src;

  const item = { name, price, mrp, image };

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const index = wishlist.findIndex(w => w.name === name);

  if (index === -1) {
    wishlist.push(item);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    icon.textContent = "❤️";
    showToast("❤️ Added to Wishlist");
  } else {
    wishlist.splice(index, 1);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    icon.textContent = "♡";
    showToast("💔 Removed from Wishlist");
  }

  updateWishlistCount();
}





