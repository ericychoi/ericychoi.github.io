"use strict";
function init() {
  var timeLeft = $('#timer').val();
  var started = false;
  var timer;
  $('#answer').keypress(function(e) {
    if(e.keyCode == 13 && !started) {
      started = true
      timer = setInterval(function() {
        timeLeft = $('#timer').val();
        if (timeLeft == 0) {
          clearInterval(timer);
          started = false;
          $('#timer').val(30);
          return;
        }
        $('#timer').val(timeLeft-1);
      }, 1000);
    }
    // var domAttributes = anime({
    //   targets: '#timer',
    //   value: 0,
    //   duration: 30000,
    //   round: 1,
    //   easing: 'easeInOutExpo'
    // });
  });
  //$('#answer').focus();
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
}
window.onload = init;
$( document ).ready(function() {
  $( "#answer" ).focus();
});
