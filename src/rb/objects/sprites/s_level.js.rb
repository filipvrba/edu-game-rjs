export default class SLevel < Sprite
  attr_accessor :origin_position

  def initialize s_sprite
    super
    @origin_position = Vector2::ZERO
  end
end