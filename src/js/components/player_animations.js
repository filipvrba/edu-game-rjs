import TPlayerIdle from "../objects/tiles/t_player_idle";
import TPlayerRun from "../objects/tiles/t_player_run";
import TPlayerLadder from "../objects/tiles/t_player_ladder";

export default class PlayerAnimations extends Object2D {
  get animation_sprite() {
    return this._animation_sprite
  };

  constructor() {
    super()
  };

  ready() {
    this._t_player_idle = new TPlayerIdle;
    this.parent.add(this._t_player_idle, "t_player_idle");
    this._t_player_run = new TPlayerRun;
    this.parent.add(this._t_player_run, "t_player_run");
    this._t_player_ladder = new TPlayerLadder;
    this.parent.add(this._t_player_ladder, "t_player_ladder");
    this._animation_sprite = new AnimationSprite(this.parent.sprite);
    this.parent.add(this._animation_sprite, "animation_sprite");
    this._animation_sprite.add_tile(this._t_player_idle);
    this._animation_sprite.add_tile(this._t_player_run);
    this._animation_sprite.add_tile(this._t_player_ladder);
    return this._animation_sprite.play_tile(this._t_player_idle.id)
  };

  update(dt) {
    if (this.parent.is_move) {
      if (this.parent.is_move_vertical) {
        if (this._animation_sprite.current_tile.id !== this._t_player_ladder.id) {
          return this._animation_sprite.play_tile(this._t_player_ladder.id)
        }
      } else if (this._animation_sprite.current_tile.id !== this._t_player_run.id) {
        return this._animation_sprite.play_tile(this._t_player_run.id)
      }
    } else if (this._animation_sprite.current_tile.id !== this._t_player_idle.id) {
      return this._animation_sprite.play_tile(this._t_player_idle.id)
    }
  }
}