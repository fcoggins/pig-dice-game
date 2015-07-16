//initialize variables

var timer = null;
var winning_score = 100;
var player = null;
var computer = null;
var person_name = "Player";

//Player object

function Player() {
    this.score = 0;
}

Player.prototype.turn = function(){

    if (this.type === "player"){
        printStatus(this.name + "'s turn. Roll or Hold.");
    } else {
        printStatus(this.name + "'s Turn");
    }
    var result = dice.roll();
    if (result == 1) {
        this.score = 0;
        this.displayTurn(result);
        printStatus(this.name + " busted.");
        setTimeout(function(){
        },1000);
        this.end();
    } else {
        this.score += result;
        this.displayTurn(result);
        if (this.score >= winning_score){
            this.win();
        }
    }
};

Player.prototype.displayTurn = function (result) {
    printNumber(result, this.type + "-placeholder");
    printScore(this.score, this.type + "-score");
};

Player.prototype.win = function(){
    printStatus(this.name + " WINS!!!");
    clearInterval(timer);
    player.score = 0;
    computer.score = 0;
    printNumber("0", "player-placeholder");
    printNumber("0", "computer-placeholder");
    printScore("", "player-score");
    printScore("", "computer-score");
};

Player.prototype.stop = function(){
    clearInterval(timer);
};

Player.prototype.end = function() {
    if (this.type === "player") {
        player.stop();
        computer.play();
    } else {
        computer.stop();
        printStatus(player.name + "'s Turn. Roll or Hold.");
    }
};

//Person Object inherits from Player

function Person(name) {
    Player.call(this);
    this.name = name;
    this.type = "player";
}

Person.prototype = Object.create(Player.prototype);

Person.prototype.hold = function(){
    computer.play();
};

//Computer Object inherits from Player

function Computer() {
    Player.call(this);
    this.type = "computer";
    this.name = "Computer";
}

Computer.prototype = Object.create(Player.prototype);

Computer.prototype.play = function(){
    timer = setInterval(function(){
        computer.turn();
        var choice = computerChoice.roll();
        if ( choice === 1) {    
            printStatus("Computer Holds");
            setTimeout(function(){
                computer.end();
        },1000);           
        }
    }, 2000);  
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
    player.hold();
};