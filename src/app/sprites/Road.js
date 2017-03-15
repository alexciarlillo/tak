import Phaser from 'phaser'

export default class extends Phaser.Plugin.Isometric.IsoSprite {
  constructor ({ game, x, y, z, asset, frame, group }) {
    super(game, x, y, z, asset, frame, group);

    game.physics.isoArcade.enable(this);
    this.body.collideWorldBounds = true;
    this.scale.set(0.5, 0.5);
    this.anchor.set(0.5, 0);
  }

  update() {
    if(this.selected) {
      this.body.velocity.setTo(0,0);
      this.body.allowGravity = false;
      this.body.position.z = 25;
    } else {
      this.body.allowGravity = true;
    }
  }

  static get WIDTH() {
    return 80;
  }
}
