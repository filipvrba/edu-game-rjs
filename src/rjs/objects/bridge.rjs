import 'DynamicObj', './dynamic_obj'

export default class Bridge < DynamicObj
  SPRITE_ID = 76
  SPEED = 50

  def initialize
    super SPRITE_ID, "sprite_l0_i370", 5
  end

  def physics_update_position(dt, sprite, position_end)

    if sprite.position.x > position_end.x
      sprite.position.x -= SPEED * self.scale * dt
    end
  end

  def is_done(sprite, position_end)
    return sprite.position.x <= position_end.x
  end

  def get_position_end i, sprite
    return sprite.position.clone.sub(
      self.t_grotto.size.clone.multiply_scalar(sprite.scale * (i + 1)))
  end
end