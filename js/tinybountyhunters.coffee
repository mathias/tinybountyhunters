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
    blocks = new jaws.SpriteList()

    console.log 'Setup!'
  update: ->
    fps.text jaws.game_loop.fps
  draw: ->
    jaws.context.clearRect 0,0, jaws.width, jaws.height

$ ->
  # jaws.assets.add ['img/droid_11x15.png', 'img/block.bmp']
  jaws.start menuGameState

