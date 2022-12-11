import DynamicObj from "./dynamic_obj";

export default class Ladder extends DynamicObj {
  constructor() {
    super(Ladder.SPRITE_ID, "sprite_l0_i130", 6)
  };

  physics_update_position(dt, sprite, position_end) {
    if (sprite.position.y < position_end.y) {
      sprite.position.y += 50 * this.scale * dt
    }
  };

  is_done(sprite, position_end) {
    return sprite.position.y >= position_end.y
  }
};

Ladder.SPRITE_ID = 159