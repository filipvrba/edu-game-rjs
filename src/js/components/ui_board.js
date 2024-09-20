import MRuby from "../third-side/mruby";
import BoardTask from "./ui_board/board_task";
import STask from "../structs/s_task";

export default class UIBoard extends BasicObject {
  get is_mrb_code_empty() {
    return this._mrb_code.value.length <= 0
  };

  get board_task() {
    return this._board_task
  };

  get task() {
    return this._task
  };

  get mrb_code() {
    return this._mrb_code
  };

  constructor() {
    super();

    this._button_ok_click_handler = () => {
      return this.button_ok_click()
    };

    this._mrb_code_change_handler = () => {
      return this.mrb_code_change()
    };

    this._mruby_print_handler = e => this.mruby_result(e.detail.value);
    this._board = document.getElementById("board");
    this._task = document.getElementById("board-task");
    this._mrb_code = document.getElementById("board-mrb-code");
    this._mrb_result = document.getElementById("board-mrb-result");
    this._button_ok = document.getElementById("board-button-ok");
    this._is_button_ok_access = false;
    this._board_task = new BoardTask
  };

  ready() {
    this._button_ok.addEventListener(
      UIBoard.CLICK,
      this._button_ok_click_handler
    );

    this._mrb_code.addEventListener(
      UIBoard.CHANGE,
      this._mrb_code_change_handler
    );

    document.querySelector("#app").addEventListener(
      "mruby-print",
      this._mruby_print_handler
    );

    return this.add(this._board_task, "board_task")
  };

  visible(boollean) {
    if (boollean) {
      this._board.style.visibility = "visible"
    } else {
      this._board.style.visibility = "hidden"
    };

    return this.parent.active_click = !boollean
  };

  button_ok_click() {
    let code;
    if (this.is_mrb_code_empty) return;

    if (this._is_button_ok_access) {
      this.reset();
      return this._board_task.callback_done()
    } else {
      // @mrb_result.value = "Processing of the code is ongoing..."
      this._mrb_result.value = this.error_message();
      code = this._board_task.s_task.code_evaluation(this._mrb_code.value);
      return __mruby(code)
    }
  };

  mruby_result(text) {
    let results, result_a, result_b, result_equals, result_code;

    if (text !== undefined) {
      if (text === "true" || text === "false") {
        return this._mrb_result.value = this.error_message()
      } else {
        results = text.split(STask.UNIQ_SYM);
        result_a = results[0];
        result_b = results[1];
        result_equals = result_a === result_b;
        result_code = result_equals ? 200 : 202;
        this.button_ok_access(result_a, result_b);
        return this._mrb_result.value = `|${result_code}|

result: '${result_a}'
expected_result: '${result_b}'
equals: ${result_equals}`
      }
    }
  };

  error_message(mes=null) {
    let report = "|400|\n\nAs the code was being processed, an unexpected error happened.";
    if (mes) report += `\n\nreport: ${mes}`;
    return report
  };

  mrb_code_change() {
    return this.is_mrb_code_empty ? this._button_ok.disabled = true : this._button_ok.disabled = false
  };

  button_ok_access(result_a, result_b) {
    if (this._board_task.s_task && (result_a && result_b) && result_a === result_b) {
      this._is_button_ok_access = true;
      return this._button_ok.className = "green"
    } else {
      this._is_button_ok_access = false;
      return this._button_ok.className = "blue"
    }
  };

  reset() {
    this._mrb_code.value = "";
    this._mrb_result.value = "";
    return this.button_ok_access(null, null)
  };

  free() {
    this._button_ok.removeEventListener(
      UIBoard.CLICK,
      this._button_ok_click_handler
    );

    this._mrb_code.removeEventListener(
      UIBoard.CHANGE,
      this._mrb_code_change_handler
    );

    document.querySelector("#app").addEventListener(
      "mruby-print",
      this._mruby_print_handler
    );

    return super.free()
  }
};

UIBoard.CLICK = "click";
UIBoard.CHANGE = "input"