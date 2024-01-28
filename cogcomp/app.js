document.addEventListener("DOMContentLoaded", function () {
    const questionContainer = document.getElementById("question-container");

    let questions;

    // Fetch questions from the JSON file
    fetch("questions.json")
        .then(response => response.json())
        .then(data => {
            questions = data;
            console.log("Questions loaded:", questions);
            showQuestions();
        })
        .catch(error => console.error("Error loading questions:", error));

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
                <div class="question">
                    <h2>${currentQuestion.question}</h2>
                    ${optionsHTML}
                </div>
            `;
        }

        console.log("All questions displayed.");
    }
});
