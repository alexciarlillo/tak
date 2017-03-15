import Phaser from 'phaser';
import Board from '../Board';

export default class extends Phaser.State {
  init() {
    this.cursorPos = new Phaser.Plugin.Isometric.Point3();
    this.board = new Board(this.game, this.cursorPos);
  }

  create() {
    this.board.create();
  }

  render() {
    this.game.debug.text(this.time.fps || '--', 2, 14, "#a7aebe");
    this.board.render();
  }

  update() {
    // Update the cursor position.
    // It's important to understand that screen-to-isometric projection means you have to specify a z position manually, as this cannot be easily
    // determined from the 2D pointer position without extra trickery. By default, the z position is 0 if not set.
    this.game.iso.unproject(this.game.input.activePointer.position, this.cursorPos);
    this.board.update();
  }
}
