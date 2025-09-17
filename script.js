// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = mobileNav.style.display === 'block';
            mobileNav.style.display = isOpen ? 'none' : 'block';
            
            // Animate hamburger menu
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (isOpen) {
                spans.forEach(span => span.style.transform = '');
            } else {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add fade-in animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe cards and content sections
    document.querySelectorAll('.card, .content-card, .hero-info').forEach(el => {
        observer.observe(el);
    });
});

// View mode toggle for regions page
function toggleView(mode) {
    const mapView = document.getElementById('mapView');
    const listView = document.getElementById('listView');
    const mapBtn = document.getElementById('mapBtn');
    const listBtn = document.getElementById('listBtn');
    
    if (mode === 'map') {
        mapView.style.display = 'block';
        listView.style.display = 'none';
        mapBtn.classList.add('active');
        listBtn.classList.remove('active');
    } else {
        mapView.style.display = 'none';
        listView.style.display = 'block';
        mapBtn.classList.remove('active');
        listBtn.classList.add('active');
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ef4444' : '#0e3264'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add notification animations to CSS
if (!document.getElementById('notificationStyles')) {
    const style = document.createElement('style');
    style.id = 'notificationStyles';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Form handling
function handleContactForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);
    showNotification('Zpráva odeslána. Děkujeme za vaši zprávu. Budeme vás kontaktovat co nejdříve.');
    
    // Reset form
    event.target.reset();
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Set default view to map
    if (currentPage === 'regions.html') {
        toggleView('map');
    }
    
    // Initialize contact form if on contact page
    if (currentPage === 'contact.html') {
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', handleContactForm);
        }
    }
});



// Get the search input and all city cards
const searchInput = document.getElementById('citySearch');
const cityCards = document.querySelectorAll('.grid.grid-3 .card');

// Add an event listener to the search input
searchInput.addEventListener('input', (event) => {
    // Get the search term and convert it to lowercase for a case-insensitive search
    const searchTerm = event.target.value.toLowerCase();

    // Loop through each city card
    cityCards.forEach(card => {
        // Get the city name from the card's title and convert it to lowercase
        const cityName = card.querySelector('.card-title').textContent.toLowerCase();

        // Check if the city name includes the search term
        if (cityName.includes(searchTerm)) {
            // If it's a match, show the card
            card.style.display = 'block';
        } else {
            // If it's not a match, hide the card
            card.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Desktop navigation dropdown
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownContent = document.querySelector('.dropdown-content');

    if (dropdownToggle && dropdownContent) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault(); // Zabrání přesměrování
            dropdownContent.classList.toggle('show');
        });

        // Zavře dropdown po kliknutí mimo něj
        window.addEventListener('click', function(e) {
            if (!e.target.matches('.dropdown-toggle')) {
                if (dropdownContent.classList.contains('show')) {
                    dropdownContent.classList.remove('show');
                }
            }
        });
    }
});