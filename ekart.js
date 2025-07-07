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



const allProductsData = [
      {
        name: "TOPLOT Shirt",
        price: 599,
        category: "men",
        image: "./blackshirtmen.jpg",
        description: "High-quality men's Casual Stylish Fashion shirt.",
        link: "ekview2.html",
        mrp: 1999,
        discount: "86% off"
      },
      {
        name: "Trijal Fab Top",
        price: 399,
        category: "women",
        image: "./modernss.jpg",
        description: "High-quality Dyed Georgette Women’s Events.",
        link: "ekview1.html",
        mrp: 1299,
        discount: "75% off"
      },
      {
        name: "Kids Wear",
        price: 499,
        category: "kids",
        image: "./babygirlssssss.webp",
        description: "High-quality kids fashion dress for stylish.",
        link: "ekview3.html",
        mrp: 1799,
        discount: "56% off"
      },
      {
        name: "Lymio Shirt",
        price: 699,
        category: "men",
        image: "./mnswear.webp",
        description: "High-quality Casual Regular Fit Shirt for Men.",
        link: "ekview4.html",
        mrp: 1999,
        discount: "76% off"
      },
      {
        name: "Fashion Top",
        price: 999,
        category: "women",
        image: "./frockwear.jpg",
        description: "High-quality fashion dress for womens.",
        link: "ekview5.html",
        mrp: 2999,
        discount: "83% off"
      },
      {
        name: "TOPLOT Shirt",
        price: 599,
        category: "men",
        image: "./blackshirtmen.jpg",
        description: "High-quality men's Casual Stylish Fashion shirt.",
        link: "ekview2.html",
        mrp: 1999,
        discount: "86% off"
      },
      {
        name: "Trijal Fab Top",
        price: 399,
        category: "women",
        image: "./modernss.jpg",
        description: "High-quality Dyed Georgette Women’s Events.",
        link: "ekview1.html",
        mrp: 1299,
        discount: "75% off"
      },
      {
        name: "Kids Wear",
        price: 499,
        category: "kids",
        image: "./babygirlssssss.webp",
        description: "High-quality kids fashion dress for stylish.",
        link: "ekview3.html",
        mrp: 1799,
        discount: "56% off"
      }
    ];

    function createProductCard(p) {
      const card = document.createElement("div");
      card.className = "product-card product";
      card.dataset.category = p.category;
      card.dataset.price = p.price;

      card.innerHTML = `
        <div class="wishlist-icon" onclick="toggleWishlist(this, '${p.name}')"><i class="far fa-heart"></i></div>
        <a href="${p.link}" class="product-link">
          <img src="${p.image}" />
          <h3>${p.name}</h3>
          <p class="product-description">${p.description}</p>
          <span class="price">₹${p.price}</span>
          <span class="mrp">₹${p.mrp}</span>
          <span class="discount">${p.discount}</span>
        </a>
        <button onclick="addToCart('${p.name}', ${p.price}, this)">Add to Cart</button>
      `;
      return card;
    }

    function searchproducts() {
      applyFilters();  
    }

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

 
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = total;
}

function updateWishlistCount() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  document.getElementById("wishlist-count").textContent = wishlist.length;
}

 
function addToCart(name, price, button) {
  const card = button.closest(".product-card");
  const image = card.querySelector("img").getAttribute("src"); 

  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  const index = cart.findIndex(item => item.name === name);

  if (index === -1) {
    cart.push({ name, price, image, quantity: 1 });
    showToast(`${name} added to cart!`);
  } else {
    cart[index].quantity += 1;
    showToast(`${name} quantity increased!`);
  }

  localStorage.setItem("cartItems", JSON.stringify(cart));
  updateCartCount();
}


 
function toggleWishlist(icon, name) {
  const card = icon.closest(".product-card");
  const price = parseInt(card.dataset.price);
  const image = card.querySelector("img").getAttribute("src");
  const mrp = parseInt(card.querySelector(".mrp").innerText.replace("₹", ""));

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const existingIndex = wishlist.findIndex(item => item.name === name);

  const heart = icon.querySelector("i");
  heart.classList.toggle("fa-solid");
  heart.classList.toggle("fa-regular");
  heart.classList.toggle("active");

  if (existingIndex !== -1) {
    wishlist.splice(existingIndex, 1);
    showToast(`${name} removed from wishlist`);
  } else {
    wishlist.push({ name, price, image, mrp });
    showToast(`${name} added to wishlist`);
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateWishlistCount();
}



    const itemsPerPage = 5;
    let currentPage = 1;
    let filteredProducts = [];

    function applyFilters() {
      const search = document.getElementById("searchInput").value.toLowerCase();
      const category = document.getElementById("categoryFilter").value.toLowerCase();
      const sort = document.getElementById("sortSelect").value;

      let filtered = allProductsData.filter(p =>
        (category === "all" || p.category.toLowerCase() === category) &&
        p.name.toLowerCase().includes(search)
      );

      if (sort === "low-to-high") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sort === "high-to-low") {
        filtered.sort((a, b) => b.price - a.price);
      }

      currentPage = 1;
      renderProducts(filtered);
    }

    function renderProducts(filtered = allProductsData) {
      filteredProducts = filtered;
      const container = document.querySelector(".products-container");
      container.innerHTML = "";

      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginated = filtered.slice(start, end);
      paginated.forEach(p => container.appendChild(createProductCard(p)));

      renderPagination(filtered.length);
    }

    function changePage(step) {
      const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
      currentPage += step;
      if (currentPage < 1) currentPage = 1;
      if (currentPage > totalPages) currentPage = totalPages;
      renderProducts(filteredProducts);
    }

    function renderPagination(totalItems) {
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      const pagination = document.getElementById("pagination-controls");
      pagination.innerHTML = "";
      document.getElementById("page-info").innerText = `Page ${currentPage} of ${totalPages}`;
      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.className = (i === currentPage) ? "active" : "";
        btn.onclick = () => {
          currentPage = i;
          renderProducts(filteredProducts);
        };
        pagination.appendChild(btn);
      }
    }


    document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartCount();
  updateWishlistCount();
});













