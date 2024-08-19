// /server/server.js

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Directory for storing form submissions
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

app.post('/webhook-endpoint', (req, res) => {
    console.log('Received form submission:', req.body);

    // Save form data to a file (or handle it as needed)
    const filePath = path.join(dataDir, 'submissions.json');
    const submissionData = {
        ...req.body,
        timestamp: new Date().toISOString()
    };

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.sendStatus(500);
        }
        
        const submissions = data ? JSON.parse(data) : [];
        submissions.push(submissionData);

        fs.writeFile(filePath, JSON.stringify(submissions, null, 2), err => {
            if (err) {
                console.error('Error writing file:', err);
                return res.sendStatus(500);
            }
            res.sendStatus(200); // Respond to Formsubmit
        });
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
