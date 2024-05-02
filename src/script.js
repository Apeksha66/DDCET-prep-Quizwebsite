const startBtn = document.querySelector(".start-btn");
const popupInfo = document.querySelector(".popup-info");
const exitBtn = document.querySelector(".exit-btn");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".continue-btn");
const quizSection = document.querySelector(".quiz-section");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

startBtn.onclick = () => {
  popupInfo.classList.add("active");
  main.classList.add("active");
};
exitBtn.onclick = () => {
  popupInfo.classList.remove("active");
  main.classList.remove("active");
};
continueBtn.onclick = () => {
  quizSection.classList.add("active");
  popupInfo.classList.remove("active");
  main.classList.remove("active");
  quizBox.classList.add("active");

  showQuestions(0);
  questionCounter(1);
  headerScore();
};


function tryAgainBtn() {
  const resultBox = document.querySelector(".result-box");
  quizBox.classList.add("active");
  resultBox.classList.remove("active");
  nextBtn.classList.remove("active");

  questionCount = 0;
  questionNumb = 1;
  userScore = 0;
  showQuestions(questionCount);
  questionCounter(questionNumb);
  headerScore();
}

function goHomeBtn() {
  const resultBox = document.querySelector(".result-box");
  quizSection.classList.remove("active");
  resultBox.classList.remove("active");
  nextBtn.classList.remove("active");

  questionCount = 0;
  questionNumb = 1;
  userScore = 0;
  showQuestions(questionCount);
  questionCounter(questionNumb);

  //headerScore();
}

let questionNumb = 1;
let userScore = 0;
let questionCount = 0;

const nextBtn = document.querySelector(".next-btn");
nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    showQuestions(questionCount);

    questionNumb++;
    questionCounter(questionNumb);

    nextBtn.classList.remove("active");
  } else {
    showResultBox();
  }
};

//getting questions and options from array
function showQuestions(index) {
  const optionList = document.querySelector(".option-list");
  const questionText = document.querySelector(".question-text");
  questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

  let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
      <div class="option"><span>${questions[index].options[1]}</span></div>
      <div class="option"><span>${questions[index].options[2]}</span></div>
      <div class="option"><span>${questions[index].options[3]}</span></div>`;

  optionList.innerHTML = optionTag;
  const option = optionList.querySelectorAll(".option");
  //set onclick attribute to all available options
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

function optionSelected(answer) {
  const optionList = document.querySelector(".option-list");
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer;
  let allOptions = optionList.children.length;

  console.log("102", answer);
  console.log("103", userAnswer);
  console.log("104", correctAnswer);
  //if user has selected  correct answer
  if (userAnswer == correctAnswer) {
    answer.classList.add("correct");
    userScore += 1;
    headerScore();
  } else {
    answer.classList.add("incorrect");

    //if answer is incorrect auto selected correct answer
    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAnswer) {
        optionList.children[i].setAttribute("class", "option correct");
      }
    }
  }

  //if user has selected,disable all option
  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].setAttribute("disabled", "true");
  }

  nextBtn.classList.add("active");
}

function questionCounter(index) {
  const questionTotal = document.querySelector(".question-total");
  questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
 //let userScore = 0;do not open comments
  
  const headerScoreText = document.querySelector(".header-score");
  headerScoreText.textContent = `Score: ${userScore}/ ${questions.length}`;
}

function showResultBox() {

  quizBox.classList.remove('active');
  resultBox.classList.add('active');

  const scoreTest = document.querySelector('.score-test');
  scoreTest.textContent = `Your Score ${userScore} out of ${questions.length}`;

  const circularprogress = document.querySelector('.circular-progress');
  const progressvalue = document.querySelector('.progress-value');

  let progressStartValue = -1;
 // let progressEndValue = (userScore / questions.length) * 100;
  let progressEndValue=(Math.floor((userScore/questions.length)*100));
  let speed = 20;

  let progress = setInterval(() => {
    progressStartValue++;

    if (progressStartValue = progressEndValue) {
      clearInterval(progress);
    }

    progressvalue.textContent = `${progressStartValue}%`;
    circularprogress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255,255,255,.1) 0deg)`;
  }, speed);
}

