import { Application } from 'pixi.js'

export const pixi = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  autoStart: true,
  antialias: false,
  transparent: false,
  resolution: 2,
})
