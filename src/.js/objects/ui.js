import Scenes from "./scenes";
import UIBoard from "../components/ui_board";

export default class UI extends BasicObject {
  get active_click() {
    return this._active_click
  };

  set active_click(active_click) {
    this._active_click = active_click
  };

  get panel() {
    return this._panel
  };

  get ui_board() {
    return this._ui_board
  };

  constructor() {
    super();

    this._click_handler = (e) => {
      return this.click()
    };

    this._panel = document.getElementById("panel");
    document.addEventListener(UI.CLICK, this._click_handler);
    this.write_message(null);
    this._active_click = true;
    this._ui_board = new UIBoard
  };

  ready() {
    this.add(this._ui_board, "ui_board");
    this._scenes = this.get_scene(true).find_child("scenes");
    this._scenes.next_scene(Scenes.IDLE_C, -1)
  };

  free() {
    document.removeEventListener(UI.CLICK, this._click_handler);
    super.free()
  };

  click() {
    if (!this._active_click) return;
    let scene = this._scenes.next_scene(this._scenes.current_scene.id);
    this.write_message(scene.message);
    if (scene.event) scene.event()
  };

  write_message(str) {
    if (str) {
      this._panel.style.visibility = "visible";
      this._panel.innerHTML = `<p>${str}</p>`
    } else {
      this._panel.style.visibility = "hidden"
    }
  }
};

UI.CLICK = "click"