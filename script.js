// /public/js/script.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('surveyForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Example of additional client-side validation or actions
        const formData = new FormData(form);
        fetch('/webhook-endpoint', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '/thank-you.html'; // Redirect to thank-you page
            } else {
                console.error('Form submission failed:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

