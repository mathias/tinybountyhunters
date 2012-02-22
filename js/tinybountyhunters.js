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
        var position, tile_map, _fn;
        window.blocks = new jaws.SpriteList();
        window.world = jaws.Rect(0, 0, 320 * 2, 300);
        _fn = function(position) {
          blocks.push(new jaws.Sprite({
            image: 'img/block.png',
            x: 0,
            y: position * 32
          }));
          blocks.push(new jaws.Sprite({
            image: 'img/block.png',
            x: world.width - 32,
            y: position * 32
          }));
          return blocks.push(new jaws.Sprite({
            image: 'img/block.png',
            x: position * 32,
            y: world.height - 32
          }));
        };
        for (position = 0; position <= 20; position++) {
          _fn(position);
        }
        tile_map = new jaws.TileMap({
          size: [100, 100],
          cell_size: [32, 32]
        });
        tile_map.push(blocks);
        console.log(tile_map);
        window.viewport = new jaws.Viewport({
          max_x: world.width,
          max_y: world.height
        });
        jaws.context.mozImageSmoothingEnabled = false;
        jaws.preventDefaultKeys(["up", "down", "left", "right", "space"]);
        return console.log('Setup!');
      },
      update: function() {
        return fps.text(jaws.game_loop.fps);
      },
      draw: function() {
        jaws.clear();
        return viewport.apply(function() {
          return blocks.draw();
        });
      }
    };
  };

  $(function() {
    jaws.assets.add(['img/block.png', 'img/droid_11x15.png']);
    return jaws.start(menuGameState);
  });

}).call(this);
