let questions = [];
let answered = [];
let counter = 0;
const questionsDiv = document.querySelector(".questions");
const theQuizes = [
    {
        name: "Waterfall",
        link: "questionsWaterfall.json",
    },
    {
        name: "Scrum",
        link: "questionsScrum.json",
    },
    {
        name: "Kanban",
        link: "questionsKanban.json",
    },
    {
        name: "Lean",
        link: "questionsLean.json",
    },
    {
        name: "Extreme Programming",
        link: "questionsXP.json",
    },
];

// Funksjon som er ment å ta vare på quiz-historikken din!
readFromLocalStorage();
function readFromLocalStorage() {
    const localHistory = localStorage.getItem("answered");
    if (localHistory) {
        answered = JSON.parse(localHistory);
    } else {
        console.log("No history found");
        welcomeToQuiz();
    }
}

function welcomeToQuiz() {
    questionsDiv.innerHTML = "";
    const welcome = document.createElement("h1");
    welcome.textContent = "Velkommen til quiz!";

    const instruction = document.createElement("p");
    instruction.textContent = "Velg hvilken metode du vil ta quiz om!";

    const btns = document.createElement("div");
    theQuizes.forEach((quiz) => {
        const quizBtn = document.createElement("button");
        quizBtn.textContent = quiz.name;
        quizBtn.addEventListener("click", () => {
            console.log(quiz.link);
            fetchQuestions(quiz.link);
        });
        btns.append(quizBtn);
    });

    questionsDiv.append(welcome, instruction, btns);
}
// Fetcher spørsmålene etter valgt tema
async function fetchQuestions(quiz) {
    try {
        const response = await fetch(quiz);
        const data = await response.json();
        questions = await data.questions;
        console.log(questions);
        console.log(questions.length);
    } catch (error) {
        console.log(error);
    }
    setTimeout(displayQuestion, 100);
}
// Finner et tilfeldig spørsmål i valgt kategori
function findQuestion() {
    const question = Math.floor(Math.random() * questions.length);
    console.log("finner spørsmål ", question);
    return question;
}

// Så viser vi frem det vi har funnet
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

// Vi sjekker svaret når det gjettes
function checkAnswer(answer, solution) {
    if (answer == solution) {
        alert("Du har riktig svar");
        counter++;
        if (counter == questions.length) {
            alert("Du har svart alle spørsmålene!");
            counter = 0;
            // localStorage.setItem("answered", JSON.stringify(answered));
            welcomeToQuiz();
        } else {
            displayQuestion();
        }
    } else {
        alert("Du har feil svar");
    }
}
