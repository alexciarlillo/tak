import Phaser from 'phaser'

export default class extends Phaser.Plugin.Isometric.IsoSprite {
  constructor ({ game, x, y, z, asset, frame, group, board }) {
    super(game, x, y, z, asset, frame, group);

    game.physics.isoArcade.enable(this);
    this.body.collideWorldBounds = true;
    this.scale.set(0.5, 0.5);
    this.anchor.set(0.5, 0);
    this.pieces = [];
    this.inputEnabled = true;
    this.board = board;
    this.events.onInputDown.add(this.selectPieces, this);
  }

  selectPieces(tile) {
    for(var piece of tile.pieces) {
      if(!this.board.moving) {
        piece.selected = true;
        this.board.moving = true;
      } else {
        piece.selected = false;
        this.board.moving = false;
      }
    }
  }

  static get WIDTH() {
    return 80;
  }
}
