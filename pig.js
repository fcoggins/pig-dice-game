//initialize variables

var winning_score = 100;
var player = null;
var computer = null;
var result = null;
var person_name = "Player";

//Player object

function Player() {
    this.score = 0; //total score
    this.roll = 0; //turn score
}

Player.prototype.turn = function(){

    if (this.type === "player"){
        printStatus(this.name + "'s turn. Roll or Hold.");
    } else {
        printStatus(this.name + "'s Turn");
    }
    alert ("Roll Dice");
    result = dice.roll();
    if (result === 1) {
        this.roll = 0;
        this.displayTurn(result);
        printStatus(this.name + " busted.");
        alert (this.name + 'Busted');
        this.end();
    } else {
        this.roll += result;
        this.displayTurn(result);
        if (this.score + this.roll >= winning_score){
            this.win();
        }
    alert ("result = " + result);
    }
};

Player.prototype.displayTurn = function (result) {
    printNumber(result, this.type + "-placeholder");
    printScore(this.roll, this.type + "-turn-score");
};

Player.prototype.win = function(){
    printStatus(this.name + " WINS!!!");
    printNumber("0", "player-placeholder");
    printNumber("0", "computer-placeholder");
    printScore(player.score, "player-total-score");
    printScore(computer.score, "computer-total-score");
    printScore(" ", "player-turn-score");
    printScore(" ", "computer-turn-score");
};

Player.prototype.printEndOfTurn = function(){
    //result = 0;
    this.score += this.roll;
    this.roll = 0;
    printScore(this.score, this.type + "-total-score");
    printScore(this.roll, this.type + "-turn-score");
}

//Person Object inherits from Player

function Person(name) {
    Player.call(this);
    this.name = name;
    this.type = "player";
}

Person.prototype = Object.create(Player.prototype);

Person.prototype.end = function(){
    player.printEndOfTurn();
    alert("Computer's turn");
    result = 0;
    computer.play();
}

//Computer Object inherits from Player

function Computer() {
    Player.call(this);
    this.type = "computer";
    this.name = "Computer";
}

Computer.prototype = Object.create(Player.prototype);

Computer.prototype.end = function() {
    computer.printEndOfTurn();
    alert(this.type); 
    alert("players turn");
    printStatus(player.name + "'s Turn. Roll or Hold.");
};

Computer.prototype.play = function(){
    choice = computerChoice.roll();
    if (choice !== 1 && result !== 1){
        computer.turn();
        computer.play();
    } else if (choice === 1) {
        alert('Computer Holds');
        computer.end();
        result = 0;
        choice = 0;
    } else {
        alert("Computer busted");
        result = 0;
        choice = 0;
    }
};

//Start the game

player = new Person(person_name);
computer = new Computer();
printStatus(player.name + "'s Turn. Roll to Begin.");
var rollButton = document.getElementById("roll_button");
var holdButton = document.getElementById("hold_button");
var myButton = document.getElementById("my_button");
printName(player);

//Button functionality
myButton.onclick = function(){
    document.getElementById('intro').style.display = "none";
    document.getElementById('main').style.display =  "block";
};
rollButton.onclick = function(){
    player.turn();
};
holdButton.onclick = function(){
    player.end();
};