document.getElementById('home-button').onclick = function()
{
    window.location.href = window.location.origin;
};

const urlParams = new URLSearchParams(window.location.search);
const quizPage = urlParams.get('page');

const quizTitleElement = document.getElementById('quiz-title');

if (pageTitles.hasOwnProperty(quizPage)) 
{
    quizTitleElement.textContent = pageTitles[quizPage] + " Quiz";
}

function scrollButton()
{
    const scrollTopButton = document.getElementById("scrollTopButton");
    const scrollBottomButton = document.getElementById("scrollBottomButton");

    // Show the button when scrolling down 100px from the top of the document
    window.addEventListener("scroll", function () {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollTopButton.style.display = "block";
            scrollBottomButton.style.display = "block";
        } else {
            scrollTopButton.style.display = "none";
            scrollBottomButton.style.display = "none";
        }
    });

    // Scroll to the top when the button is clicked
    scrollTopButton.addEventListener("click", function () 
    {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scrolling
        });
    });

    scrollBottomButton.addEventListener("click", function () {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth' // Smooth scrolling
        });
    });
}