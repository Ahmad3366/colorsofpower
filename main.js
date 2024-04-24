import kaboom from './lib/kaboom.mjs'

import initLevel from './initLevel.js'
import menu from './scenes/menu.js'
import thanks from './scenes/thanks.js'

kaboom({
  background: [0, 0, 0],
  height: 720,
  width: 1280,
  letterbox: true,
})

loadFont("Round", './assets/Round9x13.ttf')
loadFont("virgil", './assets/Virgil.woff2')
loadShaderURL('light', null, './shaders/light.frag')
loadSprite('powerlogo', './assets/power.png')
loadSprite('colorslogo', './assets/colors.png')
loadSprite('oflogo', './assets/of.png')
loadSprite('thank', './assets/thank.png')
loadSprite('you', './assets/you.png')
loadSprite('forPlaying', './assets/forPlaying.png')
// loadSprite('logo', './assets/colorsOfPower.png')
loadSprite('tileset', './assets/tileset.png', {
  sliceX: 12,
  sliceY: 12
})
loadSound('backgroundMusic', './sounds/backgroundMusic.mp3')
loadSound('energy', './sounds/energy.mp3')
loadSound('whoosh', './sounds/whoosh.mp3')

const scenes = {
  menu,
  thanks,
  level0: (transition) => {
    initLevel('./maps/level0.json', 0, transition)
  },
  level1: (transition) => {
    initLevel('./maps/level1.json', 1, transition)
  },
  level2: (transition) => {
    initLevel('./maps/level2.json', 2, transition)
  },
  level3: (transition) => {
    initLevel('./maps/level3.json', 3, transition)
  },
  level4: (transition) => {
    initLevel('./maps/level4.json', 4, transition)
  },
}

for (const sceneName in scenes) {
  scene(sceneName, scenes[sceneName])
}

go("menu")

// const p = add([
//   rect(9, 9),
//   pos(center()),
//   anchor('center'),
//   outline(1.5),
//   color(),
//   area(),
//   body({ jumpForce: 250 }),
//   z(999),
//   {
//     speed: 100,
//     hasSpeed: false
//   }
// ])

// p.