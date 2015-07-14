//var score = 0;

function printNumber(number, id) {
  var placeholder = document.getElementById(id);
  placeholder.innerHTML = number;
}

function printScore(currentScore, id) {
    document.getElementById(id).innerHTML = currentScore;
}

function printName(player) {
    document.getElementById("name").innerHTML = player.name;
}

function printStatus(message) {
    document.getElementById("message").innerHTML = message;
}