const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Mock question 01",
    choice1: "01_01",
    choice2: "01_02",
    choice3: "01_03",
    choice4: "01_04",
    answer: 1
  },
  {
    question: "Mock question 02",
    choice1: "02_01",
    choice2: "02_02",
    choice3: "02_03",
    choice4: "02_04",
    answer: 2
  },
  {
    question: "Mock question 03",
    choice1: "03_01",
    choice2: "03_02",
    choice3: "03_03",
    choice4: "03_04",
    answer: 3
  },
  {
    question: "Mock question 04",
    choice1: "04_01",
    choice2: "04_02",
    choice3: "04_03",
    choice4: "04_04",
    answer: 4
  },
  {
    question: "Mock question 05",
    choice1: "05_01",
    choice2: "05_02",
    choice3: "05_03",
    choice4: "05_04",
    answer: 1
  },
  {
    question: "Mock question 06",
    choice1: "06_01",
    choice2: "06_02",
    choice3: "06_03",
    choice4: "06_04",
    answer: 2
  },
  {
    question: "Mock question 07",
    choice1: "07_01",
    choice2: "07_02",
    choice3: "07_03",
    choice4: "07_04",
    answer: 3
  },
  {
    question: "Mock question 08",
    choice1: "08_01",
    choice2: "08_02",
    choice3: "08_03",
    choice4: "08_04",
    answer: 4
  },
  {
    question: "Mock question 09",
    choice1: "09_01",
    choice2: "09_02",
    choice3: "09_03",
    choice4: "09_04",
    answer: 1
  },
  {
    question: "Mock question 10",
    choice1: "10_01",
    choice2: "10_02",
    choice3: "10_03",
    choice4: "10_04",
    answer: 2
  },
]

//CONSTANTS

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if(availableQuestions.length === 0 || questionCounter >=MAX_QUESTIONS) {
    //go to the end page
    return window.location.assign('/end.html');
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  })

  availableQuestions.splice(questionIndex, 1); //retira do array a pergunta que acabou de ser usada
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if(classToApply === 'correct') {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);

  });
});

incrementScore = num => {
  score +=num;
  scoreText.innerText = score;
}

startGame();