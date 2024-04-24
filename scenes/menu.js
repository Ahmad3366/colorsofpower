import { colorizeBackground } from "../utils.js";

export async function  drawMovingLogo(parent, positionY, spr, scl) {
  const logo = parent.add([
      sprite(spr),
      scale(scl),
      anchor('center'),
      pos(0, positionY),
      state('move-down', ['move-down', 'move-up'])
  ])

  logo.onStateEnter('move-down', async () => {
      await tween(
          logo.pos.y,
          logo.pos.y + 15,
          2,
          (newPos) => logo.pos.y = newPos,
          easings.easeInOutSine
      )
      logo.enterState('move-up')
  })
  logo.onStateEnter('move-up', async () => {
      await tween(
          logo.pos.y,
          logo.pos.y - 15,
          2,
          (newPos) => logo.pos.y = newPos,
          easings.easeInOutSine
      )
      logo.enterState('move-down')
  })
}

export function displayBlinkingUIMassage(massage, position, scl){
  const message = add([
      text(massage, {font: "Round"}),
      pos(position),
      anchor('center'),
      opacity(),
      scale(scl),
      state('flash-up', ['flash-up', 'flash-down'])
  ])

  message.onStateEnter('flash-up', async () => {
      await tween(
          message.opacity,
          0,
          0.5,
          (nextOpacity) => message.opacity = nextOpacity,
          easings.linear
      )
      message.enterState('flash-down')
  })
  message.onStateEnter('flash-down', async () => {
      await tween(
          message.opacity,
          1,
          0.5,
          (nextOpacity) => message.opacity = nextOpacity,
          easings.linear
      )
      message.enterState('flash-up')
  })
}

export default async function menu() {

  play("backgroundMusic", {loop: true, volume: 5, seek: 10})

  colorizeBackground(40, 40, 40)

  const logo = add([
    pos(center().add(0, - 200)),
    anchor('center')
  ])
  drawMovingLogo(logo, 0, 'colorslogo', 0.3)
  wait(0.5, () => drawMovingLogo(logo,  80, 'oflogo', 0.2))
  wait(1, () => drawMovingLogo(logo, 160, 'powerlogo', 0.3))

  wait(1.5, () => {
    displayBlinkingUIMassage('press [ Enter ] to start', vec2(center().x, center().y + 150), 1)

    onKeyPress('enter', () => {
      add([
        rect(width(), height()),
        color(BLACK),
        opacity(1),
        stay(),
        z(1000),
        fixed(),
        {
          add() {
            tween(0, 1, 1, (t) => this.opacity = t, easings.linear)
            wait(1, () => {
              go("level0", this)
            })
          }
        }
      ])
    })
  })


}