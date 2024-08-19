const brain = require('brain.js');
const fs = require('fs');

// Create a new neural network
const net = new brain.NeuralNetwork();

// Example training data
const trainingData = [
    { input: [1, 1, 10], output: [2, 8] },
    { input: [2, 2, 8], output: [3, 6] },
    { input: [3, 3, 6], output: [4, 4] },
    // Add more data based on player performance
];

// Train the network
net.train(trainingData, {
    log: true,
    logPeriod: 100,
    iterations: 2000,
    errorThresh: 0.005,
});

// Save the trained model
fs.writeFileSync('trainedModel.json', JSON.stringify(net.toJSON()));
console.log('Model trained and saved.');

