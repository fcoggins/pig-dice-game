//var score = 0;

function printNumber(number, id) {
  var placeholder = document.getElementById(id);
  var dieDisplay = {
    "0": ' ',
    "1": '<div class = "dot center"></div>',
    "2": '<div class = "dot top left"></div><div class = "dot bottom right"></div>',
    "3": '<div class = "dot top left"></div><div class = "dot center"></div>' + 
        '<div class = "dot bottom right"></div>',
    "4": '<div class = "dot top left"></div><div class = "dot top right"></div>' + 
        '<div class = "dot bottom left"></div><div class = "dot bottom right"></div>',
    "5": '<div class = "dot top left"></div><div class = "dot top right"></div>' + 
        '<div class = "dot bottom left"></div><div class = "dot bottom right"></div>' + 
        '<div class = "dot center"></div>',
    "6": '<div class = "dot top left"></div><div class = "dot top right"></div>' +
        '<div class = "dot bottom left"></div><div class = "dot bottom right"></div>' +
        '<div class = "dot middle left"></div><div class = "dot middle right"></div>'
  };
  var numberStr = number.toString();
  placeholder.innerHTML = dieDisplay[numberStr];
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

function disableButton(id) {
    document.getElementById(id).disabled = true;
}

function enableButton(id) {
    document.getElementById(id).disabled = false;
}

function writeComputerStatus(string){
    document.getElementById('computer-span').innerHTML = string;
    showComputerStatus();
}

function showComputerStatus(){
    document.getElementById('computer-span').style.display =  "inline";
}

function hideComputerStatus(){
   document.getElementById('computer-span').style.display =  "none";
}
