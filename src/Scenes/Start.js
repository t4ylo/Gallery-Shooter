class Start extends Phaser.Scene {
    constructor() {
        super("start");
    }

    create() {
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.add.text(centerX, centerY - 60, "FARM FIGHT", {
            fontFamily: 'Times',
            fontSize: 48,
            color: '#0033aa'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY, "Press SPACE to Begin", {
            fontFamily: 'Times',
            fontSize: 24,
            color: '#ffffff'
        }).setOrigin(0.5);

        this.add.text(centerX, centerY + 80, "A / D to move • Space to shoot", {
            fontFamily: 'Times',
            fontSize: 16,
            color: '#ffffff'
        }).setOrigin(0.5);

        this.input.keyboard.once("keydown-SPACE", () => {
            this.scene.start("level_1");
        });
    }
}
//window.Start = Start;