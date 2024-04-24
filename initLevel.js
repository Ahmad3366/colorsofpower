import { attachCamera } from "./camera.js"
import { generatePlayerComponents, levelComplete, setPlayerMovment, setPlayerPowerUp } from "./entities/player.js"
import { generatePowerUp } from "./powerUps.js"
import { colorizeBackground, drawCollisions, drawTiles, fetchMapData } from "./utils.js"

export default async function initLevel(mapDataPath, levelNumber, transition) {

  if (transition) {
    // readd(transition)
    tween(1, 0, 1, (t) => transition.opacity = t, easings.easeOutQuad)
    wait(1, () => {
      destroy(transition)
    })
  }

  colorizeBackground(40, 40, 40)

  setGravity(1200)
  
  const entities = {
    player: null,
    powerUps: [],
		enemies: []
	}
  
  const mapData = await fetchMapData(mapDataPath)
  const layers = mapData.layers
  for (const layer of layers) {
    if (layer.name == "collisions") {
      drawCollisions(layer)
      continue
    }

    if (layer.name == "spawns") {
      for (const object of layer.objects) {
        if (object.name == "player") {
          entities.player = add(generatePlayerComponents(vec2(object.x, object.y + 16)))
        }

        if (object.name.includes("powerUp")) {
          generatePowerUp(object)
        }

        if (object.name == "passWall") {
          add([
            rect(object.width, object.height),
            pos(object.x, object.y + 16),
            area({collisionIgnore: ['pass']}),
            body({isStatic: true}),
            offscreen({hide: true}),
            color(Color.fromHex("#ff8451")),
          ])
        }

        if (object.name.includes('text')) {
          add([
            text(object.name.split('-')[1], {size: 5, font:'virgil'}),
            pos(object.x, object.y + 16),
            offscreen({hide: true})
          ])
        }

        if (object.name == "win") {
          onDraw(() => {
            drawRect({
              width: 256,
              height: 32,
              pos: vec2(object.x, object.y + 16),
              anchor: 'topright',
              horizontal: true,
              gradient: [rgb(40, 40, 40), BLACK],
              
            })
          })
          // add([
          //   rect(128, 32),
          //   anchor('topright'),
          //   pos(object.x, object.y + 16),
          //   color()
          // ])
        }
      }
      continue
    }

    drawTiles(layer, mapData.tilewidth, mapData.tileheight)
  }

  camScale(6)
  attachCamera(entities.player)
  
  setPlayerMovment(entities.player)
  setPlayerPowerUp(entities.player)
  levelComplete(entities.player, levelNumber)

  onUpdate(() => {
    usePostEffect("light", {
      u_radius: 120,
      u_blur: 160,
      u_resolution: vec2(width(), height()),
      u_mouse: entities.player.screenPos()
    })
  })


  // restart the level
  onKeyPress('r', () => {
    add([
      rect(width(), height()),
      color(BLACK),
      opacity(0),
      stay(),
      z(1000),
      fixed(),
      {
        add() {
          tween(0, 1, 1, (t) => this.opacity = t, easings.linear)
          wait(1, () => {
            go(`level${levelNumber}`, this)
          })
        }
      }
    ])
  })
}