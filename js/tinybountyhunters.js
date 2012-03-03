(function() {
  var fps, menuGameState, playGameState;

  fps = $('#fps');

  menuGameState = function() {
    return {
      setup: function() {
        jaws.on_keydown(['enter', 'space'], function() {
          return jaws.switchGameState(playGameState);
        });
      },
      draw: function() {
        jaws.context.clearRect(0, 0, jaws.width, jaws.height);
        jaws.context.font = 'bold 50pt Terminal';
        jaws.context.fillStyle = "Black";
        jaws.context.strokeStyle = "rgba(200,200,200,0.0)";
        jaws.context.fillText('Start', 30, 160);
      }
    };
  };

  playGameState = function() {
    var player;
    player = new jaws.Sprite({
      x: 110,
      y: 64,
      scale: 2,
      anchor: 'center_bottom'
    });
    return {
      setup: function() {
        var anim, newblock, position, tile_map, _fn;
        newblock = function(x, y) {
          return blocks.push(new jaws.Sprite({
            image: 'img/block.png',
            x: x,
            y: y
          }));
        };
        window.blocks = new jaws.SpriteList();
        window.world = jaws.Rect(0, 0, 320 * 10, 320 * 2);
        _fn = function(position) {
          newblock(0, position * 32);
          newblock(position * 32, world.height - 32);
          return newblock(position * 32 + 320, world.height - 64);
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
        player.move = function() {
          var block;
          this.x += this.vx;
          if (tile_map.atRect(player.rect()).length > 0) this.x -= this.vx;
          this.vx = 0;
          this.y += this.vy;
          block = tile_map.atRect(player.rect())[0];
          if (block != null) {
            if (this.vy > 0) {
              this.can_jump = true;
              this.y = block.rect().y - 1;
            } else if (this.vy < 0) {
              this.y = block.rect().bottom + this.height;
            }
            return this.vy = 0;
          }
        };
        anim = new jaws.Animation({
          sprite_sheet: 'img/droid_11x15.png',
          frame_size: [11, 15],
          frame_duration: 100
        });
        player.anim_default = anim.slice(0, 5);
        player.anim_up = anim.slice(6, 8);
        player.anim_down = anim.slice(8, 10);
        player.anim_left = anim.slice(10, 12);
        player.anim_right = anim.slice(12, 14);
        player.vx = player.vy = 0;
        player.can_jump = true;
        player.setImage(player.anim_default.next());
        jaws.context.mozImageSmoothingEnabled = false;
        jaws.preventDefaultKeys(["up", "down", "left", "right", "space"]);
        console.log('Setup!');
      },
      update: function() {
        player.setImage(player.anim_default.next());
        player.vx = 0;
        if (jaws.pressed('left')) {
          player.vx = -2;
          player.setImage(player.anim_left.next());
        }
        if (jaws.pressed('right')) {
          player.vx = 2;
          player.setImage(player.anim_right.next());
        }
        if (jaws.pressed('up') && player.can_jump) {
          player.vy = -10;
          player.can_jump = false;
        }
        player.vy += 0.4;
        player.move();
        viewport.centerAround(player);
        fps.text(jaws.game_loop.fps);
      },
      draw: function() {
        jaws.clear();
        viewport.apply(function() {
          blocks.draw();
          player.draw();
        });
      }
    };
  };

  $(function() {
    jaws.assets.add(['img/block.png', 'img/droid_11x15.png']);
    return jaws.start(menuGameState);
  });

}).call(this);
