document.addEventListener("DOMContentLoaded", function ()
{
    const questionContainer = document.getElementById("question-container");
    const calculateButton = document.getElementById("calculate-button");
	const totalQuestionsContainer = document.getElementById("total-questions");
    const showAllButton = document.getElementById("show-all-questions-button");

    let questions;
    let userAnswers = [];
	let randomQuestions;
	let questionsToDisplay;
	
	const urlParams = new URLSearchParams(window.location.search);
    const currentPage = urlParams.get('page');

    // Determina il percorso del file questions.json in base alla pagina corrente
    const questionsPath = `questions/questions_${currentPage}.json`;

    // Fetch questions from the JSON file
    fetch(questionsPath)
        .then(response => response.json())
        .then(data => {
            questions = data;
            console.log("Questions loaded:", questions);
			totalQuestionsContainer.textContent = `Total Questions found on database: ${questions.length}`;
            showQuestions();
        })
        .catch(error => console.error("Error loading questions:", error));

    // Event listener for the Calculate Score button and show all questions
    calculateButton.addEventListener("click", calculateScore);
    showAllButton.addEventListener("click", showAllQuestions);
	
	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

    // Aggiorna questa parte nel tuo file JavaScript
	function showQuestions(questionsToShow, selectCorrectAnswer = false) {
		console.log("Showing questions:");
		
		numDom = 20;
		// randomizzo le domande e ne prendo numDom
		shuffledArray = questions.concat();
		shuffledArray = shuffleArray(shuffledArray);
		randomQuestions = shuffledArray.slice(0, numDom);
        questionsToDisplay = questionsToShow || randomQuestions;

		// Loop through all questions
		for (let i = 0; i < questionsToDisplay.length; i++) {
			const currentQuestion = questionsToDisplay[i];
			//const currentQuestion = questions[i];
			const correctAnswerIndex = currentQuestion.correctAnswer;
			
			// Mantieni traccia dell'indice originale prima di mescolare
			const optionsWithIndices = currentQuestion.options.map((option, index) => ({
			  value: option,
			  index: index
			}));
			
			// Shuffle the array of options
			const shuffledOptions = shuffleArray(optionsWithIndices);
			
			// Find the index of the correct answer in the shuffled array
			//const correctAnswerIndex = currentQuestion.options.indexOf(currentQuestion.options[currentQuestion.correctAnswer]);
			
			const optionsHTML = shuffledOptions.map((option, index) => `
				<input type="radio" name="answer${i}" value="${option.index}" ${selectCorrectAnswer && option.index === correctAnswerIndex ? 'checked' : ''}>
				<label>${option.value}</label><br>
			`).join("");

			const imageHTML = currentQuestion.image ? `<img src="${currentQuestion.image}" alt="Question Image" class="question-image">` : '';

			console.log(`Question ${i + 1}:`, currentQuestion.question);

			// Aggiungi il numero della domanda all'inizio della domanda
			const questionNumberHTML = `<div class="question-number">${i + 1}</div>`;
			
			questionContainer.innerHTML += `
				<div class="question" id="question${i}" data-verified="0">
					${questionNumberHTML}
					<div class="verification-icon"></div>
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
		for (let i = 0; i < questionsToDisplay.length; i++) {
			const selectedAnswer = getSelectedAnswer(`answer${i}`);
			userAnswers.push(selectedAnswer);

			currentQuestion = questionsToDisplay[i];
			//const currentQuestion = questions[i];
			
			 // Verifica se almeno un elemento radio è selezionato
			const selectedRadio = document.querySelector(`input[name="answer${i}"]:checked`);
			
			if (selectedRadio) {
				const correctAnswerIndex = currentQuestion.correctAnswer;

				const feedbackElement = document.getElementById(`question${i}`).querySelector('.feedback');
				
				// Converti selectedAnswer in stringa per confronto
				//const selectedAnswerString = selectedAnswer !== null ? selectedAnswer.toString() : null;
		
				if (parseInt(selectedAnswer) === parseInt(correctAnswerIndex)) {
					feedbackElement.innerHTML = "Correct!";
					feedbackElement.classList.add('correct');
					score += 1;
				} else {
					feedbackElement.innerHTML = `Incorrect. Correct answer: ${currentQuestion.options[correctAnswerIndex]}`;
					feedbackElement.classList.add('incorrect');
				}
			} else {
				// Nessuna risposta selezionata, considera la domanda come sbagliata
				const feedbackElement = document.getElementById(`question${i}`).querySelector('.feedback');
				feedbackElement.innerHTML = 'Incorrect. No answer selected.';
				feedbackElement.classList.add('incorrect');
			}
		}

		// Mostra lo score nella pagina
		const scoreContainer = document.getElementById("score-container");
		scoreContainer.innerHTML = `Your Score: ${score} / ${questionsToDisplay.length}`;
		console.log("Score:", score);
	}


	function showAllQuestions() {
        // Svuota il contenitore delle domande prima di visualizzare tutte le domande
        questionContainer.innerHTML = '';
        showQuestions(questions, true);
    }

    // Function to get the selected answer for a question
    function getSelectedAnswer(name) {
        const selectedOption = document.querySelector(`input[name="${name}"]:checked`);
        return selectedOption ? selectedOption.value : null;
    }
});
