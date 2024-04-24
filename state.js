class State {
  powerUps = {
    doubleJump: "#4FC3FF",
    passThrough: "#ff8451"
  }
  curPower = null

  getPowerUps = () => this.powerUps
  getCurPower = () => this.curPower
  setCurPower = (power) => {
    this.curPower = power
  }
}
const gameState = new State()
export default gameState