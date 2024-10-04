let quizData = [];
let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const resultElement = document.getElementById('result');
const scoreDiv = document.getElementById('score');
const finalMessage = document.getElementById('final');

function loadQuizData() {
    scoreDiv.innerHTML = `<p>Puntos: ${score}</p>`;

    fetch('./js/json/quiz-data.json')
        .then(response => { 
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            quizData = data;
            loadQuestion();
        })
    .catch(error => console.error('Error al cargar los datos del quiz', error));
}

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    optionsElement.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(index));
        optionsElement.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const correctIndex = quizData[currentQuestionIndex].correct;
    if (selectedIndex === correctIndex) {
        score++;
        scoreDiv.innerHTML = `<p>Puntos: ${score}</p>`;
        alert("¡Correcto!");
    } else {
        alert("Incorrecto. La respuesta correcta es: " + quizData[currentQuestionIndex].options[correctIndex]);
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        finalMessage.innerHTML = `<h2>Has completado el test. Tu puntuación es: ${score}/${quizData.length}</h2>`;
        showResult();
    }
}

function showResult() {
    questionElement.style.display = 'none';
    optionsElement.style.display = 'none';
    scoreDiv.style.display = 'none';
    resultElement.style.display = 'block';
    finalMessage.innerHTML = `<h2>Has completado el test. Tu puntuación es: ${score}/${quizData.length}</h2>`;
}

window.onload = function() {
    loadQuizData();
};
