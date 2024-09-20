import 'DynamicObj', './dynamic_obj'

export default class Ladder < DynamicObj
  SPRITE_ID = 159

  def initialize
    super SPRITE_ID, "sprite_l0_i130", 6
  end

  def physics_update_position(dt, sprite, position_end)
    if sprite.position.y < position_end.y
      sprite.position.y += 50 * self.scale * dt
    end
  end

  def is_done(sprite, position_end)
    return sprite.position.y >= position_end.y
  end
end