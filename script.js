document.addEventListener('DOMContentLoaded', function () {
    const countrySelect = document.getElementById('country');

    // Fetch the country list from the CDN
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.name.common;
                option.textContent = country.name.common;
                countrySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching country list:', error));

    const form = document.getElementById('surveyForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);

        // Send the form data to the server
        fetch('/submit', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            alert('Thank you for your submission!');
            form.reset(); // Reset the form after successful submission
        })
        .catch(error => console.error('Error submitting form:', error));
    });
});
