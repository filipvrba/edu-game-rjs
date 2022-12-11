import LevelTiles from "../components/level_tiles";

export default class DynamicObj extends Object2D {
  get level_tile() {
    return this.get_scene().level_tiles
  };

  get t_grotto() {
    return this.level_tile.t_grotto
  };

  constructor(s_id, ls_id, length) {
    super(s_id, ls_id, length);
    this._s_id = s_id;
    this._ls_id = ls_id;
    this._length = length;
    this._positions_end = [];
    this._is_unlock = false;
    this._callback_done = null
  };

  ready() {
    this.update_position();
    this.update_global_position();
    this.generate_obj(this._s_id, this._ls_id, this._length)
  };

  physics_update(dt) {
    if (!this._is_unlock) return;

    for (let i = 0; i < this._length; i++) {
      let child = this.find_child(`${DynamicObj.SPRITE_NAME}_${i}`);

      // self.emit_signal(PHY_UPDATE_POS, child, @positions_end[i])
      this.physics_update_position(dt, child, this._positions_end[i]);

      if (child.id == `${DynamicObj.SPRITE_NAME}_${this._length - 1}`) {
        if (this.is_done(child, this._positions_end[i])) {
          this._is_unlock = false;
          this._callback_done.call()
        }
      }
    }
  };

  generate_obj(s_id, ls_id, length) {
    for (let i = 0; i < length; i++) {
      let sprite = new Sprite(this.t_grotto.get_s_sprite(s_id));
      sprite.img = this.t_grotto.img;
      this.add(sprite, `${DynamicObj.SPRITE_NAME}_${i}`);
      sprite.position = this.level_tile.find_child(ls_id).position;
      this._positions_end.push(this.get_position_end(i, sprite))
    }
  };

  update_position() {
    this.position = this.level_tile.position
  };

  update_scale(scale) {
    this._scale = scale;
    this.update_position();
    this._positions_end = [];

    for (let i = 0; i < this._length; i++) {
      let child = this.find_child(`${DynamicObj.SPRITE_NAME}_${i}`);
      child.scale = this._scale;
      child.position = this.level_tile.find_child(this._ls_id).position.clone;
      this._positions_end.push(this.get_position_end(i, child))
    }
  };

  get_position_end(i, sprite) {
    return this.t_grotto.size.clone.multiply_scalar(sprite.scale * (i + 1)).add(sprite.position).clone
  };

  unlock(callback) {
    this._is_unlock = true;
    this._callback_done = callback
  }
};

DynamicObj.SPRITE_NAME = "sprite";
DynamicObj.PHY_UPDATE_POS = "dopup"