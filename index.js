// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
});

// Smooth scroll for anchor links
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

// Form submission handler
function handleFormSubmit(event) {
    event.preventDefault();
    alert('Thank you for your inquiry! Our team will contact you within 24 hours.');
    event.target.reset();
}

// Add form submit handlers to all forms
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
});

// Tracking form handler
function handleTracking(event) {
    event.preventDefault();
    const trackingNumber = document.getElementById('tracking-number').value;
    const resultDiv = document.getElementById('tracking-result');
    
    if (resultDiv) {
        resultDiv.classList.add('show');
        document.getElementById('result-tracking-number').textContent = trackingNumber;
        document.getElementById('result-status').textContent = 'In Transit';
        document.getElementById('result-location').textContent = 'Dubai, UAE';
        document.getElementById('result-eta').textContent = 'October 5, 2025';
    }
}