/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber() {
  return Math.floor(Math.random() * 100) + 1
}

// Fetch the Players Guess

function playersGuessSubmission() {
  // turn off fireworkds from previous win
  $('.header').fireworks('destroy');


  var playersGuess = +$('#subNum').val();
  $('#subNum').val('');
  // take input and clear feild

  // Prevent off base guesses
  if(playersGuess<1 || playersGuess>100) {
    $('#textlowerOrHigher').text('The number is between 1 and 100, silly!');
    return false;
  };

  // Prevent repeat guesses
  for(i=0;i<arrGuesses.length;i++){
    if (arrGuesses == playersGuess) {
      $('#textlowerOrHigher').text('You already guessed that number!');
      return false;
    };
  };


  // Store guess in array and display
  if (arrGuesses.length == 1) {
    arrGuesses.unshift(' and');
  };
  arrGuesses.unshift(' ' + playersGuess);
  $('#textGuesses').text('You have guessed' + arrGuesses);
  $('#textGuesses').show();




  // I'm not sure how to run this if statement and stop if the checkGuess comes back true
  if (playersGuess == winningNumber) {
    // hide all content except play again button
    hideContent();

    // edit message
    $('#lives').prepend('You won with ');
    $('#footMessage').append('<br><br> Congratulations!');
    // Fireworks?
    $('.header').fireworks();

    // footer dance
      for (i = 0; i < 5; i++) {
        $('.footer').animate({
          width: "100%"
        });
        $('.footer').animate({
          width: "40%"
        });
        //Is there way to set this loop until player clicks Play Again?
      };

    

  } else {
    lowerOrHigher(playersGuess);

    // lose a life/game over
    var lives = +$('#lives').text() - 1;
    $('#lives').text(lives);

    if (lives == 0) {    
      $('#lives').text('');
      $('#footMessage').text('GAME OVER');
      hideContent();
      $('.footer').animate({
        fontSize: '60px'
      }, 1500);

    } else if (lives == 1) {
      $('#footMessage').text('Last Guess Remaining');
    };



  }
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(sub) {
  var diffAbs = Math.abs(winningNumber - sub);
  if (sub > winningNumber) {
    $('#textlowerOrHigher').text('You should submit a lower number');
  } else if (sub < winningNumber) {
    $('#textlowerOrHigher').text('You should submit a higher number');
  };

  // hint generator
  provideHint(diffAbs);

}


function hideContent() {
  $('.contents').hide('slow');
  $('#optButdiv').appendTo('.footer');
  $('#hint').hide();
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(diffAbs) {
  if (diffAbs>20) {
    $('#textHint').text('Your guess is way off ' + winningNumber);
  } else if (diffAbs>10) {
    $('#textHint').text('Your guess is not too far');
  } else if (diffAbs>5) {
    $('#textHint').text("You're very close!");
  };
}

// Allow the "Player" to Play Again

function playAgain() {
  winningNumber = generateWinningNumber();
  arrGuesses = [];
  // ^ These are my global variables...

  $('#lives').text(5);
  $('#footMessage').text('Guesses Remaining');
  $('#textGuesses').text('Please input your guess between 1-100');
  $('#textHint').hide();


  // reset game ending actions
  $('.footer').animate({
    width: "30%"
  });
  $('.contents').show();
  $('#optButdiv').appendTo('.contents');
  $('#hint').show();

  // reset losing changes
  $('.footer').css('fontSize', '');

}


/* **** Event Listeners/Handlers ****  */
$('document').ready(function() {
  playAgain();
  $('#subButton').click(playersGuessSubmission);
  // 13 is the code for the "enter" key that keypress accepts.
  $('#subNum').keypress(function(e) {
      if (e.which == 13) {
       playersGuessSubmission();
    };
  });
    
  $('#again').click(playAgain);
  $('#hint').click(function() {
      $('#textHint').toggle();
  });

});
