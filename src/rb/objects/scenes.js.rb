import 'SScene', '../structs/s_scene'
import 'LevelAnimations', '../components/level_animations'
import 'STaskA', '../structs/task/s_task_a'
import 'STaskB', '../structs/task/s_task_b'

export default class Scenes < BasicObject
  IDLE_C = "idle_corner"
  MOVE_TO_L = "move_to_ladder"
  MOVE_D_L = "move_down_ladder"
  MOVE_TO_B = "move_to_bridge"
  MOVE_TO_D = "move_to_door"
  IDLE_D = "idle_door"

  def level_01
    self.get_scene(true).find_child('level_01')
  end

  def anims
    level_01.find_child('level_animations')
  end

  def ui
    self.get_scene(true).find_child('ui')
  end

  def ladder
    level_01.find_child('ladder')
  end

  def bridge
    level_01.find_child('bridge')
  end

  def language
    self.get_scene(true).find_child('language')
  end

  attr_reader :scenes, :current_scene

  def initialize
    super

    @scenes = {}
    @current_scene = {
      id: nil,
      i: -1
    }
  end

  def ready
    add_scene(IDLE_C, language.get_translate_scene(IDLE_C, 0), lambda do
      anims.play(IDLE_C)
    end)
    add_scene IDLE_C, language.get_translate_scene(IDLE_C, 1)
    add_scene IDLE_C, language.get_translate_scene(IDLE_C, 2)
    add_scene IDLE_C, language.get_translate_scene(IDLE_C, 3)
    add_scene(IDLE_C, nil, lambda do
      ui.active_click = false
      anims.play(MOVE_TO_L) do
        next_scene(MOVE_TO_L, -1)
        ui.active_click = true
      end
    end)

    add_scene MOVE_TO_L, language.get_translate_scene(MOVE_TO_L, 0)
    add_scene MOVE_TO_L, language.get_translate_scene(MOVE_TO_L, 1)
    add_scene MOVE_TO_L, language.get_translate_scene(MOVE_TO_L, 2)
    add_scene(MOVE_TO_L, nil, lambda do
      ui.ui_board.visible(true)
      ui.ui_board.board_task.start(STaskA.new(language)) do  # Task 1
        ui.ui_board.visible(false)
        next_scene(MOVE_D_L, -1)
      end
    end)

    add_scene(MOVE_D_L, language.get_translate_scene(MOVE_D_L, 0), lambda do
      ui.active_click = false
      ladder.unlock() do
        ui.active_click = true
      end
    end)
    add_scene(MOVE_D_L, nil, lambda do
      ui.active_click = false
      anims.play(MOVE_D_L) do
        ui.active_click = true
      end
    end)
    add_scene MOVE_D_L, language.get_translate_scene(MOVE_D_L, 1)
    add_scene MOVE_D_L, language.get_translate_scene(MOVE_D_L, 2)
    add_scene(MOVE_D_L, nil, lambda do
      ui.active_click = false
      anims.play(MOVE_TO_B) do
        ui.active_click = true
        next_scene(MOVE_TO_B, -1)
      end
    end)
    
    add_scene MOVE_TO_B, language.get_translate_scene(MOVE_TO_B, 0)
    add_scene MOVE_TO_B, language.get_translate_scene(MOVE_TO_B, 1)
    add_scene(MOVE_TO_B, nil, lambda do
      ui.ui_board.visible(true)
      ui.ui_board.board_task.start(STaskB.new(language)) do  # Task 2
        ui.ui_board.visible(false)
        next_scene(MOVE_TO_D, -1)
      end
    end)

    add_scene(MOVE_TO_D, language.get_translate_scene(MOVE_TO_D, 0), lambda do
      ui.active_click = false
      bridge.unlock() do
        ui.active_click = true
      end
    end)
    add_scene MOVE_TO_D, language.get_translate_scene(MOVE_TO_D, 1)
    add_scene(MOVE_TO_D, nil, lambda do
      ui.active_click = false
      anims.play(MOVE_TO_D) do
        ui.active_click = true
        next_scene(IDLE_D, -1)
      end
    end)

    add_scene IDLE_D, language.get_translate_scene(IDLE_D, 0)
    add_scene(IDLE_D, language.get_translate_scene(IDLE_D, 1), lambda do
      ui.active_click = false
    end)
  end

  def add_scene(id, message, event = nil)
    unless scenes[id]
      @scenes[id] = []
    end

    @scenes[id].push SScene.new(message, event)
  end

  def next_scene id, i = nil
    unless i
      i = 0
      if @current_scene.id == id
        i = (@current_scene.i + 1) % @scenes[id].length
      end
    end

    @current_scene.id = id
    @current_scene.i = i
    return @scenes[@current_scene.id][@current_scene.i]
  end
end