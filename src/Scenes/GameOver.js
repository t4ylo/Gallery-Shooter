class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");
    }


    create() {
        this.add.text(250, game.config.height/2, "GAME OVER", {
            fontFamily: 'Times',
            fontSize: 48,
            color: '#ff0000'
        });

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
 