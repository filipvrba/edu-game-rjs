# import 'TGrotto', '../objects/tiles/t_grotto'
import 'Player', '../objects/player'
import 'LevelAnimations', '../components/level_animations'
import 'LevelTiles', '../components/level_tiles'
import 'Ladder', '../objects/ladder'
import 'Bridge', '../objects/bridge'

import "*", as: "level_01_json", from: "../../../src/maps/level_01.json"

export default class Level01 < Level
  attr_reader :tiles, :json, :dimension, :level_size, :level_tiles

  def initialize
    super "maps/level_01.json"
    # @resize_handler = lambda { |s| resize(s) }
    @level_tile_done = lambda { level_ready() }
    @lt_sr_handler = lambda { |s| lt_sprite_ready(s) }

    @level_animations = LevelAnimations.new
    @level_tiles = LevelTiles.new
    @json = level_01_json
    @scale = 2.3  # 2.3
  end

  def ready()
    # self.get_scene(true).connect('resize', @resize_handler)
    @level_tiles.connect(LevelTiles::LEVEL_DONE, @level_tile_done)
    @level_tiles.t_grotto.connect(Tile::SPRITE_READY, @lt_sr_handler)

    @dimension = Vector2.new(level_01_json.width, level_01_json.height)
    self.add @level_tiles, 'level_tiles'

    @level_size = Vector2.new(
      @dimension.w * @level_tiles.t_grotto.size.w,
      @dimension.h * @level_tiles.t_grotto.size.h
    )
    super
  end

  def lt_sprite_ready(sprite)
    
  end

  def level_ready()
    @ladder = Ladder.new
    self.add @ladder, 'ladder'

    @bridge = Bridge.new
    self.add @bridge, 'bridge'

    @player = Player.new
    self.add @player, "player"
    self.add @level_animations, "level_animations"

    size = Vector2.new(window.innerWidth, window.innerHeight)
    resize(size)
  end

  def resize size
    scale_size = Vector2.new(size.w / @level_size.w, size.h / @level_size.h)
    _scale = Math.min(scale_size.w, scale_size.h)
    _scale = Math.min(_scale, @scale)

    @level_tiles.update_scale _scale

    if @player
      @player.update_scale _scale
    end

    if @ladder
      @ladder.update_scale _scale
    end

    if @bridge
      @bridge.update_scale _scale
    end
  end
    
  def free()
    # self.get_scene(true).disconnect('resize', @resize_handler)
    self.disconnect Level::JSON_READY, @json_ready_handler
    @level_tiles.t_grotto.disconnect(Tile::SPRITE_READY, @lt_sr_handler)
    @level_tiles.disconnect(LevelTiles::LEVEL_DONE, @level_tile_done)
    super
  end
end
