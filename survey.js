const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
    const { country, incomeSatisfaction, incomeDependency, incomeLevel, financialStability, employmentSatisfaction } = req.body;
    const data = `${country},${incomeSatisfaction},${incomeDependency},${incomeLevel},${financialStability},${employmentSatisfaction}\n`;

    fs.appendFile('survey_data.csv', data, (err) => {
        if (err) throw err;
        console.log('Data saved!');
    });

    res.send('Thank you for your submission!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
