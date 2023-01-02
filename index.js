var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
//to create a next sequence

function nextSequence(){
  userClickedPattern.length=0;
level++;
$("h1").text("Level "+level);
var randomNumber=Math.floor(Math.random()*4);
var randomChosenColour=buttonColors[randomNumber];
gamePattern.push(randomChosenColour);
$("#"+randomChosenColour).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
}
//when we click any button

$(".btn").click(function(event){
  //to get the id of the button
var userChosenColour=event.currentTarget.id;
userClickedPattern.push(userChosenColour);
playSound(userChosenColour)
animatePress(userChosenColour);
checkSequence(userClickedPattern.length-1);
});


//function to play sound

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

//animating the button being pressed

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

// start the game
$(document).on("keypress",function(event){
  if(started==false){
    started= true;
    $("h1").text("Level "+level);
    nextSequence();
}
});

// to check the sequence against each other
function checkSequence(currentLevel){
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");

    if(gamePattern.length===userClickedPattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
  }
}
  else{
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  $("h1").text("Game Over, Press Any Key to Restart");
startOver();
  }

function startOver(){
  level=0;
 started=false;
 gamePattern=[];
}
}
