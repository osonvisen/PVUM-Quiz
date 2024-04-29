const questions = [];

getQuestions();
async function getQuestions() {
    try {
        const response = await fetch("questions.json");
        const questions = await response.json();
        console.log(questions);
    } catch (error) {
        console.log(error);
    }
}
