import Phaser from 'phaser'

export default class extends Phaser.State {
  init() {
    this.stage.backgroundColor = '#333';
    this.time.advancedTiming = true;
    // Add and enable the plug-in.
    this.game.plugins.add(new Phaser.Plugin.Isometric(this.game, null, Phaser.Plugin.Isometric.ISOMETRIC));
    this.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
    this.physics.isoArcade.gravity.setTo(0, 0, -500);
  }

  preload() {
    for(var dir of ['n', 's', 'e', 'w']) {
      this.load.image(`tile-${dir}`, `../assets/tile-${dir}.png`);
      this.load.image('road', '../assets/road-n.png');
    }

    // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
    // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
    this.game.iso.anchor.setTo(0.5, 0.1);
  }

  create() {
    this.state.start('Game');
  }
}
