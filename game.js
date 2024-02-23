var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

$(document).on("keypress", function (event) {
  if (!started) {
    nextSequence();
    started = true;
  } else {
    console.log("Already in game!");
  }
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
  $("#level-title").html("Level " + level);
  level++;
}

$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);

  playSound(userChosenColor);
  animatePress(userChosenColor);
});

function playSound(name) {
  var sound = new Audio("./sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  var colorId = "#" + currentColor;
  $(colorId).addClass("pressed");
  setTimeout(function () {
    $(colorId).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
