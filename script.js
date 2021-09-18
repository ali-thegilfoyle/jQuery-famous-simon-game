// for keyboard keys press.
$(document).keypress(function (event) {
  start();
});

function playSound(buttonKey) {
  switch (buttonKey) {
    case "green":
      var audio = new Audio("sounds/green.mp3");
      break;
    case "red":
      var audio = new Audio("sounds/red.mp3");
      break;
    case "yellow":
      var audio = new Audio("sounds/yellow.mp3");
      break;
    case "blue":
      var audio = new Audio("sounds/blue.mp3");
      break;
  }
  audio.play();
  animate(buttonKey);
}

function animate(buttonKey) {
  $("." + buttonKey)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

// game logic.
// Initial level
var level;
var randomNumber;
var buttons = ["green", "red", "yellow", "blue"];
var sequenceHistory;
var index;

function start() {
  level = 1;
  randomNumber = generateRandomNumber();
  sequenceHistory = [];
  index = 0;

  // update title
  $("#level-title").text("Level " + level);

  playSound(buttons[randomNumber]);
  sequenceHistory.push(randomNumber);
}

$(".btn").on("click", function () {
  var pressedButton = this.id;
  playSound(pressedButton);

  sequenceButton = buttons[sequenceHistory[index]];
  if (pressedButton === sequenceButton) {
    if (index == sequenceHistory.length - 1) {
      setTimeout(function () {
        levelUp();
      }, 1000);
    } else {
      index++;
    }
  } else {
    $("#level-title").text("Game Over! Press Any Key to Restart");
  }
});

function levelUp() {
  // update title
  level++;
  $("#level-title").text("Level " + level);

  randomNumber = generateRandomNumber();
  playSound(buttons[randomNumber]);
  sequenceHistory.push(randomNumber);

  //reset index;
  index = 0;
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 4);
}
