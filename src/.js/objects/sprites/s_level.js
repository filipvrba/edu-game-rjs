export default class SLevel extends Sprite {
  get origin_position() {
    return this._origin_position
  };

  set origin_position(origin_position) {
    this._origin_position = origin_position
  };

  constructor(s_sprite) {
    super(s_sprite);
    this._origin_position = Vector2.ZERO
  }
}