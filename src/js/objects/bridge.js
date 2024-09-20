import DynamicObj from "./dynamic_obj";

export default class Bridge extends DynamicObj {
  constructor() {
    super(Bridge.SPRITE_ID, "sprite_l0_i370", 5)
  };

  physics_update_position(dt, sprite, position_end) {
    if (sprite.position.x > position_end.x) {
      return sprite.position.x -= Bridge.SPEED * this.scale * dt
    }
  };

  is_done(sprite, position_end) {
    return sprite.position.x <= position_end.x
  };

  get_position_end(i, sprite) {
    return sprite.position.clone.sub(this.t_grotto.size.clone.multiply_scalar(sprite.scale * (i + 1)))
  }
};

Bridge.SPRITE_ID = 76;
Bridge.SPEED = 50