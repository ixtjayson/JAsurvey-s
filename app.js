// Ensure brain.js is available globally
const brain = window.brain;

// Game variables
let score = 0;
let difficulty = 1;
let timerValue = 10;
let timer;
let equation, correctAnswer;

// Create and configure the performance chart
const ctx = document.getElementById('performanceChart').getContext('2d');
const performanceChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Score Over Time',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }]
    },
    options: {
        scales: {
            x: { type: 'linear', position: 'bottom' },
            y: { beginAtZero: true }
        }
    }
});

// Load the trained model
async function loadModel() {
    try {
        const response = await fetch('trainedModel.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const modelJSON = await response.json();
        const net = new brain.NeuralNetwork();
        net.fromJSON(modelJSON);
        return net;
    } catch (error) {
        console.error('Error loading model:', error);
        return null;
    }
}

// Initialize the game
async function initGame() {
    score = 0;
    difficulty = 1;
    updateScore();
    generateEquation();
    await startTimer();
}

// Generate a new equation
function generateEquation() {
    const num1 = _.random(1, 10 * difficulty);
    const num2 = _.random(1, 10 * difficulty);
    correctAnswer = num1 + num2;
    equation = `${num1} + ${num2} = ?`;
    document.getElementById('equation').textContent = equation;
}

// Start the timer with AI adjustment
async function startTimer() {
    clearInterval(timer);
    timerValue = _.random(3, 15); // Initial timer value

    // Load model and make predictions
    const model = await loadModel();
    if (!model) return; // Exit if model loading fails

    const input = [score, difficulty, timerValue];
    const output = model.run(input);
    
    // Use model output to adjust difficulty and timer
    timerValue = Math.max(3, Math.min(15, output[0])); // Ensure timer is between 3 and 15
    difficulty = Math.min(10, output[1]); // Ensure difficulty does not exceed 10
    document.getElementById('timer').textContent = `Time: ${timerValue}s`;

    timer = setInterval(() => {
        timerValue -= 1;
        document.getElementById('timer').textContent = `Time: ${timerValue}s`;
        if (timerValue <= 0) {
            clearInterval(timer);
            alert('Time up! Game over.');
            initGame(); // Restart the game
        }
    }, 1000);
}

// Handle user submission
document.getElementById('submit').addEventListener('click', () => {
    const userAnswer = parseInt(document.getElementById('answer').value);
    if (userAnswer === correctAnswer) {
        score += difficulty === 1 ? 2 : 1;
        difficulty = Math.min(10, difficulty + 1); // Increase difficulty
        updateScore();
        generateEquation();
        startTimer();
    } else {
        alert('Incorrect answer. Try again.');
    }
});

// Update score display and performance chart
function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
    performanceChart.data.labels.push(Date.now());
    performanceChart.data.datasets[0].data.push(score);
    performanceChart.update();
}

// Initialize the game on load
window.onload = initGame;
