import Tile from './sprites/Tile';
import Road from './sprites/Road';

class Board {
  constructor(game, cursorPos) {
    this.game = game;
    this.tileGroup = game.add.group();
    this.piecesGroup = game.add.group();
    this.cursorPos = cursorPos;
    this.moving = false;
  }

  create() {
    let directions = ['n', 's', 'e', 'w'];

    for (var x = 0; x < Board.SIZE; x += 1) {
      for(var y = 0; y < Board.SIZE; y += 1) {
        let posx = (x * Tile.WIDTH);
        let posy = (y * Tile.WIDTH);
        let direction = directions[Math.floor(Math.random()*directions.length)];

        let tile = new Tile({
          game: this.game,
          x: posx,
          y: posy,
          z: 100,
          asset: `tile-${direction}`,
          frame: 0,
          group: this.tileGroup,
          board: this,
        });

        this.game.add.existing(tile);

        if(x === 3 && y === 3) {
          let road = new Road({
            game: this.game,
            x: posx,
            y: posy,
            z: 100,
            asset: `road`,
            frame: 0,
            group: this.pieceGroup,
          });

          tile.pieces.push(road);
          this.game.add.existing(road);
        }
      }
    }
  }

  update() {
    this.game.physics.isoArcade.collide(this.tileGroup);

  }

  render() {
    // Uncomment this to see the debug bodies.
    // this.tileGroup.forEach(function (tile) {
    //     this.game.debug.body(tile , 'rgba(189, 221, 235, 0.6)', false);
    // }, this);
    //
    // this.piecesGroup.forEach(function (piece) {
    //     this.game.debug.body(piece, 'rgba(189, 221, 235, 0.6)', false);
    // }, this);
  }

  static get SIZE() {
    return 5;
  }

}

export default Board;
