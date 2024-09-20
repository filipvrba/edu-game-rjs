// import 'TGrotto', '../objects/tiles/t_grotto'
import Player from "../objects/player";
import LevelAnimations from "../components/level_animations";
import LevelTiles from "../components/level_tiles";
import Ladder from "../objects/ladder";
import Bridge from "../objects/bridge";
import * as level_01_json from "../../../src/maps/level_01.json";

export default class Level01 extends Level {
  get tiles() {
    return this._tiles
  };

  get json() {
    return this._json
  };

  get dimension() {
    return this._dimension
  };

  get level_size() {
    return this._level_size
  };

  get level_tiles() {
    return this._level_tiles
  };

  constructor() {
    super("maps/level_01.json");

    // @resize_handler = lambda { |s| resize(s) }
    this._level_tile_done = () => {
      return this.level_ready()
    };

    this._lt_sr_handler = s => this.lt_sprite_ready(s);
    this._level_animations = new LevelAnimations;
    this._level_tiles = new LevelTiles;
    this._json = level_01_json;
    this._scale = 2.3
  };

  ready() {
    // self.get_scene(true).connect('resize', @resize_handler)
    this._level_tiles.connect(
      LevelTiles.LEVEL_DONE,
      this._level_tile_done
    );

    this._level_tiles.t_grotto.connect(
      Tile.SPRITE_READY,
      this._lt_sr_handler
    );

    this._dimension = new Vector2(level_01_json.width, level_01_json.height);
    this.add(this._level_tiles, "level_tiles");
    this._level_size = new Vector2(this._dimension.w * this._level_tiles.t_grotto.size.w, this._dimension.h * this._level_tiles.t_grotto.size.h);
    return super.ready()
  };

  lt_sprite_ready(sprite) {
    return null
  };

  level_ready() {
    this._ladder = new Ladder;
    this.add(this._ladder, "ladder");
    this._bridge = new Bridge;
    this.add(this._bridge, "bridge");
    this._player = new Player;
    this.add(this._player, "player");
    this.add(this._level_animations, "level_animations");
    let size = new Vector2(window.innerWidth, window.innerHeight);
    return this.resize(size)
  };

  resize(size) {
    let scale_size = new Vector2(size.w / this._level_size.w, size.h / this._level_size.h);
    let _scale = Math.min(scale_size.w, scale_size.h);
    _scale = Math.min(_scale, this._scale);
    this._level_tiles.update_scale(_scale);
    if (this._player) this._player.update_scale(_scale);
    if (this._ladder) this._ladder.update_scale(_scale);
    if (this._bridge) return this._bridge.update_scale(_scale)
  };

  free() {
    // self.get_scene(true).disconnect('resize', @resize_handler)
    this.disconnect(Level.JSON_READY, this._json_ready_handler);

    this._level_tiles.t_grotto.disconnect(
      Tile.SPRITE_READY,
      this._lt_sr_handler
    );

    this._level_tiles.disconnect(
      LevelTiles.LEVEL_DONE,
      this._level_tile_done
    );

    return super.free()
  }
}