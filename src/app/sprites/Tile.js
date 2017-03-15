import Phaser from 'phaser';
import Board from '../Board';

export default class extends Phaser.Plugin.Isometric.IsoSprite {
  constructor ({ game, x, y, z, asset, frame, board }) {
    super(game, x, y, z, asset, frame);

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
    var i;
    console.log(`Moving: ${this.board.moving} | Tile Pieces: ${tile.pieces.length} | Selected Pieces: ${this.board.selectedPieces.length}`);
    if(!this.board.moving && tile.pieces.length > 0) {
      for(i = 0; i < Board.SIZE && tile.pieces.length > 0; i++) {
        let piece = tile.pieces.pop();
        piece.selected = true;
        this.board.selectedPieces.push(piece);
      }
      this.board.moving = true;
    } else {
      for(i = 0; i < Board.SIZE && this.board.selectedPieces.length > 0; i++) {
        let piece = this.board.selectedPieces.pop();
        piece.selected = false;
        piece.newx = tile.body.x;
         piece.newy = tile.body.y;
        tile.pieces.push(piece);
      }
      this.board.moving = false;
    }
  }

  static get WIDTH() {
    return 80;
  }
}
