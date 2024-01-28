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
	
	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

    // Aggiorna questa parte nel tuo file JavaScript
	function showQuestions() {
		console.log("Showing questions:");

		// Loop through all questions
		for (let i = 0; i < questions.length; i++) {
			const currentQuestion = questions[i];
			
			// Shuffle the array of options
			const shuffledOptions = shuffleArray([...currentQuestion.options]);
			
			// Find the index of the correct answer in the shuffled array
			const correctAnswerIndex = currentQuestion.options.indexOf(currentQuestion.options[currentQuestion.correctAnswer]);
			
			const optionsHTML = shuffledOptions.map((option, index) => `
				<input type="radio" name="answer${i}" value="${index}" data-correct-index="${correctAnswerIndex}">
				<label>${option}</label><br>
			`).join("");

			const imageHTML = currentQuestion.image ? `<img src="${currentQuestion.image}" alt="Question Image" class="question-image">` : '';

			console.log(`Question ${i + 1}:`, currentQuestion.question);

			// Aggiungi il numero della domanda all'inizio della domanda
			const questionNumberHTML = `<div class="question-number">${i + 1}</div>`;
			
			questionContainer.innerHTML += `
				<div class="question" id="question${i}">
					${questionNumberHTML}
					<h2>${currentQuestion.question}</h2>
					${imageHTML}
					${optionsHTML}
					<div class="feedback"></div>
				</div>
			`;
		}

		console.log("All questions displayed.");
	}


    // Modifica la funzione calculateScore nel tuo file JavaScript
	function calculateScore() {
		console.log("Calculating score:");

		// Reset user answers and feedback
		userAnswers = [];
		document.querySelectorAll('.feedback').forEach(feedback => {
			feedback.innerHTML = '';
			feedback.classList.remove('correct', 'incorrect');
		});

		let score = 0;

		// Loop through all questions
		for (let i = 0; i < questions.length; i++) {
			const selectedAnswer = getSelectedAnswer(`answer${i}`);
			userAnswers.push(selectedAnswer);

			const currentQuestion = questions[i];
			const correctAnswerIndex = parseInt(document.querySelector(`input[name="answer${i}"]:checked`).getAttribute('data-correct-index'));

			const feedbackElement = document.getElementById(`question${i}`).querySelector('.feedback');
			
			// Converti selectedAnswer in stringa per confronto
			//const selectedAnswerString = selectedAnswer !== null ? selectedAnswer.toString() : null;
	
			if (selectedAnswer === correctAnswerIndex.toString()) {
				feedbackElement.innerHTML = "Correct!";
				feedbackElement.classList.add('correct');
				score += 1;
			} else {
				feedbackElement.innerHTML = `Incorrect. Correct answer: ${currentQuestion.options[correctAnswerIndex]}`;
				feedbackElement.classList.add('incorrect');
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
