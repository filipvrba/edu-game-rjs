// https://img.itch.zone/aW1hZ2UvNDY4NzkyLzIzOTYwMjMucG5n/original/pUNrO5.png
export default class Images extends BasicObject {
  get grotto_tile() {
    return this._grotto_tile
  };

  get player_idle() {
    return this._player_idle
  };

  get player_run() {
    return this._player_run
  };

  get player_ladder() {
    return this._player_ladder
  };

  get fx_teleport() {
    return this._fx_teleport
  };

  constructor() {
    super();
    this._grotto_tile = new Image;
    this._grotto_tile.src = "/assets/grotto/tileset_2.png";
    this._player_idle = new Image;
    this._player_idle.src = "/assets/grotto/player-idle.png";
    this._player_run = new Image;
    this._player_run.src = "/assets/grotto/player-run.png";
    this._player_ladder = new Image;
    this._player_ladder.src = "/assets/grotto/player-ladder.png"
  };

  draw(r) {
    return r.imageSmoothingEnabled = false
  }
}