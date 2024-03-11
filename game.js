var config = {
    type: Phaser.AUTO,
    width: 900,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var game = new Phaser.Game(config);

var worldWidth = 9600;
var player;
var drone;
var bomb;
var enemy;
var platforms;
var cursors;
var Score = 0;
var gameOver = false;
var ScoreText;
var star;
function preload() {
    // Load assets
    //#region layers
    this.load.image('layer1', 'assets/background/layer-1.png');
    this.load.image('layer2', 'assets/background/layer-2.png');
    this.load.image('layer3', 'assets/background/layer-3.png');
    this.load.image('layer4', 'assets/background/layer-4.png');
    //#endregion
    this.load.image('platform', 'assets/platform.png')
    this.load.image('drone', 'assets/drone.png')
    this.load.image('bomb', 'assets/bomb.png')
    this.load.spritesheet('Car5',
        'assets/Car5.png',
        { frameWidth: 90, frameHeight: 90 });
}

function create ()
{

    //#region Background

    //#region Create tile sprites for layers
    this.layer1 = this.add.tileSprite(0, 0, worldWidth, game.config.height, "layer1").setOrigin(0, 0);
    this.layer2 = this.add.tileSprite(0, 0, worldWidth, game.config.height, "layer2").setOrigin(0, 0);
    this.layer3 = this.add.tileSprite(0, 0, worldWidth, game.config.height, "layer3").setOrigin(0, 0);
    this.layer4 = this.add.tileSprite(0, 0, worldWidth, game.config.height, "layer4").setOrigin(0, 0);
    //#endregion

    //#region Set scroll factors
    this.layer1.setScrollFactor(0);
    this.layer2.setScrollFactor(0.2);
    this.layer3.setScrollFactor(0.4);
    this.layer4.setScrollFactor(0.6);
    //#endregion

    platforms = this.physics.add.staticGroup();

    //Cycle for platforms
    for (var x = 0; x <= worldWidth; x = x + 2400) {
        platforms.create(x, 700 - 121, 'platform').setOrigin(0, 0).refreshBody();
    }
    //#endregion

    //#region Player

    player = this.physics.add.sprite(100, 450, 'Car5');

    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('plane', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'plane', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('plane', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();
    //#endregion

    //#region Enemy
    //#endregion

    ScoreText = this.add.text(16, 16, 'Score: 0', {fontSize: '50px', fill: '#000'}).setScrollFactor(0);

    this.physics.add.collider(player, platforms);

    this.cameras.main.setBounds(0, 0, worldWidth, 700);
    this.physics.world.setBounds(0, 0, worldWidth, 700);

    // Start camera follow
    this.cameras.main.startFollow(player);

}

function update ()
{
    //#region Movement
    if (cursors.left.isDown) {player.setVelocityX(-600);}
    else if (cursors.right.isDown) {player.setVelocityX(600);}
    else {player.setVelocityX(0);}

    if (cursors.up.isDown) {player.setVelocityY(-330);}
    else if (cursors.down.isDown) {player.setVelocityY(330)}
    else {player.setVelocityY(0);}

    if (cursors.space.isDown) {
        spawnBomb();
    } else {return 0;}
    //#endregion
}

function spawnBomb() {
    this.bomb.create(player.x - 100, player.y - 100, 'bomb')
}

function defeatEnemy(bomb, enemy) {

    enemy.disableBody(true, true);

    Score += 1;
    ScoreText.setText('Score: ' + Score);

}

function hitDrone (player, drone) {
    this.physics.pause();

    player.setTint(0xff0000);


    gameOver = true;
}

for (var x = 0; x < worldWidth; x = x + Phaser.Math.Between(256,500)){
    var y = Phaser.Math.Between(128,810)

    platforms.create(x,y, 'skyGroundStart')
    var i 
    for(i = 1; i<=Phaser.Math.Between(1,5); i++){
    }
    platforms.create(x + 128 * i,y, 'skyGroundEnd')
let score = 0;
//Функція котра допомагає збільшити рахуйнок
function collectStar() {
    score++
    
    document.getElementById("score").innerText = "Score: " + score;
}
//Табло з рахуйнком
function updateScore() {

    document.getElementById("score").innerText = "Score: " + score;
}
//Ініціалізація гри
window.onload = function() {
    updateScore();

    document.getElementById("starButton").addEventListener("click", collectStar);
};
//Зірка
let starImage = document.getElementById("starImage");
starImage.style.display = "block";
//Відображення зірки
starImage.style.position = "absolute";
//Встановлення позиції
starImage.style.top = "100px";
starImage.style.left = "100px";

}