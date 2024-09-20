import SScene from "../structs/s_scene";
import LevelAnimations from "../components/level_animations";
import STaskA from "../structs/task/s_task_a";
import STaskB from "../structs/task/s_task_b";

export default class Scenes extends BasicObject {
  get level_01() {
    return this.get_scene(true).find_child("level_01")
  };

  get anims() {
    return this.level_01.find_child("level_animations")
  };

  get ui() {
    return this.get_scene(true).find_child("ui")
  };

  get ladder() {
    return this.level_01.find_child("ladder")
  };

  get bridge() {
    return this.level_01.find_child("bridge")
  };

  get language() {
    return this.get_scene(true).find_child("language")
  };

  get scenes() {
    return this._scenes
  };

  get current_scene() {
    return this._current_scene
  };

  constructor() {
    super();
    this._scenes = {};
    this._current_scene = {id: null, i: -1}
  };

  get ready() {
    this.add_scene(
      Scenes.IDLE_C,
      this.language.get_translate_scene(Scenes.IDLE_C, 0),
      () => this.anims.play(Scenes.IDLE_C)
    );

    this.add_scene(
      Scenes.IDLE_C,
      this.language.get_translate_scene(Scenes.IDLE_C, 1)
    );

    this.add_scene(
      Scenes.IDLE_C,
      this.language.get_translate_scene(Scenes.IDLE_C, 2)
    );

    this.add_scene(
      Scenes.IDLE_C,
      this.language.get_translate_scene(Scenes.IDLE_C, 3)
    );

    this.add_scene(Scenes.IDLE_C, null, () => {
      this.ui.active_click = false;

      return this.anims.play(Scenes.MOVE_TO_L, () => {
        this.next_scene(Scenes.MOVE_TO_L, -1);
        return this.ui.active_click = true
      })
    });

    this.add_scene(
      Scenes.MOVE_TO_L,
      this.language.get_translate_scene(Scenes.MOVE_TO_L, 0)
    );

    this.add_scene(
      Scenes.MOVE_TO_L,
      this.language.get_translate_scene(Scenes.MOVE_TO_L, 1)
    );

    this.add_scene(
      Scenes.MOVE_TO_L,
      this.language.get_translate_scene(Scenes.MOVE_TO_L, 2)
    );

    this.add_scene(Scenes.MOVE_TO_L, null, () => {
      this.ui.ui_board.visible(true);

      return this.ui.ui_board.board_task.start(
        new STaskA(this.language),

        () => {
          this.ui.ui_board.visible(false);
          return this.next_scene(Scenes.MOVE_D_L, -1)
        }
      )
    });

    this.add_scene(
      Scenes.MOVE_D_L,
      this.language.get_translate_scene(Scenes.MOVE_D_L, 0),

      () => {
        this.ui.active_click = false;
        return this.ladder.unlock(() => this.ui.active_click = true)
      }
    );

    this.add_scene(Scenes.MOVE_D_L, null, () => {
      this.ui.active_click = false;

      return this.anims.play(
        Scenes.MOVE_D_L,
        () => this.ui.active_click = true
      )
    });

    this.add_scene(
      Scenes.MOVE_D_L,
      this.language.get_translate_scene(Scenes.MOVE_D_L, 1)
    );

    this.add_scene(
      Scenes.MOVE_D_L,
      this.language.get_translate_scene(Scenes.MOVE_D_L, 2)
    );

    this.add_scene(Scenes.MOVE_D_L, null, () => {
      this.ui.active_click = false;

      return this.anims.play(Scenes.MOVE_TO_B, () => {
        this.ui.active_click = true;
        return this.next_scene(Scenes.MOVE_TO_B, -1)
      })
    });

    this.add_scene(
      Scenes.MOVE_TO_B,
      this.language.get_translate_scene(Scenes.MOVE_TO_B, 0)
    );

    this.add_scene(
      Scenes.MOVE_TO_B,
      this.language.get_translate_scene(Scenes.MOVE_TO_B, 1)
    );

    this.add_scene(Scenes.MOVE_TO_B, null, () => {
      this.ui.ui_board.visible(true);

      return this.ui.ui_board.board_task.start(
        new STaskB(this.language),

        () => {
          this.ui.ui_board.visible(false);
          return this.next_scene(Scenes.MOVE_TO_D, -1)
        }
      )
    });

    this.add_scene(
      Scenes.MOVE_TO_D,
      this.language.get_translate_scene(Scenes.MOVE_TO_D, 0),

      () => {
        this.ui.active_click = false;
        return this.bridge.unlock(() => this.ui.active_click = true)
      }
    );

    this.add_scene(
      Scenes.MOVE_TO_D,
      this.language.get_translate_scene(Scenes.MOVE_TO_D, 1)
    );

    this.add_scene(Scenes.MOVE_TO_D, null, () => {
      this.ui.active_click = false;

      return this.anims.play(Scenes.MOVE_TO_D, () => {
        this.ui.active_click = true;
        return this.next_scene(Scenes.IDLE_D, -1)
      })
    });

    this.add_scene(
      Scenes.IDLE_D,
      this.language.get_translate_scene(Scenes.IDLE_D, 0)
    );

    return this.add_scene(
      Scenes.IDLE_D,
      this.language.get_translate_scene(Scenes.IDLE_D, 1),
      () => this.ui.active_click = false
    )
  };

  add_scene(id, message, event=null) {
    if (!this.scenes[id]) this._scenes[id] = [];
    return this._scenes[id].push(new SScene(message, event))
  };

  next_scene(id, i=null) {
    if (!i) {
      i = 0;

      if (this._current_scene.id === id) {
        i = (this._current_scene.i + 1) % this._scenes[id].length
      }
    };

    this._current_scene.id = id;
    this._current_scene.i = i;
    return this._scenes[this._current_scene.id][this._current_scene.i]
  }
};

Scenes.IDLE_C = "idle_corner";
Scenes.MOVE_TO_L = "move_to_ladder";
Scenes.MOVE_D_L = "move_down_ladder";
Scenes.MOVE_TO_B = "move_to_bridge";
Scenes.MOVE_TO_D = "move_to_door";
Scenes.IDLE_D = "idle_door"