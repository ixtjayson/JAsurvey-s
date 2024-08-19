document.addEventListener('DOMContentLoaded', function () {
    // Handle form submission
    document.getElementById('surveyForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
        
        const formData = new FormData(this);
        
        // Send form data to server
        fetch('/submit-survey', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log(data); // Log server response
            alert("Survey submitted successfully!");
        })
        .catch(error => {
            console.error('Error:', error);
            alert("There was an error submitting your survey. Please try again.");
        });
    });
});
