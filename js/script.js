'use strict';

// Declaring constants

const question = document.getElementById('question');
const options = Array.from(document.querySelectorAll('.option-text'));
const optionsClass = Array.from(document.querySelectorAll('.options'));
const correctPopUp = document.querySelector('.correct-pop');
const overlay = document.querySelector('.overlay');
const exit = document.querySelector('#exit');
const exitPop = document.querySelector('.exit-prompt')
const exitConfirm = Array.from(document.querySelectorAll('.exit-but'));

// Initial variable values
let score = 0;
let currentQuestion = {};
let remainingQuestions = [];
let questionCounter = 0;
let questionNumber = document.querySelector('.question-number');
let acceptingAnswers = false;
let scoreLadder = Array.from(document.querySelectorAll(`.score-box`))
let scoreLadderReversed = scoreLadder.reverse();
let scoreTotal = 0;
let previousLadder = questionCounter - 1;


//
const maxQuestions = 15;

// Exit button

function exitBtn (){
    exitPop.classList.remove('hidden');
    exitPop.classList.add('overlay');
};

exit.addEventListener('click', exitBtn);

function exitClicked () {
    for (let i=0; i <= exitConfirm.length; i++){
        exitConfirm.addEventListener('click', function (){
            console.log(exitConfirm[i].innerText)
        });
    };
}

let allQuestions = [
    {
        question: "What sort of animal is Walt Disney's Dumbo?",
        
        option1: "Deer",
        
        option2: "Rabbit",
        
        option3: "Elephant",
        
        option4: "Donkey", 

        answer: 2
    },

    {
        question: "What was the name of the Spanish waiter in the TV sitcom Fawlty Towers?",
        
        option1: "Manuel",

        option2: "Pedro",
        
        option3: "Alfonso",
        
        option4: "Javier",

        answer: 3
    },

    {   
        question: "Which battles took place between the Royal Houses of York and Lancaster?",

        option1: "Thirty Years War",

        option2: "Hundred Years War",
        
        option3: "War of the Roses",
        
        option4: "English Civil War",

        answer: 3
    },

    {
        question: "Which former Beatle narrated the TV adventures of Thomas the Tank Engine?",

        option1: "John Lennon",

        option2: "Paul McCartney",
        
        option3: "George Harrison",
        
        option4: "Ringo Starr",

        answer: 1
    },

    {
        question: "Queen Anne was the daughter of which English Monarch?",

        option1: "James II",

        option2: "Henry VIII",
        
        option3: "Victoria",
        
        option4: "William I",

        answer: 2
    },

    {
        question: "Who composed Rhapsody in Blue?",

        option1: "Irving Berlin",

        option2: "George Gershwin",
        
        option3: "Aaron Copland",
        
        option4: "Cole Porter",

        answer: 4
    },
    
    {
        question: "What is the Celsius equivalent of 77 degrees Fahrenheit?",

        option1: "15",

        option2: "20",
        
        option3: "25",
        
        option4: "30",

        answer: 3
    },

    {
        question: "Suffolk Punch and Hackney are types of what?",

        option1: "Carriage",

        option2: "Wrestling style",
        
        option3: "Cocktail",
        
        option4: "Horse",

        answer: 1
    },

    {
        question: "Which Shakespeare play features the line Neither a borrower, nor a lender be?",

        option1: "Hamlet",

        option2: "Macbeth",
        
        option3: "Othello",
        
        option4: "The Merchant of Venice",

        answer: 4
    },

    {
        question: "Which is the largest city in the USA's largest state?",

        option1: "Dallas",

        option2: "Los Angeles",
        
        option3: "New York",
        
        option4: "Anchorage",

        answer: 3
    },

    {
        question: "The word \"aristocracy\" literally means power in the hands of whom?",

        option1: "The few",

        option2: "The best",
        
        option3: "The barons",
        
        option4: "The rich",

        answer: 1
    },

    {
        question: "Where would a \"peruke\" be worn?",

        option1: "Around the neck",

        option2: "On the head",
        
        option3: "Around the waist",
        
        option4: "On the wrist",

        answer: 2
    },

    {
        question: "In which palace was Queen Elizabeth I born?",

        option1: "Greenwich",

        option2: "Richmond",
        
        option3: "Hampton Court",
        
        option4: "Kensington",

        answer: 4
    },

    {
        question: "From which author's work did scientists take the word \"quark\"?",

        option1: "Lewis Carroll",

        option2: "Edward Lear",
        
        option3: "James Joyce",
        
        option4: "Aldous Huxley",

        answer: 1
    },

    {
        question: "Which of these islands was ruled by Britain from 1815 until 1864?",

        option1: "Crete",

        option2: "Cyprus",
        
        option3: "Corsica",
        
        option4: "Corfu",

        answer: 3
    },
];


// Default Game Behaviour and values

function gameInit (){
    questionCounter = 0;
    // questionNumber = questionCounter;
    remainingQuestions = [...allQuestions];
    loadNextQuestion();    
};




// Loading the Next questions

function loadNextQuestion () {
    if (remainingQuestions.length === 0 || questionCounter >= maxQuestions) {
        //go to the end page
        return window.location.assign('/end.html');
    };
    // saving game score
    localStorage.setItem('lastScore', scoreTotal);

    questionCounter++;
    questionNumber.innerText = questionCounter;
    const questionGenerator = Math.floor(Math.random() * remainingQuestions.length);
    currentQuestion = remainingQuestions[questionGenerator];
    question.innerHTML = currentQuestion.question;

    // Choosing corresponding options to the questions
    options.forEach( option => {
        const dataNumber = option.dataset["number"];
        option.innerHTML = currentQuestion[`option${dataNumber}`];
    })

    // removing used Question
    remainingQuestions.splice(questionGenerator, 1);

    // Setting Score and Score Ladder
    scoreLadderReversed.splice(0, 1);
    scoreTotal = scoreLadderReversed[0].innerHTML;
    
    // Visualizing the score ladder
    
    document.querySelector(`.ladder${questionCounter}`).classList.add('ladder-level');
    
    // Remove previous ladder background
    setTimeout (() => {
        document.querySelector(`.ladder${questionCounter-1}`).classList.remove('ladder-level');
    }, 100);
    


    acceptingAnswers= true;

};


// Checking for selected answer

for (let i = 0; i<options.length; i++){
    options[i].addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        if(selectedAnswer == currentQuestion.answer){
            correctPopUp.classList.remove('hidden');
            optionsClass[i].classList.add('correct-bg');
            overlay.classList.remove('hidden');
            console.log(scoreTotal);
            setTimeout (() => {
                correctPopUp.classList.add('hidden');
                optionsClass[i].classList.remove('correct-bg');
                overlay.classList.add('hidden');
                loadNextQuestion(); 
            }, 2000);

                // Guarantee Ladder
    if (document.querySelector(`.ladder${questionCounter}`).classList.contains('guarantee')){
        setTimeout (() => {
            document.querySelector(`.ladder-level`).style.backgroundColor = '';
        }, 500);
        document.querySelector(`.ladder-level`).style.backgroundColor = 'transparent';
        setTimeout (() => {   
            document.querySelector(`.ladder-level`).style.backgroundColor = 'green';
        }, 1000);
    } else {
        // scoreTotal = 0;
    }
        } else {
                // console.log(remainingQuestions[questionGenerator].answer);
                optionsClass[i].classList.add('wrong-bg');

                setTimeout (() => {
                    // optionsClass[i].classList.remove('wrong-bg');
                    window.location.assign('end.html')
                }, 2000)
        };
        
        
    });
    };
    


gameInit ();