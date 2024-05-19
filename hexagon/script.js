"use strict";
var allSequences = [], grid = {};

function isASequence(a, b, c) {
  for (const seq of allSequences) {
    if (seq[0] == a && seq[1] == b && seq[2] == c) {
      return true;
    }
  }
  return false;
}

function sum(a, b, c) {
  return grid[a] + grid[b] + grid[c];
}

function init() {
  var timeLeft = $('#timer').val();
  var started = false;
  var timer;
  var score;

  //    A B C
  //   D E F G
  //  H I J K L
  //   M N O P
  //    Q R S
  // I thought about representing the grid as a 1D array, but creating connecting lines with numbers there isn't any easy rule
  // giving up on it, and decided to just memorize the relationship (starting with A => [ABC], C => [CGL], G => [GKL], S => [SRQ], ...)
  // of course we need to double this since the sequence can be reversed
  var sequences = [
    ['A', 'B', 'C'],
    ['D', 'E', 'F'],
    ['E', 'F', 'G'],
    ['H', 'I', 'J'],
    ['I', 'J', 'K'],
    ['J', 'K', 'L'],
    ['M', 'N', 'O'],
    ['N', 'O', 'P'],
    ['Q', 'R', 'S'],
    ['C', 'G', 'L'],
    ['B', 'F', 'K'],
    ['F', 'K', 'P'],
    ['A', 'E', 'J'],
    ['E', 'J', 'O'],
    ['J', 'O', 'S'],
    ['D', 'I', 'N'],
    ['I', 'N', 'R'],
    ['H', 'M', 'Q'],
    ['L', 'P', 'S'],
    ['G', 'K', 'O'],
    ['K', 'O', 'R'],
    ['C', 'F', 'J'],
    ['F', 'J', 'N'],
    ['J', 'N', 'Q'],
    ['B', 'E', 'I'],
    ['E', 'I', 'M'],
    ['A', 'D', 'H'],
    ['S', 'R', 'Q'],
    ['P', 'O', 'N'],
    ['O', 'N', 'M'],
    ['L', 'K', 'J'],
    ['K', 'J', 'I'],
    ['J', 'I', 'H'],
    ['G', 'F', 'E'],
    ['F', 'E', 'D'],
    ['C', 'B', 'A'],
    ['Q', 'M', 'H'],
    ['R', 'N', 'I'],
    ['N', 'I', 'D'],
    ['S', 'O', 'J'],
    ['O', 'J', 'E'],
    ['J', 'E', 'A'],
    ['P', 'K', 'F'],
    ['K', 'F', 'B'],
    ['L', 'G', 'C'],
    ['H', 'D', 'A'],
    ['M', 'I', 'E'],
    ['I', 'E', 'B'],
    ['Q', 'N', 'J'],
    ['N', 'J', 'F'],
    ['J', 'F', 'C'],
    ['R', 'O', 'K'],
    ['O', 'K', 'G'],
    ['S', 'P', 'L'],
  ]
  for (const seq of sequences) {
    allSequences.push(seq);
    allSequences.push([...seq].reverse());
  }

  var getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var pickSum = function() {
    var sumHist = {};
    for (let seq of allSequences) {
      let s = sum(seq[0], seq[1], seq[2]);
      if (sumHist[s] == undefined) {
        sumHist[s] = 1;
      } else {
        sumHist[s]++;
      }
    }
    console.log(sumHist);

    let maxKey = -1, max = -1;
    for(const [key, value] of Object.entries(sumHist)) {
      if (max < value) {
        max = value;
        maxKey = key;
      }
    }
    return maxKey;
  };

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

  // initialize
  let alphabet = 'ABCDEFGHIJKLMNOPQRS'.split('');
  for (const i of alphabet) {
    console.log(i);
    grid[i] = getRandomInt(1, 5);
  }
  let targetSum = pickSum();

  console.log(grid);
  console.log("picked " + targetSum);


  $.modal.defaults.showClose = false;
  $('.modal').modal();
}
window.onload = init;
