var buttonColours=["green","red","blue","yellow"];

var randomChosenColour;

var gamePattern=[];

var userClickedPattern=[];

var started=false;

var level=0;

function nextSequence(){
    userClickedPattern=[];
    var randomVariable=Math.floor(Math.random()*4);
    randomChosenColour=buttonColours[randomVariable];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("level-"+level);
}

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){
    if(!started){
        $("h1").text("level-"+level);
        nextSequence();
        started=true;
    }
});

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
      if(currentLevel===gamePattern.length-1){
        setTimeout(function(){
            nextSequence();

        },1000);
      }
    }
    else{
        var snd=new Audio("sounds/wrong.mp3");
        snd.play();
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },100);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }
  }

  function startOver(){
    level=0;
    started=false;
    gamePattern=[];
  }