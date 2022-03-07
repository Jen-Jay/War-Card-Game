const assert = require("chai").assert;
const {Card, Player} = require("./WAR");

describe('Player test', function() {
    let player = new Player("Joe");

    it('testing properties exist', function() {
        assert.property(player, 'name');
        assert.property(player, 'score');
        assert.property(player, 'hand');
    })
    
    it('testing valid player name', function() {
        assert.isString(player.name);
        assert.equal(player.name, 'Joe');
    })

    it('testing initial score', function() {
        assert.equal(player.score, 0);
    })

    it('testing hand array is initially empty', function() {
        assert.lengthOf(player.hand, 0);
    })

    it ('testing pick card', function() {
        // add a card
        let card = new Card(2, "Diamonds");
        player.hand.push(card);

        // the card picked should be the one just added
        assert.equal(player.pickCard(), card);

        // hand should be empty now, after taking out card
        assert.lengthOf(player.hand, 0);

        // trying to pick cards with empty hand should throw error
        assert.throw(player.pickCard);
    })
})