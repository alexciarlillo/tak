/* eslint-disable no-unused-vars */
import 'pixi';
import 'p2';
import Phaser from 'phaser';

import Vue from 'vue';
import App from './components/App';

var game = new Phaser.Game(800,600, Phaser.AUTO, '');
/* eslint-disable no-console */
console.log(game);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
})
