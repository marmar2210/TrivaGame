// Questions
var triviaQuestions = [
  {
    question: "What is Mac's first name?",
    answerList: ["Peter", "Matthew", "Ronald", "Billy"],
    answer: 2
  },
  {
    question: "What does the 'I' stand for in the Dennis system?",
    answerList: ["Initiate breakup", "Inspire hope", "Invent danger", "Invest"],
    answer: 1
  },
  {
    question: "What was the name of Frank's street gang from the '50s?",
    answerList: [
      "Yellow Jacket Boys",
      "The Pecan Sandies",
      "The Freight Train",
      "Dirty Deeds"
    ],
    answer: 0
  },
  {
    question: "What was Dee's nickname in highschool?",
    answerList: [
      "Fatty Magoo",
      "The Gangly Bird",
      "The Aluminum Monster",
      "The Truck"
    ],
    answer: 2
  },
  {
    question:
      "What name do Dennis, Mac, and Charlie wrestle under when they put on a show for the troops?",
    answerList: [
      "The Eagles of Pain",
      "The Fowl of Action",
      "War Birds",
      "The Birds of War"
    ],
    answer: 3
  },
  {
    question: "What was Frank's nickname from his business days?",
    answerList: ["Trash Man", "The Warthog", "Froggy", "Littleman"],
    answer: 1
  },
  {
    question:
      "Which of the following are the correct ingredients for fight milk?",
    answerList: [
      "Milk, yoghurt and rum",
      "Milk, eggs and vodka",
      "Milk, cat food and tequila",
      "Milk, ketchup and whiskey"
    ],
    answer: 1
  },
  {
    question: "What is Mac and Charlie's shared annual Christmas tradition?",
    answerList: [
      "Throwing rocks at trains.",
      "Breaking into houses together to steal presents.",
      "Attending midnight mass.",
      "Delivering stolen presents to the orphanage."
    ],
    answer: 0
  },
  {
    question:
      "What's the flip cup drinking game that Paddy's Pub has been banned from (twice)?",
    answerList: [
      "Flip Cup Championships",
      "Flipsylvania",
      "Flipadelphia",
      "Fliperty Bell"
    ],
    answer: 2
  },
  {
    question: "'Kitten Mittens! You'll be.....",
    answerList: ["Smitten", "Sittin' happy", "Bitten", "Kitten me"],
    answer: 0
  }
];

console.log(triviaQuestions);

var gifArray = [
  "question1",
  "question2",
  "question3",
  "question4",
  "question5",
  "question6",
  "question7",
  "question8",
  "question9",
  "question10"
];
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;
var messages = {
  correct: "Yes, that's right!",
  incorrect: "Sorry, that's not right.",
  endTime: "Out of time!",
  finished: "Alright! Let's see how well you did."
};

$("#startBtn").on("click", function() {
  $(this).hide();
  newGame();
});

$("#startOverBtn").on("click", function() {
  $(this).hide();
  newGame();
});

function newGame() {
  $("#finalMessage").empty();
  $("#correctAnswers").empty();
  $("#incorrectAnswers").empty();
  $("#unanswered").empty();
  currentQuestion = 0;
  correctAnswer = 0;
  incorrectAnswer = 0;
  unanswered = 0;
  newQuestion();
}

function newQuestion() {
  $("#message").empty();
  $("#correctedAnswer").empty();
  $("#gif").empty();
  answered = true;

  //sets up new questions & answerList
  $("#currentQuestion").html(
    "Question #" + (currentQuestion + 1) + "/" + triviaQuestions.length
  );
  $(".question").html(
    "<h2>" + triviaQuestions[currentQuestion].question + "</h2>"
  );
  for (var i = 0; i < 4; i++) {
    var choices = $("<div>");
    choices.text(triviaQuestions[currentQuestion].answerList[i]);
    choices.attr({ "data-index": i });
    choices.addClass("thisChoice");
    $(".answerList").append(choices);
  }
  countdown();
  //clicking an answer will pause the time and setup answerPage
  $(".thisChoice").on("click", function() {
    userSelect = $(this).data("index");
    clearInterval(time);
    answerPage();
  });
}

function countdown() {
  seconds = 15;
  $("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
  answered = true;
  //sets timer to go down
  time = setInterval(showCountdown, 1000);
}

function showCountdown() {
  seconds--;
  $("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
  if (seconds < 1) {
    clearInterval(time);
    answered = false;
    answerPage();
  }
}

function answerPage() {
  $("#currentQuestion").empty();
  $(".thisChoice").empty(); //Clears question page
  $(".question").empty();

  var rightAnswerText =
    triviaQuestions[currentQuestion].answerList[
      triviaQuestions[currentQuestion].answer
    ];
  var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
  $("#gif").html(
    '<img src = "assets/images/' +
      gifArray[currentQuestion] +
      '.gif" width = "400px">'
  );

  //checks to see correct, incorrect, or unanswered
  if (userSelect == rightAnswerIndex && answered == true) {
    correctAnswer++;
    $("#message").html(messages.correct);
  } else if (userSelect != rightAnswerIndex && answered == true) {
    incorrectAnswer++;
    $("#message").html(messages.incorrect);
    $("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
  } else {
    unanswered++;
    $("#message").html(messages.endTime);
    $("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
    answered = true;
  }

  if (currentQuestion == triviaQuestions.length - 1) {
    setTimeout(scoreboard, 4500);
  } else {
    currentQuestion++;
    setTimeout(newQuestion, 4500);
  }
}

function scoreboard() {
  $("#timeLeft").empty();
  $("#message").empty();
  $("#correctedAnswer").empty();
  $("#gif").empty();

  $("#finalMessage").html(messages.finished);
  $("#correctAnswers").html("Correct Answers: " + correctAnswer);
  $("#incorrectAnswers").html("Incorrect Answers: " + incorrectAnswer);
  $("#unanswered").html("Unanswered: " + unanswered);

  var audioElement = document.createElement("audio");
  audioElement.setAttribute("src", "assets/images/wildCard.mp3");
  $("#startOverBtn").addClass("reset");
  $("#startOverBtn").show();
  $("#startOverBtn").html("Start Over?");
  $("#startOverBtn").on("click", function() {
    audioElement.play();
  });
}
