document.addEventListener("DOMContentLoaded", function () {
    const questionContainer = document.getElementById("question-container");
    const calculateButton = document.getElementById("calculate-button");

    let questions;
    let userAnswers = [];

    // Fetch questions from the JSON file
    fetch("questions.json")
        .then(response => response.json())
        .then(data => {
            questions = data;
            console.log("Questions loaded:", questions);
            showQuestions();
        })
        .catch(error => console.error("Error loading questions:", error));

    // Event listener for the Calculate Score button
    calculateButton.addEventListener("click", calculateScore);

    // Function to display all questions and answers
    function showQuestions() {
        console.log("Showing questions:");

        // Loop through all questions
        for (let i = 0; i < questions.length; i++) {
            const currentQuestion = questions[i];
            const optionsHTML = currentQuestion.options.map((option, index) => `
                <input type="radio" name="answer${i}" value="${index}">
                <label>${option}</label><br>
            `).join("");

            console.log(`Question ${i + 1}:`, currentQuestion.question);
            console.log("Options:", currentQuestion.options);
            console.log("Correct Answer Index:", currentQuestion.correctAnswer);

            questionContainer.innerHTML += `
                <div class="question" id="question${i}">
                    <h2>${currentQuestion.question}</h2>
                    ${optionsHTML}
                    <div class="feedback"></div>
                </div>
            `;
        }

        console.log("All questions displayed.");
    }

    // Function to calculate the score
    // Modifica la funzione calculateScore nel tuo file JavaScript
	function calculateScore() {
		console.log("Calculating score:");

		// Reset user answers and feedback
		userAnswers = [];
		document.querySelectorAll('.feedback').forEach(feedback => feedback.innerHTML = '');

		let score = 0;

		// Loop through all questions
		for (let i = 0; i < questions.length; i++) {
			const selectedAnswer = getSelectedAnswer(`answer${i}`);
			userAnswers.push(selectedAnswer);

			const currentQuestion = questions[i];
			const correctAnswerIndex = currentQuestion.correctAnswer;

			const feedbackElement = document.getElementById(`question${i}`).querySelector('.feedback');

			if (selectedAnswer === correctAnswerIndex.toString()) {
				feedbackElement.innerHTML = "Correct!";
				score += 1;
			} else {
				feedbackElement.innerHTML = `Incorrect. Correct answer: ${currentQuestion.options[correctAnswerIndex]}`;
			}
		}

    // Mostra lo score nella pagina
    const scoreContainer = document.getElementById("score-container");
    scoreContainer.innerHTML = `Your Score: ${score} / ${questions.length}`;
    console.log("Score:", score);
	}


    // Function to get the selected answer for a question
    function getSelectedAnswer(name) {
        const selectedOption = document.querySelector(`input[name="${name}"]:checked`);
        return selectedOption ? selectedOption.value : null;
    }
});
