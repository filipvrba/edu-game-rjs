export default class TGrotto extends Tile {
  constructor() {
    super(new Vector2(16, 16))
  };

  ready() {
    this._img = this.get_scene(true).find_child("images").grotto_tile;
    return this._img
  }
}