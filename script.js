// ==========================================
// Fresh Bake Bakery - Part 3 JavaScript
// ==========================================

// 1. LIGHTBOX GALLERY
function openLightbox(element) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
   
    if (lightbox && lightboxImg) {
        lightbox.style.display = "flex";
        lightboxImg.src = element.src;
        lightboxImg.alt = element.alt || "Bakery Product";
    }
}

   <body>
<!-- Lightbox -->
<div id="lightbox" style="display:none; position:fixed; z-index:1000; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,0.9); align-items:center; justify-content:center;">
    <span class="close-lightbox" style="position:absolute; top:20px; right:30px; color:white; font-size:50px; cursor:pointer;">&times;</span>
    <img id="lightbox-img" style="max-width:90%; max-height:90%; border-radius:12px;" alt="">
</div>

   </body>

function closeLightbox(event) {
    const lightbox = document.getElementById("lightbox");
    if (!lightbox) return;
   
    if (event.target === lightbox || event.target.classList.contains("close-lightbox")) {
        lightbox.style.display = "none";
    }
}

// 2. FORM VALIDATION & SUBMISSION
function validateAndSubmitForm(form, formType) {
    if (!form) return;

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        
        // Clear old errors
        const existingErrors = form.querySelectorAll(".error-msg");
        existingErrors.forEach(msg => msg.remove());
        
        let isValid = true;

        const nameInput = form.querySelector("#name");
        const emailInput = form.querySelector("#email");
        const phoneInput = form.querySelector("#phone");
        const messageInput = form.querySelector("#message");

        // Name validation
        if (nameInput && nameInput.value.trim().length < 3) {
            showError(nameInput, "Name must be at least 3 characters");
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput && !emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, "Please enter a valid email address");
            isValid = false;
        }

        // Phone validation (optional but 10 digits if filled)
        if (phoneInput && phoneInput.value.trim() !== "") {
            if (!/^\d{10}$/.test(phoneInput.value.trim())) {
                showError(phoneInput, "Phone number must be 10 digits");
                isValid = false;
            }
        }

        if (isValid) {
            alert(`✅ Thank you! Your ${formType} has been received.\n\n(For demo purposes - in real project this would send an email)`);
            form.reset();
        }
    });
}

function showError(input, message) {
    const error = document.createElement("p");
    error.className = "error-msg";
    error.style.color = "red";
    error.style.fontSize = "0.9em";
    error.textContent = message;
    input.parentNode.appendChild(error);
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Fresh Bake Bakery JavaScript Loaded Successfully!");

    // Lightbox close event
    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
        lightbox.addEventListener("click", closeLightbox);
    }

    // Dynamic Products + Search (Menu Page)
    const productGrid = document.querySelector(".product-grid");
    const searchInput = document.getElementById("product-search");

    const bakeryProducts = [
        { name: "Fresh Bread Loaves", price: "R45 – R68", img: "images/bread.jpg", alt: "Freshly baked bread loaves", category: "bread" },
        { name: "Celebration Cakes", price: "From R295", img: "images/cakes.jpg", alt: "Custom celebration cakes", category: "cakes" },
        { name: "Pastries & Croissants", price: "R28 – R48 each", img: "images/pastries.jpg", alt: "Assorted fresh pastries", category: "pastries" },
        { name: "Cookies & Biscuits", price: "R125 per dozen", img: "images/cookies.jpg", alt: "Freshly baked cookies", category: "cookies" }
    ];

    function displayProducts(productsToRender) {
        if (!productGrid) return;
        productGrid.innerHTML = "";

        productsToRender.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
                <img src="${product.img}" alt="${product.alt}" onclick="openLightbox(this)" style="cursor:pointer;">
                <div style="padding:22px;">
                    <h3>${product.name}</h3>
                    <p>${product.price}</p>
                    <a href="contact.html" class="btn">Order Now</a>
                </div>
            `;
            productGrid.appendChild(card);
        });
    }

    if (productGrid) {
        displayProducts(bakeryProducts);
    }

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();
            const filtered = bakeryProducts.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.alt.toLowerCase().includes(query)
            );
            displayProducts(filtered);
        });
    }

    // Form Validation
    const contactForm = document.getElementById("contactForm");
    const enquiryForm = document.getElementById("enquiryForm");

    if (contactForm) validateAndSubmitForm(contactForm, "Contact Message");
    if (enquiryForm) validateAndSubmitForm(enquiryForm, "Enquiry");
});


// Check if the map element exists on the page
if (document.getElementById('map')) {
    // Coordinates for Hatfield, Pretoria (-25.7483, 28.2381)
    const bakeryLocation = [-25.7483, 28.2381]; 
    
    // Initialize map and set zoom level to 15
    const map = L.map('map').setView(bakeryLocation, 15);

    // Load OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker for Fresh Bake Bakery
    L.marker(bakeryLocation).addTo(map)
        .bindPopup('<b>Fresh Bake Bakery</b><br>Hatfield, Pretoria.<br>Warm bread daily!')
        .openPopup();
}

document.querySelectorAll('.accordion-header').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    item.classList.toggle('active');
  });
});

function filterProducts() {
  const input = document.getElementById('productSearch').value.toLowerCase();
  const productCards = document.querySelectorAll('.product-card'); // use your actual class name

  productCards.forEach(card => {
    const title = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
    card.style.display = title.includes(input) ? '' : 'none';
  });
}

// Add event listener
document.getElementById('productSearch').addEventListener('keyup', filterProducts);

// Product Search/Filter Functionality
function filterProducts() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase().trim();
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.textContent.toLowerCase(); // searches price too

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = '';           // show
            card.style.animation = 'fadeInUp 0.5s'; // optional nice effect
        } else {
            card.style.display = 'none';       // hide
        }
    });
}

// Initialize search when page loads
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('productSearch');
    if (searchInput) {
        searchInput.addEventListener('keyup', filterProducts);
    }
});

// Enquiry Form Validation & Submission
const enquiryForm = document.getElementById('enquiryForm');

if (enquiryForm) {
  enquiryForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    // Simple validation
    if (name.value.trim().length < 3) {
      alert("Please enter your full name");
      isValid = false;
    }

    if (!email.value.includes('@') || !email.value.includes('.')) {
      alert("Please enter a valid email address");
      isValid = false;
    }

    if (message.value.trim().length < 10) {
      alert("Please provide more details in your message");
      isValid = false;
    }

    if (isValid) {
      // Success message / Modal
      alert("✅ Thank you! Your enquiry has been received.\n\nWe will contact you within 24 hours.");
      
      // Optional: Reset form
      enquiryForm.reset();
      
      // In a real project you could send via AJAX / EmailJS
    }
  });
}

// ==================== PRODUCT SEARCH FILTER ====================
function filterProducts() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase().trim();
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const text = card.textContent.toLowerCase();

        if (title.includes(searchTerm) || text.includes(searchTerm)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Initialize search
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('productSearch');
    if (searchInput) {
        searchInput.addEventListener('keyup', filterProducts);
    }
});

// ==================== ACCORDION FAQ ====================
document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        item.classList.toggle('active');
    });
});