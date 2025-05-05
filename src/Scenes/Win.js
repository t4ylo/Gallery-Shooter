class Win extends Phaser.Scene {
    constructor() {
        super("win");
    }

    init(data) {
        this.finalScore = data.score;
    }

    create() {

        this.add.text(275, game.config.height/2 - 20, "YOU WIN!", {
            fontFamily: 'Times',
            fontSize: 48,
            color: '#00aa00'
        })

        this.add.text(275, game.config.height/2 + 50, "Press SPACE to play again", {
            fontFamily: 'Times',
            fontSize: 20,
            color: '#ffffff'
        })

        this.input.keyboard.once("keydown-SPACE", () => {
            this.scene.start("level_1");
        });
    }
}