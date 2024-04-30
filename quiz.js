let questions = [];
let answered = [];
const questionsDiv = document.querySelector(".questions");

readFromLocalStorage();
function readFromLocalStorage() {
    const localQuestions = localStorage.getItem("questions");
    if (localQuestions) {
        questions = JSON.parse(localQuestions);
    } else {
        console.log("No questions found in Local storage");
        fetchQuestions();
    }
}

async function fetchQuestions() {
    try {
        const response = await fetch("questions.json");
        const data = await response.json();
        questions = await data.questions;
        console.log(questions);
        console.log(questions.length);
    } catch (error) {
        console.log(error);
    }
    setTimeout(displayQuestion, 100);
}

function findQuestion() {
    console.log("Lengden på questions: ", questions.length);

    const question = Math.floor(Math.random() * questions.length);
    console.log("finner spørsmål ", question);
    return question;
}

function displayQuestion() {
    const question = findQuestion();
    questionsDiv.innerHTML = `
        <h1>${questions[question].question}</h1>
        <h2>${questions[question].options[0]}</h2>
        <h2>${questions[question].options[1]}</h2>
        <h2>${questions[question].options[2]}</h2>
    `;
    questions[question].options.forEach((option) => {
        console.log(questions[question].answer[0]);
        const answer = document.createElement("button");
        answer.textContent = option[0];
        questionsDiv.append(answer);
        answer.addEventListener("click", () => {
            checkAnswer(option[0], questions[question].answer[0]);
        });
    });
}
function checkAnswer(answer, solution) {
    if (answer == solution) {
        alert("Du har riktig svar");
    } else {
        alert("Du har feil svar");
    }
}
