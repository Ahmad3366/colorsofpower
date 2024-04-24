export function colorizeBackground(r, g, b) {
  add([
    rect(width(), height()),
    pos(0),
    color(r, g, b),
    fixed()
  ])
}

export async function fetchMapData(mapPath) {
  const mapData = await fetch(mapPath)
  return await mapData.json()
}

export function drawTiles(layer, tilewidth, tileheight) {
  let nbOfDrawnTiles = 0;
  const tilePos = vec2(0, 0);
  let tiles = []
  for (const tile of layer.data) {
    if (nbOfDrawnTiles % layer.width == 0) {
      tilePos.x = 0
      tilePos.y += tileheight
    } else {
      tilePos.x += tilewidth
    }

    nbOfDrawnTiles++
    if (tile == 0) continue

    tiles.push({
      tileFrame: tile - 1,
      x: tilePos.x,
      y: tilePos.y,

    })
  }

  onDraw(() => {
    for (const tile of tiles) {
      drawSprite({
        sprite: 'tileset',
        pos: vec2(tile.x, tile.y),
        frame: tile.tileFrame
      })
    }
  })
}

export function drawCollisions(layer) {
  for (const object of layer.objects) {
    add([
      area({
        shape: new Rect(
          vec2(0),
          object.width,
          object.height
        )
      }),
      pos(object.x, object.y + 16),
      body({ isStatic: true }),
      offscreen({ hide: true }),
      object.name
    ])
  }
}