
var buttonColours = ["red","blue","green","yellow"];

var userClickedPattern = [];

var gamePattern = [];

var started = false;

var level = 0;

$(".btn").on("click",function()
{
var userChosenColour = $(this).attr("id");
userClickedPattern.push(userChosenColour);
// console.log(userChosenColour);
playSound(userChosenColour);

animatePress(userChosenColour);

checkAnswer(userClickedPattern.length-1);
});

$(document).on("keypress",function(event)
{
  if(!started)
  {
    // $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }

});

function nextSequence()
{
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomnumber = Math.random()*4;
  randomnumber = Math.floor(randomnumber);
  var randomChosenColour = buttonColours[randomnumber];
  gamePattern.push(randomChosenColour);
  // console.log(gamePattern);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);



}

function playSound(name)
{
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");

  setTimeout(function()
{
  $("#"+currentColour).removeClass("pressed");
},100);
}

function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");

    if(userClickedPattern.length == gamePattern.length){

      setTimeout(function()
    {
      nextSequence();

    },1000);
    }
  }

  else
  {
      playSound("wrong");
      $("body").addClass("game-over");

        $("#level-title").text("Game Over, Press Any Key to Restart");


        setTimeout(function()
      {
        $("body").removeClass("game-over");
      },200);



      startOver();
  }

}

function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}
