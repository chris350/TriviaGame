// Initial values
let counter = 30;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;


// if the time runs out move to the next question

function nextQuestion() {

    const isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
    if (isQuestionOver) {
         displayResult();
    } else {
   currentQuestion++;
   loadQuestion();
    }
}

//start a 30 second timer for user to respond or choose an answer to each question

function timeUp() {
clearInterval(timer);

lost++

preloadImage('lost');
setTimeout(nextQuestion, 3 * 1000);
}

function countDown() {
    counter--;

    $('#time').html('Time:' + counter);
    
    if (counter === 0) {
        timeUp();
    }
} 

//display the question and the choices in the browser
function loadQuestion() {
    counter = 30;
    timer = setInterval(countDown, 1000);

    const question = quizQuestions[currentQuestion].question;
    const choices = quizQuestions[currentQuestion].choices;

    $('#timer').html( 'Time:' + counter);
    $('#game').html(`
        <h4>${question}</h4>
        ${loadChoices(choices)}
        ${loadRemainingQuestion()}
    `);

}

function loadChoices(choices) {
let result = '';

   for (let i=0; i < choices.length; i++ ) {
       result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`
   }

   return result;
}

//either correct or wrong move onto the next question

// event delegation
$(document).on('click', '.choice', function() {
    clearInterval(timer);
    const selectedAnswer = $(this).attr('data-answer');
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer
     console.log("selectedAnswer",selectedAnswer);
     console.log("correctAnswer", correctAnswer);
    if (correctAnswer === selectedAnswer) {
        score++;
        preloadImage('win');
        setTimeout(nextQuestion, 3 * 1000);
    } else {
        lost++;
        preloadImage('lost');
        setTimeout(nextQuestion, 3 * 1000);
    }
});


function displayResult() {
    const result = `
       <p>you got ${score} questions right</p>
       <p>you missed ${lost} questions right</p>
       <p>total ${quizQuestions.length} questions right</p>
       <button class="btn btn-dark" id="reset">Reset</button>
    `;

    $('#game').html(result);
}

$(document).on('click', '#reset', function() {
  counter = 30;
  currentQuestion = 0;
  score = 0;
  lost = 0;
  timer = null ;

  loadQuestion();
});


function loadRemainingQuestion() {
    const remainingQuestion = quizQuestions.length - (currentQuestion + 1)
    const totalQuestion = quizQuestions.length;

    return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;
}


function randomImage(images) {
     const random = Math.floor(Math.random() * images.length);
     const randomImage = images[random];
     return randomImage;
}


//display giphy for right and wrong answer

function preloadImage(status) {
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (status === 'win') {
        $('#game').html(`
        <p class="preload-image">Correct</p>
        <p class="preload-image">Correct answer was <b>${correctAnswer}</b></p>
        <img src="${randomImage(funImages)}"/>
        `);
    } else {
        $('#game').html(`
        <p class="preload-image">the correct answer is <b>${correctAnswer}</b></p>
        <p class="preload-image">Dead</p>
        <img src="${randomImage(sadImages)}"/>
        `);
    }
}

$('#start').click(function() {
   $('#start').remove();
   $('#time').html(counter);
   loadQuestion();
});