/* eslint-disable no-unused-vars */
import 'pixi';
import 'p2';
import Phaser from 'phaser';
import 'phaser-isometric';

import Vue from 'vue';
import App from './components/App';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
})

var cursorPos, tileGroup, pieceGroup;

function preload() {
  for(var dir of ['n', 's', 'e', 'w']) {
    game.load.image(`tile-${dir}`, `../assets/tile-${dir}.png`);
    game.load.image('piece', '../assets/road-n.png');
  }

  game.time.advancedTiming = true;

  // Add and enable the plug-in.
  game.plugins.add(new Phaser.Plugin.Isometric(game, null, Phaser.Plugin.Isometric.ISOMETRIC));
  game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);


  // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
  // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
  game.iso.anchor.setTo(0.5, 0.1);
}

function create() {
  tileGroup = game.add.group();
  pieceGroup = game.add.group();
  game.physics.isoArcade.gravity.setTo(0, 0, -500);

  createBoard(game, tileGroup);

  let piece = game.add.isoSprite(3*64, 3*64, 100, 'piece', 0, pieceGroup);
  game.physics.isoArcade.enable(piece);
  piece.body.collideWorldBounds = true;
  piece.scale.set(0.5, 0.5);
  piece.anchor.set(0.5, 0);

  cursorPos = new Phaser.Plugin.Isometric.Point3();
}

function render() {
        game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");

        // Uncomment this to see the debug bodies.
        tileGroup.forEach(function (tile) {
            game.debug.body(tile , 'rgba(189, 221, 235, 0.6)', false);
        });

        pieceGroup.forEach(function (piece) {
            game.debug.body(piece, 'rgba(189, 221, 235, 0.6)', false);
        });

    }

function update() {
  // Update the cursor position.
  // It's important to understand that screen-to-isometric projection means you have to specify a z position manually, as this cannot be easily
  // determined from the 2D pointer position without extra trickery. By default, the z position is 0 if not set.
  game.physics.isoArcade.collide(tileGroup);
  game.iso.unproject(game.input.activePointer.position, cursorPos);
  // Loop through all tiles and test to see if the 3D position from above intersects with the automatically generated IsoSprite tile bounds.
  pieceGroup.forEach(function (piece) {

      var inBounds = piece.isoBounds.containsXY(cursorPos.x, cursorPos.y);
      // If it does, do a little animation and tint change.
      if (!piece.selected && inBounds) {
          piece.selected = true;
          piece.tint = 0x86bfda;
          //piece.body.acceleration.z = 100;
          //piece.body.position.z = 100;
          //piece.body.velocity.x = 10;
          //game.add.tween(piece).to({ isoZ: 4 }, 200, Phaser.Easing.Quadratic.InOut, true);
      }
      // If not, revert back to how it was.
      else if (piece.selected && !inBounds) {
          piece.selected = false;
          piece.tint = 0xffffff;
          //piece.body.position.z = 0;
          //game.add.tween(piece).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
      }
  });
}

function createBoard(game, group) {
  let tile, tileSize;
  let directions = ['n', 's', 'e', 'w'];
  for (var xx = 0; xx < 5; xx += 1) {
    for(var yy = 0; yy < 5; yy += 1) {
      let posx = (xx * 64);
      let posy = (yy * 64);
      let direction = directions[Math.floor(Math.random()*directions.length)];
      tile = game.add.isoSprite(posx, posy, 100, `tile-${direction}`, 0, group);
      game.physics.isoArcade.enable(tile);
      tile.body.collideWorldBounds = true;
      tile.scale.set(0.5, 0.5);
      tile.anchor.set(0.5, 0);
    }
  }
}

var game = new Phaser.Game(800,500, Phaser.AUTO, 'game', { create: create, preload: preload, update: update, render: render });
