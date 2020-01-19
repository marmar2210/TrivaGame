// global variables

var resultsCorrect = 0;
var resultsIncorrect = 0;
var noAnswer = 0;
var seconds = 15;
var questionIndex = 0;
var intervalId;

//questions array in an object
var questions = [
  {
    display: "What is the name of Rocko's dog?",
    answers: ["Sparky", "Spanner", "Punkin", "Spunky", "Sputnik"],
    correctAnswer: "Spunky",
    imageSrc: "assets/images/spunky.gif",
    message: "The name of Rocko's dog is Spunky."
  },
  {
    display: "Which is NOT a team on Legends of the Hidden Temple?",
    answers: [
      "Green Monkeys",
      "Purple Parrots",
      "Orange Orangutans",
      "Silver Snakes",
      "Red Jaguars"
    ],
    correctAnswer: "Orange Orangutans",
    imageSrc: "assets/images/Legends.gif",
    message:
      "'Orange Orangutans' is NOT a team on Legends of the Hidden Temple."
  },
  {
    display: "What is always the final challenge in Nickelodeon GUTS?",
    answers: [
      "Vertiboggan",
      "Aggro Crag",
      "Slam-A-Jama",
      "Eat My Dust",
      "Dodge It"
    ],
    correctAnswer: "Aggro Crag",
    imageSrc: "assets/images/aggroCrag.gif",
    message: "The fifth and final event is the Aggro Crag."
  },

  {
    display: "What is Stimpy's favorite song?",
    answers: [
      "Everyone Wants a Log",
      "Tickle Tickle Ichy Pickle",
      "I LOVE MY LITTER",
      "Three Blind Mice",
      "HAPPY HAPPY JOY JOY!!"
    ],
    correctAnswer: "HAPPY HAPPY JOY JOY!!",
    imageSrc: "assets/images/REV.gif",
    message: "Stimpy's favorite song is HAPPY HAPPY JOY JOY!!"
  },

  {
    display:
      "What does the monster community use as currency in 'Aaahh!!! Real Monsters'?",
    answers: [
      "toe nails",
      "boogers",
      "nuts and bolts",
      "Hair clippings",
      "skin flakes"
    ],
    correctAnswer: "toe nails",
    imageSrc: "assets/images/monsters.gif",
    message: "The monsters use toe nails as a form of currency."
  }
];

function nextQuestion() {
  if (questionIndex < questions.length - 1) {
    questionIndex++;
    timerReset();
    $("#questions").css("visibility", "visible");
    $("#afterClick").css("visibility", "hidden");
    displayAnswers();
  } else {
    clearInterval(intervalId);
    alert("end game");
    $("#afterClick").css("visibility", "hidden");
    $("#results").css("visibility", "visible");
  }
}

function startTimer() {
  intervalId = setInterval(count, 1000);
  $("#startButton").css("visibility", "hidden");
  $("#questions").css("visibility", "visible");
}

function count() {
  seconds--;

  if (seconds === 0) {
    checkAnswer(false);
  }

  $("#questionTimer").html("<p>" + seconds + "</p");
}

function timerReset() {
  seconds = 15;
  $("#questionTimer").html("<p>" + seconds + "</p");
}

function resetQuiz() {
  questionIndex = 0;
  resultsCorrect = 0;
  resultsIncorrect = 0;
  $("#results").css("visibility", "hidden");
  displayAnswers();
  startTimer();
  timerReset();
}

//loop through answers array
function displayAnswers() {
  var q = questions[questionIndex];
  $("#triviaQuestion").html(q.display);
  for (var i = 0; i < q.answers.length; i++) {
    var id = i + 1;
    $("#answer" + id).html(q.answers[i]);
  }
  console.log(q.display);
}

//on Click function, tallys score and checks right/wrong/no answer
function checkAnswer(isClick, userAnswer) {
  var msg = "";
  if (!isClick) {
    msg = "Sorry, time's up! ";
    noAnswer++;
    $("#noAnswer").text("Not answered: " + noAnswer);
  } else if (userAnswer === questions[questionIndex].correctAnswer) {
    msg = "Correct!! ";
    resultsCorrect++;
    $("#resultsCorrect").text("Correct answers: " + resultsCorrect);
  } else {
    msg = "Wrong!! ";
    resultsIncorrect++;
    $("#resultsIncorrect").text("Incorrect answers: " + resultsIncorrect);
  }

  $("#afterClick").css("visibility", "visible");
  $("#questions").css("visibility", "hidden");
  $("#gif").attr("src", questions[questionIndex].imageSrc);
  $("#confirm").text(msg + questions[questionIndex].message);
  setTimeout(nextQuestion, 5000);
}

//continuation of on Click funtion, passes user anwser so "this" will work
$(".answerSection").on("click", ".answer", function() {
  var userAnswer = $(this).text();
  checkAnswer(true, userAnswer);
});

displayAnswers();
