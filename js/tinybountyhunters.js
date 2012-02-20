(function() {
  var myGameState;

  myGameState = function() {
    return {
      setup: function() {
        return console.log('Setup!');
      },
      update: function() {},
      draw: function() {}
    };
  };

  jaws.start(myGameState);

}).call(this);
