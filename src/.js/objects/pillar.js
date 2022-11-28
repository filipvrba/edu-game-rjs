export default class Pillar extends Object2D {
  get scale() {
    return this._scale
  };

  set scale(scale) {
    this._scale = scale
  };

  constructor(type) {
    super(type);
    this._scale = 2;
    this._type = type
  };

  ready() {
    this._img = this.get_scene(true).find_child("images").mainlev;
    this.position = new Vector2(-(this._type[2] * this._scale) / 2, -(this._type[3] * this._scale) / 2)
  };

  draw(r) {
    r.drawImage(
      this._img,
      this._type[0],
      this._type[1],
      this._type[2],
      this._type[3],
      this.global_position.x,
      this.global_position.y,
      this._type[2] * this._scale,
      this._type[3] * this._scale
    )
  }
};

Pillar.BREAK_UP_LEFT = [832, 288, 32, 92];
Pillar.BREAK_DOWN_LEFT = [832, 404, 32, 92];
Pillar.STABLE_LEFT = [880, 400, 32, 96];
Pillar.STABLE_RIGHT = [928, 400, 32, 96];
Pillar.BREAK_DOWN_RIGHT = [976, 404, 32, 92];
Pillar.BREAK_UP_RIGHT = [976, 288, 32, 92]