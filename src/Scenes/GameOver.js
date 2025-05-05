class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");
    }

    init(data) {
        this.finalScore = data.score;
    }

    create() {
        this.add.text(300, 200, "GAME OVER", {
            fontFamily: 'Times',
            fontSize: 48,
            color: '#ff0000'
        });

        this.add.text(300, 260, `Score: ${this.finalScore}`, {
            fontFamily: 'Times',
            fontSize: 24,
            color: '#000'
        });

        this.add.text(250, 350, "Press SPACE to Restart", {
            fontFamily: 'Times',
            fontSize: 20,
            color: '#000'
        });

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start("level_1");
        });
    }

    
}