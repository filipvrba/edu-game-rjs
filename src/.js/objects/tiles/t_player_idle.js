export default class TPlayerIdle extends Tile {
  get id_tile() {
    return this._id_tile
  };

  set id_tile(id_tile) {
    this._id_tile = id_tile
  };

  constructor() {
    super(new Vector2(32, 38));
    this._id_tile = 0
  };

  ready() {
    this._img = this.get_scene(true).find_child("images").player_idle
  }
}