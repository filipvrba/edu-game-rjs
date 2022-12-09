import 'PlayerAnimations', '../components/player_animations'

export default class Player < KinematicBody
  attr_accessor :is_sprite_edge
  attr_reader :sprite

  def initialize
    super
    @scale = 2
    self.visible_point = false

    @sprite = Sprite.new
    @sprite.scale = @scale
    @sprite.centered = true

    @player_animations = PlayerAnimations.new
  end

  def ready()
    self.add @player_animations, 'player_animations'
    self.add @sprite, 'player_sprite'
  end

  def update_scale scale
    @scale = scale
    @sprite.scale = scale
    @sprite.offset.y = (-@player_animations.animation_sprite.current_tile.size.h * scale) / 2
  end
end
