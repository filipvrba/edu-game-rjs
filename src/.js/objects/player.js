import PlayerAnimations from "../components/player_animations";

export default class Player extends KinematicBody {
  get is_sprite_edge() {
    return this._is_sprite_edge
  };

  set is_sprite_edge(is_sprite_edge) {
    this._is_sprite_edge = is_sprite_edge
  };

  get sprite() {
    return this._sprite
  };

  constructor() {
    super();
    this._scale = 2;
    this.visible_point = false;
    this._sprite = new Sprite;
    this._sprite.scale = this._scale;
    this._sprite.centered = true;
    this._player_animations = new PlayerAnimations
  };

  ready() {
    this.add(this._player_animations, "player_animations");
    this.add(this._sprite, "player_sprite")
  };

  update_scale(scale) {
    this._scale = scale;
    this._sprite.scale = scale;
    this._sprite.offset.y = (-this._player_animations.animation_sprite.current_tile.size.h * scale) / 2
  }
}