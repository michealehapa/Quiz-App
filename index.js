const questions = [
    {
      questionText: "Commonly used data types DO NOT include:",
      options: [
        "1. strings", 
        "2. booleans", 
        "3. alerts", 
        "4. numbers"],
      answer: "3. alerts",
    },
    {
      questionText: "Arrays in JavaScript can be used to store ______.",
      options: [
        "1. numbers and strings",
        "2. other arrays",
        "3. booleans",
        "4. all of the above",
      ],
      answer: "4. all of the above",
    },
    {
      questionText:
        "String values must be enclosed within _____ when being assigned to variables.",
      options: [
        "1. commas", 
        "2. curly brackets", 
        "3. quotes", 
        "4. parentheses"],
      answer: "3. quotes",
    },
    {
      questionText:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      options: [
        "1. JavaScript",
        "2. terminal/bash",
        "3. for loops",
        "4. console.log",
      ],
      answer: "4. console.log",
    },
    {
      questionText:
        "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
      options: [
        "1. break", 
        "2. stop", 
        "3. halt", 
        "4. exit"],
      answer: "1. break",
    },
];
  
  
const quizApp = document.querySelector(".quiz_app");
const quizStartMenu = document.querySelector(".quiz_start_menu");
const btnStart = document.querySelector(".btn_start");
const questionContainer = document.querySelector(".question-container");
const btnNext = document.querySelector(".btn_next");
const optionsEl = document.querySelector(".options");
const btnOption = document.querySelectorAll(".btn-option");
const quizEndMenu = document.querySelector(".quiz_end_menu");
const btnSubmit = document.querySelector(".btn_submit");
// const btnReset = document.querySelector(".btn_reset");
const btnBack = document.querySelector(".btn_back");
const questionEl = document.querySelector(".question");
const scoreEl = document.querySelector("#score");
const scoreCardEl = document.querySelector(".score_card");
const nameEl = document.getElementById("name_initials");
const listPlayers = document.querySelector(".list_players");
const btnHighScore = document.querySelector("#leaderboard");
const btnClear = document.querySelector(".clear_btn");
const timerEl = document.querySelector(".timer");
  
let score = 60,
    currentQuestion = 0;
  let playerNum = 0;
  let scoreCard = [];
  let id;
  
  // function reset() {
  //   currentQuestion = 0;
  //   score = 0;
  //   quizStartMenu.classList.remove("hide");
  //   quizEndMenu.classList.add("hide");
  // }
  
function start() {
    currentQuestion = 0;
    score = 60;
    timerEl.innerText = 60;
    quizStartMenu.classList.add("hide");
    questionContainer.classList.remove("hide");
    id = setInterval(setTimer, 3000);
    showQuestion();
}
  
function showQuestion() {
    btnHighScore.disabled = true;
    btnNext.style.opacity = "0%";
    btnNext.style.pointerEvents = "none";
    if (currentQuestion < questions.length) {
      resetState();
      questionEl.innerText = questions[currentQuestion].questionText;
      questions[currentQuestion].options.forEach((answer) => {
        const answerBtn = document.createElement("button");
        answerBtn.innerText = answer;
        answerBtn.classList.add("btn-option");
        optionsEl.appendChild(answerBtn);
        if (questions[currentQuestion].answer === answerBtn.innerText) {
          answerBtn.dataset.ans = "correct";
        } else {
          answerBtn.dataset.ans = "incorrect";
        }
        answerBtn.addEventListener("click", checkAnswer);
      });
    } else {
      questionContainer.classList.add("hide");
      quizEndMenu.classList.remove("hide");
      scoreEl.innerText = score;
      clearInterval(id);
    }
    currentQuestion++;
}
  
function checkAnswer(e) {
    const selectedOption = e.target;
    console.log(e.target);
    if (selectedOption.dataset.ans === "correct") {
      selectedOption.classList.add("correct");
    } else if (selectedOption.dataset.ans === "incorrect") {
      selectedOption.classList.add("wrong");
      score -= 10;
    }
    Array.from(optionsEl.children).forEach((btn) => {
      if (btn.dataset.ans === "correct") {
        btn.classList.add("correct");
      }
      btn.disabled = true;
    });
    btnNext.style.opacity = "100%";
    btnNext.style.pointerEvents = "all";
}
  
function resetState() {
    while (optionsEl.firstChild) {
      optionsEl.removeChild(optionsEl.firstChild);
    }
}
  
function displayScoreCard() {
    btnHighScore.disabled = false;
    clearInterval(id);
    quizStartMenu.classList.add("hide");
    quizEndMenu.classList.add("hide");
    scoreCardEl.classList.remove("hide");
    timerEl.innerText = 60;
}

function submit() {
    const user = nameEl.value;
    const playerDetails = new Object();
    playerDetails.name = user;
    playerDetails.points = score;
    scoreCard.push(playerDetails);
    sortleaderBoard();
    listPlayers.innerHTML = "";
    scoreCard.forEach((obj) => {
      const player = document.createElement("li");
      const { name, points } = obj;
      player.innerText = `${name}  ${points}`;
      player.classList.add("player_name");
      listPlayers.appendChild(player);
    });
    playerNum++;
    displayScoreCard();
}

function sortleaderBoard() {
    scoreCard.sort((a, b) => {
      return b.points - a.points;
    });
    console.log(scoreCard);
}
  
function clearHighScore() {
    while (scoreCard.length !== 0) {
      scoreCard.pop();
      listPlayers.removeChild(listPlayers.firstChild);
    }
    playerNum = 0;
    score = 60;
    scoreCard = [];
}
  
btnStart.addEventListener("click", start);
btnNext.addEventListener("click", showQuestion);
btnSubmit.addEventListener("click", submit);
btnHighScore.addEventListener("click", displayScoreCard);
btnBack.addEventListener("click", function () {
    quizStartMenu.classList.remove("hide");
    scoreCardEl.classList.add("hide");
});

btnClear.addEventListener("click", clearHighScore);
  
// Timer Implementation
  
const setTimer = () => {
    score--;
    if (score <= 0) {
      clearInterval(id);
      questionContainer.classList.add("hide");
      quizEndMenu.classList.remove("hide");
      quizStartMenu.classList.add("hide");
      scoreEl.innerText = score;
    }
    timerEl.innerText = `${score}`;
};
  