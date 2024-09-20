import cs_scenes from "../../language/cs_scenes.json";
import cs_tasks from "../../language/cs_tasks.json";
import en_scenes from "../../language/en_scenes.json";
import en_tasks from "../../language/en_tasks.json";

export default class Language extends BasicObject {
  constructor() {
    super();
    this._target = this.client_lang()
  };

  client_lang() {
    switch (navigator.language) {
    case Language.CZECH:
    case "cs-CZ":
      return Language.CZECH;

    default:
      return Language.ENGLISH
    }
  };

  get_translate_scene(id, position) {
    switch (this._target) {
    case Language.ENGLISH:
      return en_scenes[id][position];

    case Language.CZECH:
      return cs_scenes[id][position];

    default:
      return null
    }
  };

  get_translate_task(id, position) {
    switch (this._target) {
    case Language.ENGLISH:
      return en_tasks[id][position];

    case Language.CZECH:
      return cs_tasks[id][position];

    default:
      return null
    }
  }
};

Language.ENGLISH = "en";
Language.CZECH = "cs"