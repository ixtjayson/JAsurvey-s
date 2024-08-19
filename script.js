// /public/js/script.js

document.addEventListener('DOMContentLoaded', function() {
    const countrySelect = document.getElementById('country');

    // Function to fetch and populate country list
    function populateCountries() {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                // Clear existing options
                countrySelect.innerHTML = '<option value="" disabled selected>Select your country</option>';

                // Populate the dropdown with countries
                data.forEach(country => {
                    const option = document.createElement('option');
                    option.value = country.cca2; // Country code (e.g., US for United States)
                    option.textContent = country.name.common; // Country name
                    countrySelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error fetching country data:', error);
                // Optionally handle error, e.g., show a message to the user
            });
    }

    populateCountries();

    const form = document.getElementById('surveyForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);
        fetch('https://your-webhook-url.com/webhook-endpoint', {
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
