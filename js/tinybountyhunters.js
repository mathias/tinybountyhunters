(function() {
  var fps, menuGameState, playGameState;

  fps = $('#fps');

  menuGameState = function() {
    return {
      setup: function() {
        return console.log('Setup!');
      },
      update: function() {},
      draw: function() {}
    };
  };

  playGameState = function() {
    return {
      setup: function() {
        return console.log('Setup!');
      },
      update: function() {},
      draw: function() {}
    };
  };

  $(function() {
    return jaws.start(menuGameState);
  });

}).call(this);
