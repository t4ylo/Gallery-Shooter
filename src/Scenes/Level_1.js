class Level_1 extends Phaser.Scene {
    constructor() {
        super("level_1");

        // Initialize a class variable "my" which is an object.
        // The object has two properties, both of which are objects
        //  - "sprite" holds bindings (pointers) to created sprites
        //  - "text"   holds bindings to created bitmap text objects
        this.my = {sprite: {}, text: {}};

        // Create a property inside "sprite" named "bullet".
        // The bullet property has a value which is an array.
        // This array will hold bindings (pointers) to bullet sprites
        this.my.sprite.bullet = [];   
        this.maxBullets = 10;           // Don't create more than this many bullets
        
        this.myScore = 0;       // record a score as a class variable
        // More typically want to use a global variable for score, since
        // it will be used across multiple scenes
    }

    preload() {
        // player stuff
        this.load.setPath("./assets/");
        this.load.image("cow", "cow.png");
        this.load.image("heart", "heart.png");
        this.load.image("player-proj", "laserYellow_burst.png");
        this.load.audio("pew-player", "laserRetro_004.ogg"); 

        // space stuff
        this.load.image("norm-alien", "shipBlue_manned.png");
        this.load.image("brut-alien", "shipPink_manned.png");
        this.load.image("norm-proj", "laserBlue1.png");
        this.load.image("brut-proj", "laserPink2.png");
        this.load.audio("pew-norm", "laserSmall_001.ogg"); 
        this.load.audio("pew-brut", "laserLarge_002.ogg"); 
        this.load.audio("explode-norm", "lowFrequency_explosion_000.ogg"); 
        this.load.audio("explode-brut", "lowFrequency_explosion_001.ogg"); 

        //background/landscape stuff
        this.load.image("level_1_bg", "backgroundColorGrass.png");
        this.load.image("level_1_house", "house2.png");

        // For animation
        this.load.image("blackSmoke00", "blackSmoke00.png");
        this.load.image("blackSmoke01", "blackSmoke01.png");
        this.load.image("blackSmoke02", "blackSmokef02.png");
        this.load.image("blackSmoke03", "blackSmokef03.png");

        // Load the Kenny Rocket Square bitmap font
        // This was converted from TrueType format into Phaser bitmap
        // format using the BMFont tool.
        // BMFont: https://www.angelcode.com/products/bmfont/
        // Tutorial: https://dev.to/omar4ur/how-to-create-bitmap-fonts-for-phaser-js-with-bmfont-2ndc
        this.load.bitmapFont("rocketSquare", "KennyRocketSquare_0.png", "KennyRocketSquare.fnt");

        
    }

    create() {
        let my = this.my;
        this.sfx = {};

        my.sprite.background = this.add.sprite(game.config.width/2, game.config.height/2, "level_1_bg");
        my.sprite.house = this.add.sprite(game.config.width -75, game.config.height -250, "level_1_house");
        my.sprite.house.setScale(0.5);

        my.sprite.cow = this.add.sprite(game.config.width/2, game.config.height - 40, "cow");
        my.sprite.cow.setScale(0.5);

        this.path = this.add.path(50, 100);           
        this.path.lineTo(750, 100);                   
        my.sprite.alien1 = this.add.follower(this.path, 50, 100, "norm-alien").setScale(0.5);
        this.my.sprite.alienBullets = [];
        this.alienBulletSpeed = 4;

        this.time.addEvent({
            delay: 1000,  
            callback: this.fireAlienBullet,
            callbackScope: this,
            loop: true
        });


        my.sprite.alien1.startFollow({
            duration: 5000,        
            repeat: -1,           
            yoyo: true,           
            ease: 'Sine.easeInOut'
        });


        my.sprite.alien1.scorePoints = 100;

        

        this.anims.create({
            key: "puff",
            frames: [
                { key: "blackSmoke00" },
                { key: "blackSmoke01" },
                { key: "blackSmoke02" },
                { key: "blackSmoke03" },
            ],
            frameRate: 20,    // Note: case sensitive (thank you Ivy!)
            repeat: 5,
            hideOnComplete: true
        });

        this.playerLives = 3;
        this.my.sprite.hearts = [];


        for (let i = 0; i < 3; i++) {
            let heart = this.add.sprite(30 + i * 40, 30, "heart").setScale(0.5);
            this.my.sprite.hearts.push(heart);
        }
        // Create key objects
        this.left = this.input.keyboard.addKey("A");
        this.right = this.input.keyboard.addKey("D");
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Set movement speeds (in pixels/tick)
        this.playerSpeed = 10;
        this.bulletSpeed = 10;

        // update HTML description
        document.getElementById('description').innerHTML = '<h2>Level 1.js</h2><br>A: left // D: right // Space: fire/emit'

        // Put score on screen
        my.text.score = this.add.bitmapText(550, 0, "rocketSquare", "Score " + this.myScore);

        this.sfx.player = this.sound.add("pew-player");
        this.sfx.norm = this.sound.add("pew-norm");
        this.sfx.brut = this.sound.add("pew-brut");

        this.sfx.norm_ex = this.sound.add("explode-norm");
        this.sfx.brut_ex = this.sound.add("explode-brut");

    }

    update() {
        let my = this.my;

        // Moving left
        if (this.left.isDown) {
            // Check to make sure the sprite can actually move left
            if (my.sprite.cow.x > (my.sprite.cow.displayWidth/2)) {
                my.sprite.cow.x -= this.playerSpeed;
            }
        }

        // Moving right
        if (this.right.isDown) {
            // Check to make sure the sprite can actually move right
            if (my.sprite.cow.x < (game.config.width - (my.sprite.cow.displayWidth/2))) {
                my.sprite.cow.x += this.playerSpeed;
            }
        }

        // Check for bullet being fired
        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            if (my.sprite.bullet.length < this.maxBullets) {
                let newBullet = this.add.sprite(
                    my.sprite.cow.x,
                    my.sprite.cow.y - (my.sprite.cow.displayHeight / 2),
                    "player-proj"
                );
                newBullet.setScale(0.25);  // Scale it down here
                my.sprite.bullet.push(newBullet);
            }
            this.sfx.player.play()
        }

        
        my.sprite.bullet = my.sprite.bullet.filter((bullet) => bullet.y > -(bullet.displayHeight/2));
        
        
        for (let bullet of my.sprite.bullet) {
            if (this.collides(my.sprite.alien1, bullet)) {
                this.puff = this.add.sprite(
                    my.sprite.alien1.x, my.sprite.alien1.y, "blackSmoke03"
                ).setScale(0.25).play("puff");

                this.sfx.norm_ex.play({ volume: 2.5 })
            
                bullet.y = -100;
            
                // Make alien invisible instead of moving it
                this.my.sprite.alien1.setAlpha(0);
            
                // Update score
                this.myScore += my.sprite.alien1.scorePoints;
                this.updateScore();
            
                // Make alien reappear after puff finishes
                this.puff.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                    this.my.sprite.alien1.setAlpha(1);
                }, this);
            }
            
        }

       
        for (let bullet of my.sprite.bullet) {
            bullet.y -= this.bulletSpeed;
        }

        for (let bullet of my.sprite.alienBullets) {
            bullet.y += this.alienBulletSpeed;
        }
        
        
        my.sprite.alienBullets = my.sprite.alienBullets.filter(b => b.y < config.height + b.displayHeight / 2);

        for (let bullet of my.sprite.alienBullets) {
            if (this.collides(my.sprite.cow, bullet)) {
                bullet.y = config.height + 100;  
                this.playerLives--;
        
                if (this.playerLives >= 0) {
                    this.my.sprite.hearts[this.playerLives].setVisible(false);
                }
        
                
                if (this.playerLives <= 0) {
                    this.gameOver();
                }
        
                break;  
            }
        }

    }

    
    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }

    updateScore() {
        let my = this.my;
        my.text.score.setText("Score " + this.myScore);
    
        if (this.myScore >= 500) {
            this.scene.start("level_2", { score: this.myScore });
        }
    }

    fireAlienBullet() {
        let my = this.my;
        let bullet = this.add.sprite(
            my.sprite.alien1.x,
            my.sprite.alien1.y + my.sprite.alien1.displayHeight / 2,
            "norm-proj"
        );
        bullet.setScale(0.5);
        my.sprite.alienBullets.push(bullet);
        this.sfx.norm.play()
    }

    gameOver() {
        
        this.scene.start("gameOver", { score: this.myScore });
    
    }

}