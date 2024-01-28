document.addEventListener("DOMContentLoaded", function () {
    const questionContainer = document.getElementById("question-container");
    const nextButton = document.getElementById("next-button");

    let currentQuestionIndex = 0;
    let questions;

    // Fetch questions from the JSON file
    fetch("questions.json")
        .then(response => response.json())
        .then(data => {
            questions = data;
            showQuestion();
        });

    // Event listener for the Next button
    nextButton.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            alert("Quiz completed!");
            // You may add more actions when the quiz is completed
        }
    });

    // Function to display the current question and answers
    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        const optionsHTML = currentQuestion.options.map((option, index) => `
            <input type="radio" name="answer" value="${index}">
            <label>${option}</label><br>
        `).join("");

        questionContainer.innerHTML = `
            <h2>${currentQuestion.question}</h2>
            ${optionsHTML}
        `;
    }
});
