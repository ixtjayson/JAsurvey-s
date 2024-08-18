const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();

const upload = multer(); // For handling multipart/form-data

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', upload.none(), (req, res) => {
    const { country, incomeSatisfaction, incomeDependency, incomeLevel, financialStability, employmentSatisfaction } = req.body;
    const data = `${country},${incomeSatisfaction},${incomeDependency},${incomeLevel},${financialStability},${employmentSatisfaction}\n`;

    fs.appendFile('survey_data.csv', data, (err) => {
        if (err) {
            console.error('Error saving data:', err);
            res.status(500).send('Server error. Please try again.');
        } else {
            console.log('Data saved!');
            res.send('Thank you for your submission!');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
