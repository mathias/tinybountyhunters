fps = $('#fps')

menuGameState = ->
  setup: ->
    jaws.on_keydown ['enter', 'space'], -> jaws.switchGameState(playGameState)
  draw: ->
    jaws.context.clearRect 0,0, jaws.width, jaws.height
    jaws.context.font = 'bold 50pt Terminal'
    jaws.context.fillStyle = "Black"
    jaws.context.strokeStyle = "rgba(200,200,200,0.0)"
    jaws.context.fillText 'Start', 30, 160

playGameState = ->
  setup: ->
    window.blocks = new jaws.SpriteList()
    window.world = jaws.Rect(0, 0, 320*2, 300)

    for position in [0..20]
      do (position) ->
        blocks.push(new jaws.Sprite(image: 'img/block.png', x: 0, y: position*32))
        blocks.push(new jaws.Sprite(image: 'img/block.png', x: world.width-32, y: position*32))
        blocks.push(new jaws.Sprite(image: 'img/block.png', x: position*32, y: world.height-32))

    tile_map = new jaws.TileMap(size: [100, 100], cell_size: [32, 32])
    tile_map.push(blocks)
    console.log tile_map

    window.viewport = new jaws.Viewport(max_x: world.width, max_y: world.height)

    jaws.context.mozImageSmoothingEnabled = false
    jaws.preventDefaultKeys(["up", "down", "left", "right", "space"])
    console.log 'Setup!'
  update: ->
    fps.text jaws.game_loop.fps
  draw: ->
    jaws.clear()

    viewport.apply ->
      blocks.draw()

$ ->
  jaws.assets.add ['img/block.png', 'img/droid_11x15.png']
  jaws.start menuGameState
