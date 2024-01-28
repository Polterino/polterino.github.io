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
            showQuestions();
        })
        .catch(error => console.error("Error loading questions:", error));

    // Function to display all questions and answers
    function showQuestions() {
        let html = "";

        // Loop through all questions
        for (let i = 0; i < questions.length; i++) {
            const currentQuestion = questions[i];
            const optionsHTML = currentQuestion.options.map((option, index) => `
                <input type="radio" name="answer${i}" value="${index}">
                <label>${option}</label><br>
            `).join("");

            html += `
                <div class="question">
                    <h2>${currentQuestion.question}</h2>
                    ${optionsHTML}
                </div>
            `;
        }

        questionContainer.innerHTML = html;
    }
});
