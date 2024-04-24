export function generatePlayerComponents(position) {
  return [
    rect(9, 9),
    pos(position),
    anchor('center'),
    outline(1.5),
    color(),
    area(),
    body({ jumpForce: 250, gravityScale: 1 }),
    z(999),
    {
      speed: 100,
      hasSpeed: false
    }
  ]
}

export function setPlayerMovment(player) {
  onKeyDown('a', () => player.move(-player.speed, 0))
  onKeyDown('d', () => player.move(player.speed, 0))

  onKeyPress('w', () => {
    if (player.doubleJump) {
      player.doubleJump()
      play('whoosh')
    } else if (player.isGrounded()) {
      play('whoosh')
      player.jump()
    } else if (!player.isGrounded() && player.hasSpeed) {
      play('energy')
      speedUp(player)
    }
  })
}

function speedUp(player) {
 player.speed = 400
 player.gravityScale = 0
  const respawnLoop = loop(0.1, () => {
    add([
      rect(9, 9),
      anchor("center"),
      pos(player.pos),
      color(player.color),
      opacity(),
      lifespan(0.2, { fade: 0.1 })
    ])
  })
  wait(0.5, () => {
    respawnLoop.cancel()
    player.gravityScale = 1
    player.speed = 100
  })
  player.onCollide((o, c) => {
    if (c.isLeft() || c.isRight()) {
      respawnLoop.cancel()
      player.gravityScale = 1
      player.speed = 100
    }
  })
}

export function levelComplete(player, curLevel) {
  player.onCollide('win', () => {
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
            go(`level${curLevel + 1}`, this)
          })
        }
      }
    ])
  })
  player.onCollide('final', () => {
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
            go(`thanks`, this)
          })
        }
      }
    ])
  })
}

export function setPlayerPowerUp(player) {
  player.onCollide("powerUp", (p) => {

    player.color = p.color
    p.destroy()
    add([
      circle(1),
      pos(player.pos),
      color(p.color),
      opacity(),
      // z(1000),
      {
        add() {
          tween(0, 200, 0.5, r => this.radius = r)
          tween(1, 0, 0.5, o => this.opacity = o)
          wait(0.6, () => destroy(this))
        }
      }
    ])


    const power = p.power

    if (power == "doubleJump") {
      player.use(doubleJump(2))
      player.unuse("pass")
      player.hasSpeed = false
    } else if (power == 'passThrough') {
      player.use("pass")
      player.unuse('doubleJump')
      player.hasSpeed = false
    } else if (power == 'speedUp') {
      player.hasSpeed = true
      player.unuse('doubleJump')
      player.unuse("pass")
    } else if (power == 'none') {
      player.hasSpeed = false
      player.unuse('doubleJump')
      player.unuse("pass")
    }
  })
}