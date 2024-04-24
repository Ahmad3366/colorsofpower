import { colorizeBackground } from "../utils.js"
import { displayBlinkingUIMassage, drawMovingLogo } from "./menu.js"

export default async function thanks(transition) {

  if (transition) {
    // readd(transition)
    tween(1, 0, 1, (t) => transition.opacity = t, easings.easeOutQuad)
    wait(1, () => {
      destroy(transition)
    })
  }

  colorizeBackground(40, 40, 40)

  const logo = add([
    pos(center().add(0, - 200)),
    anchor('center')
  ])

  drawMovingLogo(logo, 0, 'thank', 0.5)
  wait(0.5, () => drawMovingLogo(logo, 90, 'you', 0.4))
  wait(1, () => drawMovingLogo(logo, 170, 'forPlaying', 0.5))

  wait(2.5, () => {
    displayBlinkingUIMassage('press anything to restart', vec2(center().x, center().y + 150), 1)

    onKeyPress(() => {
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