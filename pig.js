//initialize variables

var winning_score = 100;
var player = null;
var computer = null;
var result = null;
var computerRoll;


//Player object

function Player() {
    this.score = 0; //total score
    this.roll = 0; //turn score
}

Player.prototype.turn = function(){
    if (this.type === "player"){
         printStatus(this.name + "'s turn.");
    } else {
        printStatus(this.name + "'s turn.");
    }
    result = dice.roll();
    writeComputerStatus(this.name + " rolled a " + result + ". ");
    if (result === 1) {
        this.roll = 0;
        this.displayTurn(result);
        writeComputerStatus(this.name + " busted. ");
        this.end();
    } else {
        this.roll += result;
        this.displayTurn(result);
        if (this.score + this.roll >= winning_score){
            this.win();
        }
    }
};

Player.prototype.displayTurn = function (result) {
    printNumber(result, this.type + "-placeholder");
    printScore(this.roll, this.type + "-turn-score");
};

Player.prototype.win = function(){
    printStatus(this.name + " WINS!!!");
    //printNumber("0", "player-placeholder");
    printScore(this.score + this.roll, this.type + "-total-score");
    printScore("0", this.type + "-turn-score");
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
    disableButton('roll_button');
    disableButton('hold_button');
    player.printEndOfTurn();
    printStatus("Computer's turn");
    result = 0;
    var numRolls = 0;
    computer.play(numRolls);
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
    printStatus(player.name + "'s turn.");
    enableButton('roll_button');
    enableButton('hold_button');
};

Computer.prototype.play = function(numRolls){
    computerRoll = setTimeout(function(){
        var choice = computerChoice.roll();
        numRolls += 1;
        if (numRolls === 1){
            choice = 0;
        }
        if (choice !== 1 && result !== 1){
            computer.turn();
            computer.play(numRolls);
        } else if (choice !== 1) {
            clearTimeout(computerRoll);
            result = 0;
            computer.end();
        } else {
            clearTimeout(computerRoll);
            writeComputerStatus('Computer Holds. ');
            result = 0;
            computer.end();
        }
    }, 1000);
};

//Start the game

var myButton = document.getElementById("my_button");
var rollButton = document.getElementById("roll_button");
var holdButton = document.getElementById("hold_button");

//Button functionality

myButton.onclick = function(){
    document.getElementById('intro').style.display = "none";
    document.getElementById('main').style.display =  "block";
    player = new Person(document.getElementById('person_name').value);
    if (! player.name){
        player.name = "Player";
    }
    computer = new Computer();
    printStatus(player.name + "'s Turn. Roll to Begin.");
    printName(player);
};
rollButton.onclick = function(){
    // hideComputerStatus();
    player.turn();
};
holdButton.onclick = function(){
    hideComputerStatus();
    printStatus("Computer's turn.");
    writeComputerStatus(player.name + " Holds. ");
    player.end();
};
// continueButton.onclick = function(){
//     hideComputerStatus();
// }