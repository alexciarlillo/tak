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

function preload() {
  game.load.image('tile', '../assets/tile-n.png');
  game.time.advancedTiming = true;

  // Add and enable the plug-in.
  game.plugins.add(new Phaser.Plugin.Isometric(game));

  // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
  // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
  game.iso.anchor.setTo(0.5, 0.1);
}

function create() {
  let tile = game.add.isoSprite(0, 0, 0, 'tile');
  let tile2 = game.add.isoSprite(40, 0, 0, 'tile');
  tile.anchor.set(0.5, 0);
}

function update() {

}

var game = new Phaser.Game(800,500, Phaser.AUTO, 'game', { create: create, preload: preload, update: update });
