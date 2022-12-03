export default class TPlayerLadder < Tile
  attr_accessor :id_tile

  def initialize
    super Vector2.new(32, 38)

    @id_tile = 0
  end

  def ready()
    @img = this.get_scene(true).find_child('images').player_ladder
  end
end
