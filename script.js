        // Hamburger menu toggle
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
//         let cart = [];
// let cartCount = document.getElementById("cartCount");

// function addToCart(name, price) {
//     cart.push({ name, price });
//     cartCount.textContent = cart.length;
//     alert(name + " added to cart!");
// }


        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Scroll to top button
        const scrollTopBtn = document.getElementById('scrollTop');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Form submission
        const reservationForm = document.getElementById('reservationForm');
reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(reservationForm);
    const data = Object.fromEntries(formData);

    // Construct WhatsApp message
    let message = `Hello! I want to make a reservation:\n`;
    message += `Name: ${data.name}\n`;
    message += `CNIC: ${data.cnic}\n`;
    message += `Phone: ${data.phone}\n`;
    message += `Guests: ${data.guests}\n`;
    message += `Date: ${data.date}\n`;
    message += `Time: ${data.time}\n`;
    if(data.message) {
        message += `Special Requests: ${data.message}\n`;
    }

    // Encode message
    const encodedMessage = encodeURIComponent(message);

    // Replace YOUR_WHATSAPP_NUMBER with your number in international format, e.g., 923001234567
    const whatsappNumber = "YOUR_WHATSAPP_NUMBER";
    const whatsappURL = `https://wa.me/${923173266580}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappURL, '_blank');

    // Show alert message to user
    alert("Thank you! Your reservation details have been sent via WhatsApp. We will contact you shortly.");

    // Reset form
    reservationForm.reset();
});



        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = item.src;
        lightboxImg.alt = item.alt;
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});


let cart = [];
const cartCount = document.getElementById("cartCount");
const cartBox = document.getElementById("cartBox");
const cartItems = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");

// Add item to cart
function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
}

// Update cart UI
function updateCartUI() {
    cartCount.textContent = cart.length;

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - PKR ${item.price} 
            <button onclick="removeItem(${index})" style="background:red;color:white;border:none;border-radius:5px;padding:2px 5px;cursor:pointer;">X</button>
        `;
        cartItems.appendChild(li);
    });

    totalPriceEl.textContent = total;
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Toggle cart visibility
function toggleCart() {
    cartBox.style.display = cartBox.style.display === 'block' ? 'none' : 'block';
}

// WhatsApp order
function orderNow() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    let message = "Hello FoodFusionX! I'd like to order:\n";
    cart.forEach(item => {
        message += `- ${item.name} (PKR ${item.price})\n`;
    });
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    message += `Total: PKR ${total}`;
    
    const url = `https://wa.me/923173266580?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

function clearCart() {
    cart = [];
    updateCartUI();
}


function addToCart(name, price, btn) {
    cart.push({ name, price });
    updateCartUI();

    // Find product image
    const card = btn.closest('.card');
    const img = card.querySelector('.product-img');

    // Clone image
    const flyImg = img.cloneNode(true);
    flyImg.classList.add('fly-img');

    const imgRect = img.getBoundingClientRect();
    flyImg.style.top = imgRect.top + 'px';
    flyImg.style.left = imgRect.left + 'px';

    document.body.appendChild(flyImg);

    // Cart button position
    const cartBtn = document.querySelector('.cart-btn');
    const cartRect = cartBtn.getBoundingClientRect();

    setTimeout(() => {
        flyImg.style.top = cartRect.top + 'px';
        flyImg.style.left = cartRect.left + 'px';
        flyImg.style.width = '20px';
        flyImg.style.height = '20px';
        flyImg.style.opacity = '0.3';
    }, 50);

    // Remove flying image
    setTimeout(() => {
        flyImg.remove();
    }, 850);

    // Glow effect (optional but nice)
    cartBtn.classList.add('glow');
    setTimeout(() => cartBtn.classList.remove('glow'), 600);
}