myGameState = ->
  setup: ->
    console.log 'Setup!'
  update: ->
    console.log 'Update!'
  draw: ->
    console.log 'Draw!'

jaws.start(myGameState)
