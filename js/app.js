// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

//Enemy and player collision function
Enemy.prototype.checkCollision = function(player) {
    if (player.x < this.x +75 &&
        player.x + 75 > this.x &&
        player.y < this.y + 20 &&
        player.y + 20 > this.y) {
        player.reset();
    }
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = 0
    }
    this.checkCollision(player);
};



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-horn-girl.png';
};

// The update function confines the player to the screen and calls reset when the player reaches the water
Player.prototype.update = function() {
    if (this.x < 0) {
        this.x = 0
    }
    else if (this.x > 404) {
        this.x = 404
    }
    else if (this.y < 73) {
        alert ("You made it!");
        this.reset()
    }
    else if (this.y > 405) {
        this.y = 405
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This handles player movement using the allowedKeys event listener
Player.prototype.handleInput = function(key) {
    if (key === 'left'){
        this.x -= 101;
    }
    if (key === 'right') {
        this.x += 101;
    }
    if (key === 'up') {
        this.y -= 83;
    }
    if (key === 'down') {
        this.y += 83;
    }
};

// Reset function for player for when water is reached or collision detected 
Player.prototype.reset = function(player) {
    this.x = 202;
    this.y = 405;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(202, 405);

var allEnemies = [new Enemy(0, 62, 300), new Enemy(0, 145, 100), new Enemy (0, 228, 400)];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
