/*You will be creating an automated version of the classic card game WAR.
Think about how you would build this project and write your plan down.
 Consider classes such as Card, Deck, and Player and what fields and methods they might each have.
  You can implement the game however you’d like (i.e. printing to the console, using alert, or some other way). 
  The completed project should, when ran, do the following:
-	Deal 26 Cards to two Players from a Deck. 
-	Iterate through the turns where each Player plays a Card
-	The Player who played the higher card is awarded a point
o	Ties result in zero points for either Player
-	After all cards have been played, display the score.
Write a Unit Test using Mocha and Chai for at least one of the functions you write.
*/

// class to create players, each with a name, score and a hand of cards(initially empty)
class Player {
    constructor(name){
         // this is refering to the object being created, you have to add the properties
        this.name = name; 
        this.turn = false;
        this.score = 0;
        this.hand = [];
    }

    pickCard() {
        // check at the beginning you have cards to pick
        if (this.hand.length == 0) {
            throw new Error("The hand is empty, you can't pick any more cards");
        }

        // take one card out at the top of the deck
        let card = this.hand.shift();

        // return the card taken
        return card;
    }
}

// class of card to set up cards as objects, each card has a rank(number) and a suit(hearts, diamonds, etc)
class Card {
    constructor(rank, suit) {
        this.rank = rank;
        this.suit = suit;
    }

    // return some text that represents the card
    toString() {
        // assign the rank to a new variable, to manipulate easier
        let name = this.rank;

        // check for names like 11, 12, 13 and 100

        // if the saved name is one of these it's changed to the actual name of that card
        if (name == 11) {

            name = 'Jack';

        } else if(name == 12) {

            name = 'Queen';

        } else if (name == 13) {

            name = 'King';

        } else if (name == 100) {

            name = 'Ace';

        }


        // then the name is going to be the right name
        return name + ' of ' + this.suit;
    }
}


// to create a deck with 52 cards, can deal cards to players
class Deck {
    constructor() {
        this.cards = [];
        this.length = 52;
        this.newRandomDeck();
    }


    // generates a new deck with all 52 cards in random order
    newRandomDeck() {
        // the deck as an empty array
        const deck = [];

        // the ranks that we'll use for the loops
        const ranks = [2,3,4,5,6,7,8,9,10,11,12,13,100];

        // the suits we'll use for the loops
        const suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];

        // first loop is for the suits
        for (let suit of suits) { // this is just another way of making a loop for an array (rather than: let i = 0; i < arr.lenght; i++)
            // for each suit you've got a second loop for the ranks
            for (let rank of ranks) {
                // make a new card
                let card = new Card(rank, suit);

                // push a new card into deck
                deck.push(card);
            }
            
        }

        // at this point we have a deck with all cards in order inside deck(array)

        // to shuffle the cards
        // add all the cards to the cards array(the array of the object) randomly
        // repeat 52 times
        for (let i = 0; i < 52; i++) {
            // gets a random index from the cards array
            let index = getRandomInt(deck.length);

            // splices out an array(a portion) from the index specified with one card(you get an array of one card)
            let portion = deck.splice(index, 1);

            // get the card from the array returned from splice
            let card = portion[0];

            // deal a card randomly into the array
            this.cards.push(card);
        }
    }

    // pick the card at the top of the deck
    pickCard() {
        // check at the beginning you have cards to pick
        if (this.length == 0) {
            console.log("The deck is empty, you can't pick any more cards");
            return null;
        }

        // take one card out at the top of the deck
        let card = this.cards.shift();

        // decrease the length of deck by 1
        this.length--;

        // return the card taken
        return card;
    }

    // deal half deck to one player, and half to the other
    dealHalfDeck(player1, player2) {
        // deal a random card to each player 26 times
        for (let  i = 0; i < 26; i++) {
            player1.hand.push(this.pickCard());
            player2.hand.push(this.pickCard());
        }
        // at this point both players should have 26 cards each
    }
}

s

// helper function, gets random number from 0 to max(not included)
function getRandomInt(max) {
    if (max <= 0) return "minimum value should be 1";
    let min = 0;
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// THE GAME
function warGame() {
    // create a new deck object based on the deck class(build/generate deck). then call the methods so you have something to run. 
    let deck = new Deck();

    // create two players
    let player1 = new Player('Player 1');
    let player2 = new Player('Player 2');

    // deal all cards to both players
    deck.dealHalfDeck(player1, player2);

    // play the turns, 26 turns in total
    for (let turn = 1; turn <= 26; turn++) {
        // player 1 picks a card
        let card1 = player1.pickCard();

        // same thing for player 2
        let card2 = player2.pickCard();

        // Compare cards
        // if p1 has the higher card
        if (card1.rank > card2.rank) {
            // display message and increase score
            console.log(`${card1} vs ${card2}, ${card1} wins!`);
            player1.score++;
        } else if (card2.rank > card1.rank) {
            // display message and increase score
            console.log(`${card1} vs ${card2}, ${card2} wins!`);
            player2.score++;
        } else {
            // display message and leave score as it is
            console.log(`${card1} vs ${card2}, it's a tie!`);
        }
    }

    // Display the score at the end
    console.log(`SCORE:\nPlayer 1: ${player1.score}\tPlayer 2: ${player2.score}`);

    // return the winner
    if (player1.score > player2.score) {
        return "Player 1 wins!";
    } else if (player1.score < player2.score) {
        return "Player 2 wins!";
    } else {
        return "It's a tie!";
    }
}

// play the game
warGame();


//module.exports = {Deck, Card, Player};