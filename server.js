// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (e.g., CSS, JavaScript)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle form submissions
app.post('/webhook', (req, res) => {
    console.log('Received form submission:', req.body);

    // Process form data
    const formData = JSON.stringify(req.body, null, 2);
    fs.appendFile('submissions.json', formData + '\n', (err) => {
        if (err) {
            console.error('Error saving form data:', err);
            return res.status(500).send('Error saving data');
        }
        res.status(200).send('Form submitted successfully');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
