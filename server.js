const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const upload = multer();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/submit-survey', upload.none(), (req, res) => {
    const { country, incomeSatisfaction, incomeDependency, incomeLevel, financialStability, employmentSatisfaction } = req.body;
    
    const csvLine = `${country},${incomeSatisfaction},${incomeDependency},${incomeLevel},${financialStability},${employmentSatisfaction}\n`;
    
    fs.appendFile('survey_data.csv', csvLine, err => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).send('Internal Server Error');
        }
        res.send('Survey data submitted successfully');
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
