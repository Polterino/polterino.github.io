document.addEventListener("DOMContentLoaded", function ()
{
	const questionContainer = document.getElementById("question-container");
	const calculateButton = document.getElementById("calculate-button");
	const totalQuestionsContainer = document.getElementById("total-questions");
	const showAllButton = document.getElementById("show-all-questions-button");

	let questions; // array that contains all the questions ordered as in the input JSON file
	let userAnswers = [];
	let randomQuestions;
	let questionsToDisplay;

	// get the name of the file to open
	const urlParams = new URLSearchParams(window.location.search);
	const currentPage = urlParams.get("page");
	const questionsPath = `questions/questions_${currentPage}.json`;

	// Fetch questions from the JSON file
	fetch(questionsPath)
	.then((response) => response.json())
	.then((data) => {
		questions = data;
		console.log("Questions loaded:", questions);
		totalQuestionsContainer.textContent = `Total Questions found on database: ${questions.length}`;
		showQuestions();
	})
	.catch((error) => console.error("Error loading questions:", error));

	// Event listener for the Calculate Score button and show all questions
	calculateButton.addEventListener("click", calculateScore);
	showAllButton.addEventListener("click", showAllQuestions);

	// function to shuffle the questions and for each question, the answers
	function shuffleArray(array)
	{
		for (let i = array.length - 1; i > 0; i--)
		{
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	// show given questions. If selectCorrectAnswer = true, check correct answers when printing them
	function showQuestions(questionsToShow, selectCorrectAnswer = false)
	{
		console.log("Showing questions:");

		// number of questions to show
		numDom = 20;

		// shuffling questions and taking numDom of them
		shuffledArray = questions.concat();
		shuffledArray = shuffleArray(shuffledArray);
		randomQuestions = shuffledArray.slice(0, numDom);
		// if questionToShow is not null ==> questionsToDisplay = questionsToShow
		// otherwise questionsToDisplay = randomQuestions (almost always the case, except when showAllQuestions is called)
		questionsToDisplay = questionsToShow || randomQuestions;

		// Loop through all questions to display
		for (let i = 0; i < questionsToDisplay.length; i++)
		{
			const currentQuestion = questionsToDisplay[i];
			const correctAnswerIndex = currentQuestion.correctAnswer;

			// Before shuffling the answers, save the correctAnswerIndex
			const optionsWithIndices = currentQuestion.options.map(
				(option, index) => ({
					value: option,
					index: index,
				})
			);

			// Shuffle the array of options (answers)
			const shuffledOptions = shuffleArray(optionsWithIndices);

			// Find the index of the correct answer in the shuffled array
			//const correctAnswerIndex = currentQuestion.options.indexOf(currentQuestion.options[currentQuestion.correctAnswer]);

			const optionsHTML = shuffledOptions.map((option, index) => `
				<input type="radio" name="answer${i}" value="${option.index}" ${
				selectCorrectAnswer && option.index === correctAnswerIndex? "checked": ""}>
				<label>${option.value}</label><br>
			`).join("");

			const imageHTML = currentQuestion.image? 
			`<img src="${currentQuestion.image}" alt="Question Image" class="question-image">`
			: "";

			console.log(`Question ${i + 1}:`, currentQuestion.question);

			// Add index of question before showing it
			const questionNumberHTML = `<div class="question-number">${i + 1}</div>`;

			questionContainer.innerHTML += `
			<div class="question" id="question${i}" data-verified="${currentQuestion.verified}">
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

	// Compute the score
	function calculateScore()
	{
		console.log("Calculating score:");

		// Reset user answers and feedback
		userAnswers = [];
		document.querySelectorAll(".feedback").forEach((feedback) => {
			feedback.innerHTML = "";
			feedback.classList.remove("correct", "incorrect");
		});

		let score = 0;

		// Loop through all questions
		for (let i = 0; i < questionsToDisplay.length; i++)
		{
			const selectedAnswer = getSelectedAnswer(`answer${i}`);
			userAnswers.push(selectedAnswer);

			currentQuestion = questionsToDisplay[i];

			// check that at least one answer is selected
			const selectedRadio = document.querySelector(
				`input[name="answer${i}"]:checked`
			);

			const feedbackElement = document
			.getElementById(`question${i}`)
			.querySelector(".feedback");

			if (selectedRadio)
			{
				const correctAnswerIndex = currentQuestion.correctAnswer;

				// Converti selectedAnswer in stringa per confronto
				//const selectedAnswerString = selectedAnswer !== null ? selectedAnswer.toString() : null;

				// if the answer is correct
				if (parseInt(selectedAnswer) === parseInt(correctAnswerIndex))
				{
					feedbackElement.innerHTML = "Correct!";
					feedbackElement.classList.add("correct");
					score += 1;
				}
				else
				{
					feedbackElement.innerHTML = `Incorrect. Correct answer: ${currentQuestion.options[correctAnswerIndex]}`;
					feedbackElement.classList.add("incorrect");
				}
			}
			else
			{
				// No answer was selected, consider it wrong
				feedbackElement.innerHTML = "Incorrect. No answer selected.";
				feedbackElement.classList.add("incorrect");
			}
		}

		// Show final score on the bottom of the page
		const scoreContainer = document.getElementById("score-container");
		scoreContainer.innerHTML = `Your Score: ${score} / ${questionsToDisplay.length}`;
		console.log("Score:", score);
	}

	function showAllQuestions()
	{
		// empty question container
		questionContainer.innerHTML = "";

		if (showAllButton.textContent !== "Show all questions and answers")
		{
			console.log("showAllQuestions: Show all questions and answers");
			showAllButton.textContent = "Show all questions and answers";
			showAllButton.style.backgroundColor = "";
			showQuestions();
		}
		else
		{
			console.log("showAllQuestions: Back to quiz");
			showAllButton.textContent = "Back to quiz";
			showAllButton.style.backgroundColor = "orange";
			showQuestions(questions, true); 
		}
	}

	// Function to get the selected answer for a question
	function getSelectedAnswer(name)
	{
		const selectedOption = document.querySelector(
			`input[name="${name}"]:checked`
		);
		return selectedOption ? selectedOption.value : null;
	}
});
