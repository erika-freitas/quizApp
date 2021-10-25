const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Quantos !important existem nos .css do projeto do Manager?",
    choice1: "591",
    choice2: "347",
    choice3: "672",
    choice4: "133",
    answer: 1
  },
  {
    question: "Qual arquivo .css do Manager possui o maior número de !important declarado?",
    choice1: "elevar.css",
    choice2: "novo_cadastro.css",
    choice3: "elevar-custom.css",
    choice4: "custom.css",
    answer: 3
  },
  {
    question: "Quantos .gitignore possui o projeto do Designer?",
    choice1: "1",
    choice2: "6",
    choice3: "4",
    choice4: "5",
    answer: 2
  },
  {
    question: "A tarefa está atrasada porque...",
    choice1: "Jonathan testou e achou muitos bugs",
    choice2: "Shed testou e achou muitos bugs",
    choice3: "Lucas testou e achou e achou muitos bugs",
    choice4: "Qualquer uma das opções acima, misericórdia não deixem nenhum deles testar tarefas, em nome de JESUS!",
    answer: 4
  },
  // {
  //   question: "Qual o outro cargo oficial do Jonathan?",
  //   choice1: "Dono e Proprietário do Quadro",
  //   choice2: "Imperatriz do Kanban",
  //   choice3: "",
  //   choice4: "",
  //   answer: 
  // },

]

//CONSTANTS

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

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

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);

  });
});

startGame();