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