/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber() {
  return Math.floor(Math.random() * 100) + 1
}

// Fetch the Players Guess

function playersGuessSubmission() {
  var playersGuess = +$('#subNum').val();

  // Store guess in array and display
  if (arrGuesses.length == 1) {
    arrGuesses.unshift(' and');
  };
  arrGuesses.unshift(' ' + playersGuess);
  $('#textGuesses').text('You have guessed' + arrGuesses);
  $('#textGuesses').show();

  // clear guess
  $('#subNum').val('');


  // I'm not sure how to run this if statement and stop if the checkGuess comes back true
  if (playersGuess == winningNumber) {
    alert('You Win!!!');

    // hide all content except play again button
    hideContent();

    // edit message
    $('#lives').prepend('You won with ');
    $('#footMessage').append('<br> Congratulations!');
    for (i = 0; i < 3; i++) {
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

    // lose a life
    var lives = +$('#lives').text() - 1;
    $('#lives').text(lives);
    if (lives == 0) {
      alert('Sorry, you lost :(!')
      hideContent();
      $('.footer').animate({
        fontSize: '60px'
      }, 3000);

    } else if (lives == 1) {
      $('#footMessage').text('Last Guess Remaining');
    };

  }
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(sub) {
  var diffAbs = Math.abs(winningNumber - sub);
  if (sub > winningNumber) {
    alert(diffAbs + ' you should submit a lower number ' + winningNumber)
      //   have this go into storage for hint
  } else if (sub < winningNumber) {
    alert('you should submit a higher number ' + winningNumber)
      // have this go into storage for hint
  }
}

function hideContent() {
  $('.contents').hide('slow');
  $('#optButdiv').appendTo('.footer');
  $('#hint').hide();
}
// Check if the Player's Guess is the winning number 

function checkGuess(sub) {
  // add code here if(sub==winningNumber) { alert('You Win!!!') };
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint() {
  // add code here
}

// Allow the "Player" to Play Again

function playAgain() {
  winningNumber = generateWinningNumber();
  arrGuesses = [];
  // ^ These are my global variables...
  $('#lives').text(5);
  $('#footMessage').text('Guesses Remaining');
  $('#textGuesses').text('Please input your guess between 1-100');


  // reset game ending actions
  $('.footer').animate({
    width: "30%"
  });
  $('.contents').show();
  $('#optButdiv').appendTo('.contents');
  $('#hint').show();

  // reset losing changes
  $('.footer').css('fontSize', '');

  alert('A new Number is being generated for you!');

}


/* **** Event Listeners/Handlers ****  */
$('document').ready(function() {
  playAgain();
  $('#subButton').click(playersGuessSubmission);
  // 13 is the code for the "enter" key that keypress accepts.
  /*  $('form').keypress(function(e) {
      if (e.which == 13) {
        alert('enter press');
        return false;
    });
    */
  $('#again').click(playAgain);
  $('#hint').click(provideHint);


});
