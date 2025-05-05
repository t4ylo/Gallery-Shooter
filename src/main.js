
// debug with extreme prejudice
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 800,
    height: 600,
    scene: [Start, Level_1, Level_2, GameOver, Win] ,
    fps: { forceSetTimeOut: true, target: 30 }
}

const game = new Phaser.Game(config);