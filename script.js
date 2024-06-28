const startbtn = document.querySelector('.start-btn');
const popupinfo = document.querySelector('.popup-info');
const exitbtn = document.querySelector('.exit-btn');
const continuebtn = document.querySelector('.continue-btn')
const main = document.querySelector('.main');
const quizsection = document.querySelector('.quiz-section');
const quizbox = document.querySelector('.quiz-box');
const resultbox = document.querySelector('.result-box');
const tryagainbtn = document.querySelector('.tryagain-btn');
const goHomebtn = document.querySelector('.goHome-btn');

startbtn.onclick = () => {
    popupinfo.classList.add('active');
    main.classList.add('active'); //when we click on start we get quiz guide and to back background blur till we are reading guide we are using this
}
exitbtn.onclick = () => {
    popupinfo.classList.remove('active');
    main.classList.remove('active');
}
continuebtn.onclick = () => {
    quizsection.classList.add('active');
    popupinfo.classList.remove('active');
    main.classList.remove('active');
    quizbox.classList.add('active');
    showQuestions(0);
    questionCounter(1);
    headerScore()
}

tryagainbtn.onclick = () => {
    quizbox.classList.add('active');
    nextbtn.classList.remove('active');
    resultbox.classList.remove('active');

    questionCount = 0;
    questionNumber = 1;
    userscore = 0;

    showQuestions(questionCount);
    questionCounter(questionNumber);

    headerScore();
}

goHomebtn.onclick = () => {
    quizsection.classList.remove('active');
    nextbtn.classList.remove('active');
    resultbox.classList.remove('active');

    questionCount = 0;
    questionNumber = 1;
    userscore = 0;

    showQuestions(questionCount);
    questionCounter(questionNumber);
}

let questionCount = 0;
let questionNumber = 1;
let userscore = 0;

const nextbtn = document.querySelector('.next-btn');

nextbtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);
        questionNumber++;
        questionCounter(questionNumber);
        nextbtn.classList.remove('active');
    }
    else {
        showResultBox();
    }
}

const optionlist = document.querySelector('.option-list');

function showQuestions(index) {
    const questionText = document.querySelector('.ques-text');
    questionText.textContent = `${questions[index].number}. ${questions[index].question}`;

    let optiontag = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`

    optionlist.innerHTML = optiontag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}
function optionSelected(answer) {
    let useranswer = answer.textContent;
    let correctanswer = questions[questionCount].answer;
    let alloption = optionlist.children.length;

    if (useranswer == correctanswer) {
        answer.classList.add('correct');
        userscore++;
        headerScore();
    }
    else {
        answer.classList.add('incorrect');
        for (let i = 0; i < alloption; i++) {
            if (optionlist.children[i].textContent == correctanswer) {
                optionlist.children[i].setAttribute('class', 'option correct');
            }
        }
    }

    for (let i = 0; i < alloption; i++) {
        optionlist.children[i].classList.add('disabled');
    }

    nextbtn.classList.add('active');
}

function questionCounter(index) {
    const questotal = document.querySelector('.ques-total');
    questotal.textContent = `${index} of ${questions.length} Questions`;
}
function headerScore(){
    const headerScoretext = document.querySelector('.header-score');
    headerScoretext.textContent = `Score: ${userscore} / ${questions.length}`;
}

function showResultBox() {
    quizbox.classList.remove('active');
    resultbox.classList.add('active');

    const scoretext = document.querySelector('.score-text');
    scoretext.textContent = `Your Score is ${userscore} out of ${questions.length}`;

    const circularprogress = document.querySelector('.circular-progress');
    const progressvalue = document.querySelector('.progress-value');
    let startvalue = 0;
    let progressendvalue =(userscore / questions.length) * 100;
    let speed= 10;
    
    let progress = setInterval(() =>{
       startvalue++;
       progressvalue.textContent = `${startvalue}%`;
       circularprogress.style.background = `conic-gradient(blue ${startvalue * 3.6}deg, rgb(85, 83, 83) 0deg)`;
       if(startvalue == progressendvalue){
        clearInterval(progress);
       }
    },speed);
}