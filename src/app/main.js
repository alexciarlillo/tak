/* eslint-disable no-unused-vars */
import 'pixi';
import 'p2';
import Phaser from 'phaser';
import 'phaser-isometric';
import Vue from 'vue';
import App from './components/App';
import BootState from './states/Boot';
import GameState from './states/Game';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
})

class Game extends Phaser.Game {
  constructor () {
    super(800, 500, Phaser.AUTO, 'game', null);

    this.state.add('Boot', BootState, false)
    this.state.add('Game', GameState, false)

    this.state.start('Boot')
  }
}

window.game = new Game();
