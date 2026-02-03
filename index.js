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

// Form submission handler (contact + careers)
function showFormToast(title, message, variant = 'success') {
    let toast = document.getElementById('form-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'form-toast';
        toast.className = 'form-toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        toast.innerHTML = `
            <div class="form-toast__icon" aria-hidden="true">✓</div>
            <div class="form-toast__content">
                <strong>Thank you!</strong>
                <span>${message}</span>
            </div>
            <button class="form-toast__close" aria-label="Close message">×</button>
        `;
        document.body.appendChild(toast);

        toast.querySelector('.form-toast__close').addEventListener('click', () => {
            toast.classList.remove('show');
        });
    }

    toast.classList.remove('error');
    if (variant === 'error') {
        toast.classList.add('error');
    }

    toast.querySelector('.form-toast__icon').textContent = variant === 'error' ? '!' : '✓';
    toast.querySelector('.form-toast__content strong').textContent = title;
    toast.querySelector('.form-toast__content span').textContent = message;

    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    clearTimeout(window.__formToastTimer);
    window.__formToastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 4500);
}

async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const body = new URLSearchParams(formData).toString();
    const action = form.getAttribute('action') || '/';

    try {
        const response = await fetch(action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body
        });

        if (response.ok) {
            showFormToast('Thank you!', 'Our team will contact you within 24 hours.');
            form.reset();
        } else {
            showFormToast('Submission failed', 'Something went wrong. Please try again.', 'error');
        }
    } catch (error) {
        showFormToast('Submission failed', 'Something went wrong. Please try again.', 'error');
    }
}

// Add form submit handlers to contact + careers forms only
document.querySelectorAll('.contact-form form').forEach(form => {
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
