"use strict";
function init() {
  var timeLeft = $('#timer').val();
  var started = false;
  var timer;
  var score;

  var reset = function() {
    $('#score').val(0);
    $('#a').val('A');
    $('#b').val('B');
    $('.modal').modal();
  };

  var timeUp = function() {
    started = false;
    console.log("Finished!");
    reset();
  };

  var incrementScore = function() {
    score = parseInt($('#score').val())+2;
    $('#score').val(score);
    $('#message').html('Your score is <b>'+ score +'</b>.  Press Enter to Start')
  };

  var resetProblem = function() {
    $('#a').val(math.randomInt(1, 20));
    $('#b').val(math.randomInt(1, 20));
    $('#answer').val('');
  };

  var startGame = function() {
    console.log("Start!");
    $("#answer").focus();
    resetProblem();
    timer = setInterval(function() {
      timeLeft = $('#timer').val();
      if (timeLeft == 0) {
        timeUp();
        clearInterval(timer);
        $('#timer').val(30);
        return;
      }
      $('#timer').val(timeLeft-1);
    }, 1000);
  };

  $('#answer').keypress(function(e) {
    // enter key
    if(e.keyCode == 13 && started) {
      var a = parseInt($('#a').val(), 10);
      var b = parseInt($('#b').val(), 10);
      var answer = parseInt($('#answer').val(), 10);
      if (a + b == answer) {
        console.log("Correct!");
        incrementScore();
        resetProblem();
      }
      else {
        console.log("Wrong!");
        $('#answer').val('');
      }
    }
  });

  //https://stackoverflow.com/questions/4331022/focus-input-box-on-load
  var input = document.getElementById("answer").focus();
  $("[autofocus]").on("focus", function() {
    if (this.setSelectionRange) {
      var len = this.value.length * 2;
      this.setSelectionRange(len, len);
    } else {
      this.value = this.value;
    }
    this.scrollTop = 999999;
  }).focus();

  $('.modal').on($.modal.AFTER_CLOSE, function(event, modal) {
    if (!started) {
      started = true
      startGame();
    }
  });

  $(document).keypress(function(e) {
    if (e.keyCode == 13 && $.modal.isActive()) {  // enter key
      $.modal.close();
      $('#answer').focus();
    }
  });
  $(window).click(function(e) {
    if ($.modal.isActive()) {
      $.modal.close();
      $('#answer').focus();
    }
  });

  $.modal.defaults.showClose = false;
  $('.modal').modal();
}
window.onload = init;
