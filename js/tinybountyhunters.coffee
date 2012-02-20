fps = $('#fps')

menuGameState = ->
  setup: ->
    console.log 'Setup!'
  update: ->
  draw: ->

playGameState = ->
  setup: ->
    console.log 'Setup!'
  update: ->
  draw: ->

$ ->
  jaws.start(menuGameState)
