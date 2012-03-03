fps = $('#fps')

menuGameState = ->
  setup: ->
    jaws.on_keydown ['enter', 'space'], -> jaws.switchGameState(playGameState)
    return
  draw: ->
    jaws.context.clearRect 0,0, jaws.width, jaws.height
    jaws.context.font = 'bold 50pt Terminal'
    jaws.context.fillStyle = "Black"
    jaws.context.strokeStyle = "rgba(200,200,200,0.0)"
    jaws.context.fillText 'Start', 30, 160
    return

playGameState = ->
  player = new jaws.Sprite(
    x: 110
    y: 64
    scale: 2
    anchor: 'center_bottom'
  )
  setup: ->
    newblock = (x,y) ->
      blocks.push(new jaws.Sprite(image: 'img/block.png', x: x, y: y))

    window.blocks = new jaws.SpriteList()
    window.world = jaws.Rect(0, 0, 320*10, 320*2)

    for position in [0..20]
      do (position) ->
        newblock(0, position*32)
        newblock(position * 32, world.height - 32)
        newblock(position * 32 + 320, world.height - 64)

    tile_map = new jaws.TileMap(size: [100, 100], cell_size: [32, 32])
    tile_map.push(blocks)
    console.log tile_map

    window.viewport = new jaws.Viewport(max_x: world.width, max_y: world.height)

    player.move = ->
      @x += @vx
      if tile_map.atRect(player.rect()).length > 0
        @x -= @vx
      @vx = 0

      @y += @vy
      block = tile_map.atRect(player.rect())[0]
      if block?
        # Heading downwards
        if @vy > 0
          @can_jump = true
          @y = block.rect().y - 1
        # Heading upwards
        else if @vy < 0
          @y = block.rect().bottom + @height
        @vy = 0

    anim = new jaws.Animation(
      sprite_sheet: 'img/droid_11x15.png'
      frame_size: [11,15]
      frame_duration: 100
    )
    player.anim_default = anim.slice(0,5)
    player.anim_up = anim.slice(6,8)
    player.anim_down = anim.slice(8,10)
    player.anim_left = anim.slice(10,12)
    player.anim_right = anim.slice(12,14)
    player.vx = player.vy = 0
    player.can_jump = true

    player.setImage player.anim_default.next()

    jaws.context.mozImageSmoothingEnabled = false
    jaws.preventDefaultKeys(["up", "down", "left", "right", "space"])
    console.log 'Setup!'
    return
  update: ->
    player.setImage player.anim_default.next()
    player.vx = 0

    if jaws.pressed('left')
      player.vx = -2
      player.setImage player.anim_left.next()

    if jaws.pressed('right')
      player.vx = 2
      player.setImage player.anim_right.next()

    if jaws.pressed('up') && player.can_jump
      player.vy = -10
      player.can_jump = false
 
    player.vy += 0.4
    player.move()

    # Center the viewport:
    viewport.centerAround player
    fps.text jaws.game_loop.fps
    return

  draw: ->
    jaws.clear()

    viewport.apply ->
      blocks.draw()
      player.draw()
      return
    return

$ ->
  jaws.assets.add ['img/block.png', 'img/droid_11x15.png']
  jaws.start menuGameState
