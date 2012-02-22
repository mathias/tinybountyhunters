(function() {
  var fps, menuGameState, playGameState;

  fps = $('#fps');

  menuGameState = function() {
    return {
      setup: function() {
        return jaws.on_keydown(['enter', 'space'], function() {
          return jaws.switchGameState(playGameState);
        });
      },
      draw: function() {
        jaws.context.clearRect(0, 0, jaws.width, jaws.height);
        jaws.context.font = 'bold 50pt Terminal';
        jaws.context.fillStyle = "Black";
        jaws.context.strokeStyle = "rgba(200,200,200,0.0)";
        return jaws.context.fillText('Start', 30, 160);
      }
    };
  };

  playGameState = function() {
    return {
      setup: function() {
        var blocks;
        blocks = new jaws.SpriteList();
        return console.log('Setup!');
      },
      update: function() {
        return fps.text(jaws.game_loop.fps);
      },
      draw: function() {
        return jaws.context.clearRect(0, 0, jaws.width, jaws.height);
      }
    };
  };

  $(function() {
    return jaws.start(menuGameState);
  });

}).call(this);
