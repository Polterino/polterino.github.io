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

	// check if user wants a quiz with all the questions from the file
	const isAllQuestion = urlParams.get("allQuestion");
	// check if user don't want to shuffle them
	const noShuffle = urlParams.get("noShuffle");

	const languageMap = {
		"js": "javascript",
		"py": "python",
		"c": "c",
		"cpp": "cpp",
		"java": "java",
		"html": "markup",
		"sql": "sql",
		"php": "php"
	};

	// Find programming language from file extension
	function getLanguageFromFile(fileName)
	{
		const ext = fileName.split('.').pop();
		return languageMap[ext] || "plaintext";
	}

	function escapeHtml(str)
	{
		return str.replace(/&/g, "&amp;")
				  .replace(/</g, "&lt;")
				  .replace(/>/g, "&gt;")
				  .replace(/"/g, "&quot;")
				  .replace(/'/g, "&#039;");
	}

	// Fetch questions from the JSON file
	fetch(questionsPath)
	.then((response) => response.json())
	.then((data) => {
		questions = data;
		console.log("Questions loaded:", questions);
		totalQuestionsContainer.innerHTML = `Total questions found on database: <b>${questions.length}</b>`;
		showQuestions();
	})
	.catch((error) => console.error("Error loading questions:", error));

	// Event listener for the Calculate Score button and show all questions
	calculateButton.addEventListener("click", calculateScore);
	showAllButton.addEventListener("click", showAllQuestions);

	// enable scroll button
	scrollButton();

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
		console.log("Showing questions");

		// number of questions to show
		numDom = 20;

		// shuffling questions and taking numDom of them
		shuffledArray = questions.concat();
	
		if(noShuffle !== "true")
			shuffledArray = shuffleArray(shuffledArray);

		if(isAllQuestion === "true")
			randomQuestions = shuffledArray;
		else
			randomQuestions = shuffledArray.slice(0, numDom);
		// if questionToShow is not null ==> questionsToDisplay = questionsToShow
		// otherwise questionsToDisplay = randomQuestions (almost always the case, except when showAllQuestions is called)
		questionsToDisplay = questionsToShow || randomQuestions;

		// Loop through all questions to display
		for (let i = 0; i < questionsToDisplay.length; i++)
		{
			const currentQuestion = questionsToDisplay[i];
			
			const isMCQ = Array.isArray(currentQuestion.correctAnswer);
			let optionsHTML;

			// if it's a single choice question
			if(!isMCQ)
			{
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

				optionsHTML = shuffledOptions.map((option, index) => `
					<input type="radio" name="answer${i}" value="${option.index}" ${
					selectCorrectAnswer && option.index === correctAnswerIndex? "checked": ""}>
					<label>${option.value}</label><br>
				`).join("");
			}
			// multiple choice question
			else
			{
				const correctAnswers = currentQuestion.correctAnswer;
				const optionsWithIndices = currentQuestion.options.map((option, index) => ({
					value: option,
					index: index,
					isCorrect: correctAnswers.includes(index) // Check if the option index is correct
				}));

				// Shuffle the array of options (answers)
				const shuffledOptions = shuffleArray(optionsWithIndices);

				// Generate HTML for each option
				optionsHTML = shuffledOptions.map((option) => `
					<input type="checkbox" name="answer${i}" value="${option.index}" ${
					selectCorrectAnswer && option.isCorrect ? "checked" : ""
					}>
					<label>${option.value}</label><br>
				`).join("");
			}

			const imageHTML = currentQuestion.image? 
			`<img src="${currentQuestion.image}" alt="Question Image" class="question-image">`
			: "";

			// show motivation if selectCorrectAnswer===true and if there exists a motivation
			motivation_local = "";
			motivation_image_local = "";
			if(selectCorrectAnswer)
			{
				if(currentQuestion.motivation)
					motivation_local = `Motivation: ${currentQuestion.motivation}`;
				if (currentQuestion.motivation_image)
					motivation_image_local = `<img src="${currentQuestion.motivation_image}" alt="Motivation Image" class="question-image" style="margin-top: 10px;">`;
			}

			//console.log(`Question ${i + 1}:`, currentQuestion.question);

			// Add index of question before showing it
			const questionNumberHTML = `<div class="question-number">${i + 1}</div>`;

			questionContainer.innerHTML += `
			<div class="question" id="question${i}" data-verified="${currentQuestion.verified}">
			${questionNumberHTML}
			<div class="verification-icon"></div>
			<h2>${currentQuestion.question}</h2>
			${imageHTML}
			<div id="code-container-${i}"></div>
			${optionsHTML}
			<div class="feedback"></div>
			<div class="motivation" style="margin-top: 10px">
			${motivation_local}
			${motivation_image_local}</div>
			</div>
			`;

			// if there's a file with code to show
			if (currentQuestion.code)
			{
				fetch(currentQuestion.code)
					.then(response => {
						if (!response.ok) {
							throw new Error("Code file not found");
						}
						return response.text();
					})
					.then(code => {
						const language = getLanguageFromFile(currentQuestion.code);
						const escapedCode = escapeHtml(code);
						
						// Create code container
						const pre = document.createElement("pre");
				        const codeElement = document.createElement("code");
				        codeElement.classList.add(`language-${language}`);
				        codeElement.innerHTML = escapedCode;
				        pre.appendChild(codeElement);

				        codeContainer = document.getElementById(`code-container-${i}`);
				        codeContainer.innerHTML = "";
			            codeContainer.appendChild(pre);
			            Prism.highlightElement(codeElement);
					})
					.catch(error => console.error("Error loading code file:", error));
			}
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

		// Reset all the motivations
		document.querySelectorAll(".motivation").forEach((motivation) => {
			motivation.innerHTML = "";
		});

		let score = 0;

		// Loop through all questions
		for (let i = 0; i < questionsToDisplay.length; i++)
		{
			let selectedAnswer = getSelectedAnswer(`answer${i}`);
			userAnswers.push(selectedAnswer);

			currentQuestion = questionsToDisplay[i];
			const correctAnswers = Array.isArray(currentQuestion.correctAnswer) 
			? currentQuestion.correctAnswer 
			: [currentQuestion.correctAnswer];
			
			const feedbackElement = document
			.getElementById(`question${i}`)
			.querySelector(".feedback");

			const motivationElement = document
						.getElementById(`question${i}`)
						.querySelector(".motivation");

			// if there's at least one selected answer for that question
			if (selectedAnswer)
			{
				//const correctAnswerIndex = currentQuestion.correctAnswer;

				// single choice question
				if (correctAnswers.length === 1)
				{
					const correctAnswerIndex = correctAnswers[0];
					// if the answer is correct
					if (parseInt(selectedAnswer[0]) === parseInt(correctAnswerIndex))
					{
						feedbackElement.innerHTML = "Correct!";
						feedbackElement.classList.add("correct");
						score += 1;
					} 
					else
					{
						feedbackElement.innerHTML = `Incorrect. Correct answer: ${currentQuestion.options[correctAnswerIndex]}`;
						feedbackElement.classList.add("incorrect");
	
						if (currentQuestion.motivation)
							motivationElement.innerHTML = `Motivation: ${currentQuestion.motivation}`;
						if (currentQuestion.motivation_image)
							motivationElement.innerHTML += `<img src="${currentQuestion.motivation_image}" alt="Motivation Image" class="question-image" style="margin-top: 10px;">`;            	
					}
				}
				// multiple choice question
				else
				{
					selectedAnswer = selectedAnswer.map(element => parseInt(element)); // change all the elements from string to int
					const allCorrectSelected = correctAnswers.every(answer => selectedAnswer.includes(answer));
					const noIncorrectSelected = selectedAnswer.every(answer => correctAnswers.includes(answer));
					const isCorrect = allCorrectSelected && noIncorrectSelected;

					if (isCorrect)
					{
						feedbackElement.innerHTML = "Correct!";
						feedbackElement.classList.add("correct");
						score += 1;
					}
					else
					{
						feedbackElement.innerHTML = `Incorrect. Correct answer(s): ${correctAnswers.map(answer => currentQuestion.options[answer]).join(", ")}`;
						feedbackElement.classList.add("incorrect");
						if (currentQuestion.motivation)
							motivationElement.innerHTML = `Motivation: ${currentQuestion.motivation}`;
						if (currentQuestion.motivation_image)
							motivationElement.innerHTML += `<img src="${currentQuestion.motivation_image}" alt="Motivation Image" class="question-image" style="margin-top: 10px;">`;
					}
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
		const selectedOption = document.querySelectorAll(
			`input[name="${name}"]:checked`
		);
		const selectedValues = [];
		selectedOption.forEach(option => {
			selectedValues.push(option.value);
			});
			return selectedValues.length > 0 ? selectedValues : null;	
	}
});
