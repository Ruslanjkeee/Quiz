const quizData = [
    {
        question: '11 - 1 - 1 = ?',
        a: 0,
        b: 9,
        c: 10,
        d: 11,
        answer: 9,
    },
    {
        question: '3 + 8 = ?',
        a: 10,
        b: 13,
        c: 12,
        d: 11,
        answer: 11,
    },
    {
        question: '4 * 5 = ?',
        a: 45,
        b: 36,
        c: 20,
        d: 22,
        answer: 20,
    },
    {
        question: '4 + 5 * 2 = ?',
        a: 14,
        b: 22,
        c: 9,
        d: 12,
        answer: 14,
    },
    {
        question: '11 * 11 - 1 = ?',
        a: 121,
        b: 111,
        c: 110,
        d: 120,
        answer: 120,
    },
    {
        question: '(55 - 54) * 55 = ?',
        a: 1,
        b: 54,
        c: 55,
        d: 56,
        answer: 55,
    },
    {
        question: '25 * 4 - 50 = ?',
        a: 100,
        b: 50,
        c: 25,
        d: 150,
        answer: 50,
    },
    {
        question: '1 + 2 * 3 = ?',
        a: 6,
        b: 9,
        c: 7,
        d: 5,
        answer: 7,
    },
    {
        question: '33 - 3 * 3 + 3 = ?',
        a: 33,
        b: 333,
        c: 27,
        d: 30,
        answer: 27,
    },
];

const quiz = document.querySelector('.quiz_questions');
const quizIndicator = document.querySelector('.quiz_indicator');
const questionNumberHTML = document.querySelector('.indicator_current');
const totalQuestionsHTML = document.querySelector('.indicator_total');
const correctAnswer = document.querySelector('.hints_correct');
const incorrectAnswer = document.querySelector('.hints_incorrect');
let questionNumber = 0;
let numberCorrectAnswers = 0;

totalQuestionsHTML.textContent = quizData.length;

function isAnswerTrue(userAnswer) {
    return userAnswer.textContent == quizData[questionNumber - 1].answer;
}

function renderQuestion() {
    // show indicator
    quizIndicator.classList.remove('hide');
    questionNumberHTML.textContent = questionNumber + 1;

    // removing animation
    if(correctAnswer.classList.contains('hints--anim')) {
        correctAnswer.classList.remove('hints--anim');
    }

    if(incorrectAnswer.classList.contains('hints--anim')) {
        incorrectAnswer.classList.remove('hints--anim');
    }

    let item = quizData[questionNumber];
    let data = `        
        <div class='questions_item'>
            <p class="question">${item.question}</p>
            <ul class="answers">
                <li class="answer">${item.a}</li>
                <li class='answer'>${item.b}</li>
                <li class="answer">${item.c}</li>
                <li class="answer">${item.d}</li>
            </ul>
        </div>`
    quiz.innerHTML = data;
    questionNumber++;

    // add animation
    document.querySelector('.questions_item').classList.add('fadeIn');
    // turn on pointer events
    quiz.classList.remove('pointer-off');
}

function renderQuizEnd() {
    // turn on pointer events
    quiz.classList.remove('pointer-off');
    quizIndicator.classList.add('hide');
    let data = `
        <div class='questions_item'>
            <p class='question'>Congratulations! Your score is ${numberCorrectAnswers} / ${quizData.length}</p>
            <button class="quiz_repeat">Try again</button>
        </div> 
    `;
    quiz.innerHTML = data;
    
    // add animation
    document.querySelector('.questions_item').classList.add('fadeIn');

    // add listener to repeat the game
    document.querySelector('.quiz_repeat').addEventListener('click', function(event) {
        questionNumber = 0;
        numberCorrectAnswers = 0;
        renderQuestion();
    });
}

quiz.addEventListener('click', (event) => {
    let target = event.target;
    if(target.tagName !== 'LI') return;
    // turn off pointer events to prevent many clicks
    quiz.classList.add('pointer-off');
    let quistionsItem = document.querySelector('.questions_item');

    //check if answer is true, add animation
    if( isAnswerTrue(target) ) {
        numberCorrectAnswers++;
        correctAnswer.classList.add('hints--anim');
    } else {
        incorrectAnswer.classList.add('hints--anim');
    } 
    quistionsItem.classList.add('fadeOut');
    
    // render after animation is over
    if(questionNumber < quizData.length) {
        quistionsItem.addEventListener('animationend',  renderQuestion);
    } else {
        quistionsItem.addEventListener('animationend',  renderQuizEnd);
    }
});

renderQuestion();

