
var game = new Phaser.Game(1500, 900, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('space', 'sprites/background.png');
    game.load.image('bullet', 'sprites/bullet.png');
    game.load.image('ship', 'sprites/ship.png');
    game.load.image('trail', 'sprites/trail.png');
    game.load.image('asteroid', 'sprites/asteroid.png');

}

var sprite;
var cursors;

var bullet;
var bullets;
var bulletTime = 0;

var trail;
var trails;
var trailTime = 0;

var asteroid;
var asteroids;
var asteroidTime = 0;

var gameover = 0;

var score = 0;

function create() {

    //  This will run in Canvas mode, so let's gain a little speed and display
    game.renderer.clearBeforeRender = false;
    game.renderer.roundPixels = true;

    //  We need arcade physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A spacey background
    game.add.tileSprite(0, 0, game.width, game.height, 'space');

    //  Our ships bullets
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    //  All 40 of them
    bullets.createMultiple(40, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
 
    //  Our ships bullets
    asteroids = game.add.group();
    asteroids.enableBody = true;
    asteroids.physicsBodyType = Phaser.Physics.ARCADE;

    //  All 40 of them
    asteroids.createMultiple(40, 'asteroid');
    asteroids.setAll('anchor.x', 0.5);
    asteroids.setAll('anchor.y', 0.5);

    //  ships trail
    trails = game.add.group();
    trails.enableBody = true;
    trails.physicsBodyType = Phaser.Physics.ARCADE;

    //  All 40 of them
    trails.createMultiple(40, 'trail');
    trails.setAll('anchor.x', 0.5);
    trails.setAll('anchor.y', 0.5);

    //  Our player ship
    sprite = game.add.sprite(300, 300, 'ship');
    sprite.anchor.set(0.5);

    //  and its physics settings
    game.physics.enable(sprite, Phaser.Physics.ARCADE);

    sprite.body.drag.set(100);
    sprite.body.maxVelocity.set(200);

    //  Game input
    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

    //score
    scoreText = game.add.text(16,16,'SCORE: 0', {fontSize: '15px', fill: '#fff'});

    interval = setInterval(function(){
        score += 50;
        scoreText.setText('SCORE: ' + score);
        if (gameover) {
            endGame();
        }
    }, 1000);
}

function update() {

    
    if (gameover) {
        restartGame();
        game.pause();
    }

    if (cursors.up.isDown)
    {
        game.physics.arcade.accelerationFromRotation(sprite.rotation, 200, sprite.body.acceleration);
        fireTrail();
    }
    else
    {
        sprite.body.acceleration.set(0);
    }

    if (cursors.left.isDown)
    {
        sprite.body.angularVelocity = -300;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.angularVelocity = 300;
    }
    else
    {
        sprite.body.angularVelocity = 0;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
        fireBullet();
    }
    spawnAsteroid();
    screenWrap(sprite);

    bullets.forEachExists(screenWrap, this);
    asteroids.forEachExists(screenWrap, this);
    asteroids.forEachExists(collide, this);

}

function fireBullet () {

    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(sprite.body.x + 20, sprite.body.y + 20);
            bullet.lifespan = 2000;
            bullet.rotation = sprite.rotation;
            game.physics.arcade.velocityFromRotation(sprite.rotation + (Math.random()-0.5)*0.2, 400, bullet.body.velocity);
            bulletTime = game.time.now + 200;
        }
    }

}

function fireTrail () {

    if (game.time.now > trailTime)
    {
        trail = trails.getFirstExists(false);

        if (trail)
        {
            trail.reset(sprite.body.x + 20, sprite.body.y + 20);
            trail.lifespan = 2000;
            trail.rotation = sprite.rotation + (Math.random()-0.5)*0.5;
            game.physics.arcade.velocityFromRotation(sprite.rotation + (Math.random()-0.5)*1, (Math.random()-2)*100, trail.body.velocity);
            trailTime = game.time.now + 50;
        }
    }

}

function spawnAsteroid () {

    if (game.time.now > asteroidTime)
    {
        asteroid = asteroids.getFirstExists(false);

        if (asteroid)
        {
            asteroid.reset(sprite.body.x + (Math.random()-0.5)*1000, sprite.body.y + (Math.random()-0.5)*1000);
            asteroid.rotation = sprite.rotation + (Math.random()-0.5)*100;
            game.physics.arcade.velocityFromRotation(sprite.rotation + (Math.random()-0.5)*500, (Math.random()-2)*100, asteroid.body.velocity);
            asteroidTime = game.time.now + 1000;
        }
    }

}

function collide(asteroid) {
    if (Math.abs(sprite.x - asteroid.x) < 40 && Math.abs(sprite.y - asteroid.y) < 40) {
        gameover = 1;
    }
}

function endGame() {
    asteroids.destroy();
    clearInterval(interval);
}

function screenWrap (sprite) {

    if (sprite.x < 0)
    {
        sprite.x = game.width;
    }
    else if (sprite.x > game.width)
    {
        sprite.x = 0;
    }

    if (sprite.y < 0)
    {
        sprite.y = game.height;
    }
    else if (sprite.y > game.height)
    {
        sprite.y = 0;
    }

}

function render() {
}

function restartGame() {
	
    if (confirm("You flew too close to \n\n\nDo you want to restart the game?")) {
        gameover = 0;
        location.reload();
    } else {
        alert("You pressed Cancel. Press 'back' to go back to the intermediary page.");
    }
}
