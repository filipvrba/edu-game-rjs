import TGrotto from "../objects/tiles/t_grotto";
import SLevel from "../objects/sprites/s_level";

export default class LevelTiles extends Object2D {
  get t_grotto() {
    return this._t_grotto
  };

  constructor() {
    super();
    this._sprite_ready_handler = s => this.sprite_ready(s);
    this._t_grotto = new TGrotto
  };

  ready() {
    this._t_grotto.connect(Tile.SPRITE_READY, this._sprite_ready_handler);
    this.add(this._t_grotto, "t_grotto");
    this._layers = this.parent.json.layers
  };

  sprite_ready(sprites) {
    this.generate_tiles();
    let size = new Vector2(window.innerWidth, window.innerHeight);
    this.parent.resize(size);
    this.emit_signal(LevelTiles.LEVEL_DONE)
  };

  generate_tiles() {
    this.level_loop((options) => {
      let id = options.layer.ld.data[options.dimension.i] + this.parent.json.compressionlevel;
      let sprite = new SLevel(this._t_grotto.get_s_sprite(id));
      sprite.img = this._t_grotto.img;
      let s_id = `sprite_l${options.layer.i}_i${options.dimension.i}`;
      this.add(sprite, s_id);
      sprite.position = new Vector2(options.dimension.vec.x * this._t_grotto.size.x, options.dimension.vec.y * this._t_grotto.size.y);
      sprite.origin_position = sprite.position;
      this.emit_signal(LevelTiles.SPRITE_GEN, s_id, sprite.position)
    })
  };

  update_position(scale) {
    this.position = new Vector2(-this.parent.dimension.w * scale * this._t_grotto.size.w / 2, -this.parent.dimension.h * scale * this._t_grotto.size.h / 2);
    this.update_global_position()
  };

  update_scale(scale) {
    this._scale = scale;

    this.level_loop((options) => {
      let s_id = `sprite_l${options.layer.i}_i${options.dimension.i}`;
      let sprite = this.find_child(s_id);
      sprite.scale = scale;
      sprite.position = new Vector2(options.dimension.vec.x * this._t_grotto.size.x * scale, options.dimension.vec.y * this._t_grotto.size.y * scale)
    });

    this.update_position(scale)
  };

  level_loop(callback) {
    this._layers.forEach((ld, il) => {
      if (ld.type == LevelTiles.TILE_LAYER) {
        Level.dimension_loop(this.parent.dimension, (vec, i) => {
          let obj = {layer: {ld, i: il}, dimension: {vec, i}};
          callback(obj)
        })
      }
    })
  };

  free() {
    this._grotto.disconnect(
      GrottoTile.SPRITE_READY,
      this._sprite_ready_handler
    );

    super.free()
  }
};

LevelTiles.TILE_LAYER = "tilelayer";
LevelTiles.LEVEL_DONE = "ltrd";
LevelTiles.SPRITE_GEN = "ltsg"