(function() {
  var myGameState;

  myGameState = function() {
    return {
      setup: function() {
        return console.log('Setup!');
      },
      update: function() {
        return console.log('Update!');
      },
      draw: function() {
        return console.log('Draw!');
      }
    };
  };

  jaws.start(myGameState);

}).call(this);
