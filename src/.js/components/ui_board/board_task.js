import STask from "../../structs/s_task";

export default class BoardTask extends BasicObject {
  get s_task() {
    return this._s_task
  };

  get callback_done() {
    return this._callback_done
  };

  constructor() {
    super();
    this._s_task = null;
    this._callback_done = null
  };

  start(task, callback) {
    this._s_task = task;
    this.parent.reset();
    this.parent.task.innerHTML = this._s_task.info;
    this.parent.mrb_code.value = this._s_task.code;
    this.parent.mrb_code_change();
    this.parent.visible(true);
    this._callback_done = callback
  };

  done() {
    this._callback_done.call();
    this._s_task = null;
    this._callback_done = null
  }
}