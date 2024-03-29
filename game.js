//Initializations:
//Whether the game has started or not.
var started = false;
//Displaying level.
var level = 0;
// When the user pattern is being reset then a false alarm is triggered due to
//the condition that if array current element is not
//Creating arrays for storing colors,pattern generated by game and the user.
var userClickedPattern = [];
var gamePattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];

//It generates the random patterns of the game.
function nextSequence() { //For checking whether the game has started by the entering of key by user.
  started = true;
  console.log(started);
  //It changes the level on te screen.
  level++;
  $("#level-title").text("Level " + level);
  //Random no. generation.
  randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  //Adding animation and sound to button.
  playSound(randomChosenColor);
  animatePress(randomChosenColor);
}
// nextSequence();
//  setTimeout(nextSequence, 1500);
// setTimeout(nextSequence, 3000);
//  setTimeout(nextSequence, 4500);
//  setTimeout(nextSequence, 6000);

//If a button is clicked it gives respective sound and animation
$(".btn").click(function() { //Identifying the colour of button clicked.
  var userChosenColor = this.id;
  console.log(userChosenColor)
  //Adding animation and sound to button.
  playSound(userChosenColor);
  animatePress(userChosenColor);
  //If the game has started then logging the color clicked by user
  if (started !== false) {
    userClickedPattern.push(userChosenColor);
    checkAnswer(level - 1);
  }
});

//plays the sound
function playSound(name) {
  switch (name) {
    case 'red':
      var redSound = new Audio("sounds\\red.mp3");
      redSound.play();
      break;
    case 'blue':
      var blueSound = new Audio("sounds\\blue.mp3");
      blueSound.play();
      break;
    case 'green':
      var greenSound = new Audio("sounds\\green.mp3");
      greenSound.play();
      break;
    case 'yellow':
      var yellowSound = new Audio("sounds\\yellow.mp3");
      yellowSound.play();
      break;
    default:
      alert("TECHNICAL ERROR");
  }
}

//Gives the button press effect
function animatePress(currentColor) { //for white shadow
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
  //for transition to and from white shadow
  $("#" + currentColor).fadeOut().fadeIn();
}

//starting the game
//Checking whether a key has been pressed and ensuring it is pressed only once.
if (started == false) {
  $(document).one("keydown", nextSequence);
}
console.log(started);
//Comparing the patterns.
function checkAnswer(currentLevel) { //If the game has started.
  if (started !== false) { //Checking the length of the array
    if (userClickedPattern.length === gamePattern.length) {
      console.log("sucess" + currentLevel);
      if (JSON.stringify(userClickedPattern) == JSON.stringify(gamePattern)) {
        setTimeout(nextSequence, 1000);
        userClickedPattern = [];
      } else {
        console.log("failure1");
        var wrong = new Audio("sounds\\wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function() {
          $("body").removeClass("game-over");
        }, 1000);
        $("#level-title").text("Game Over, Press Any Key to Restart");
      }

    }
    //This cannot be done as we everytime empty the userPattern
    // for(var i=0;i<currentLevel;i++){
//     if (userClickedPattern[currentLevel] != gamePattern[currentLevel] && userClickedPattern.length !=0) {
    
    if (userClickedPattern[currentLevel] != gamePattern[currentLevel] && userClickedPattern.length !=0) {
      console.log("failure2");
      var wrong = new Audio("sounds\\wrong.mp3");
      wrong.play();
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 1000);
      $("#level-title").text("Game Over, Press Any Key to Restart");
    }
    //   }
  }

}
