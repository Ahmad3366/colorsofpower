export function attachCamera (player) {
  player.onUpdate(() => {
    camPos(player.pos)
  })
  player.onPhysicsResolve(() => {
    camPos(player.pos)
  })
}