const powerUps = {
  none: "#ffffff",
  doubleJump: "#4FC3FF",
  passThrough: "#ff8451",
  speedUp: "#ffff00"
}

export function generatePowerUp(object) {
  const offset = 5
  const power = add([
    rect(4, 9, { radius: 5 }),
    pos(object.x + offset, object.y + 16 + offset),
    color(Color.fromHex(powerUps[object.name.split('-')[1]])),
    area(),
    outline(1),
    offscreen({hide: true}),
    object.name.split("-")[0],
    {
      power: object.name.split("-")[1]
    }
  ])

  for(let i = 0; i <= 1; i++) {
    const firstState = i == 0 ? "forward": "backward"
    
    const p = power.add([
      circle(1),
      color(power.color),
      pos(i * 6),
      state(firstState, ['forward', 'backward'])
    ])
    
    p.onStateEnter('forward', () => {
      tween(
        p.pos,
        p.pos.add(7, 8),
        1,
        n => p.pos = n,
        easings.easeInOutSine
      )
      wait(1, () => p.enterState("backward"))
    })
    p.onStateEnter('backward', () => {
      tween(
        p.pos,
        p.pos.add(-7, -8),
        1,
        n => p.pos = n,
        easings.easeInOutSine
      )
      wait(1, () => p.enterState("forward"))
    })
  }

  return power
}