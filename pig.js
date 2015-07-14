function Game() {

}

function Player() {
    this.score = 0;
}

Player.prototype.turn = function(){
    var result = dice.roll();
    if (this.type === "player"){
        printStatus(this.name + "'s turn. Roll or Hold.")
    } else {
        printStatus(this.name + "'s Turn")
    }
    if (result == 1) {
        result += " bust";
        this.score = 0;
        this.displayTurn(result);
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
}

Player.prototype.win = function(){
    printStatus(this.name + " WINS!!!");
    player.score = 0;
    computer.score = 0;
    printNumber("", "player-placeholder");
    printNumber("", "computer-placeholder");
    printScore("", "player-score");
    printScore("", "computer-score");
    this.type = "player";
};

Player.prototype.stop = function(){
    printStatus(player.name + "'s Turn. Roll or Hold.");
    clearInterval(timer);
};

Player.prototype.end = function() {
    if (this.type === "player") {
        computer.play();
    } else {
        computer.stop();
    }
};

function Person(name) {
    Player.call(this);
    this.name = name;
    this.type = "player";
}

Person.prototype = Object.create(Player.prototype);

Person.prototype.hold = function(){
    computer.play();
};

function Computer() {
    Player.call(this);
    this.type = "computer";
    this.name = "Computer";
}

Computer.prototype = Object.create(Player.prototype);

Computer.prototype.play = function(){
    timer = setInterval(function(){
        console.log("tick");
        computer.turn();
        var choice = computerChoice.roll();
        if ( choice === 1) {
            printStatus("Computer Busted. Roll Dice.");
            computer.end();
        }
    }, 1500);  
};


var timer = null;
var winning_score = 20;
var player = new Person("Florie");
var computer = new Computer();
printStatus(player.name + "'s Turn. Roll to Begin.");
var rollButton = document.getElementById("roll_button");
var holdButton = document.getElementById("hold_button");
printName(player);
rollButton.onclick = function(){
    player.turn();
};
holdButton.onclick = function(){
    player.hold();
};