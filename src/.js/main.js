import "../css/style.css";
import "../css/dark_theme.css";
import "../css/bootstrap-grid.min.css";
import "../css/bootstrap-utilities.min.css";
import Images from "./objects/images";
import Level01 from "./scenes/level_01";
import UI from "./objects/ui";
import Scenes from "./objects/scenes";
import Language from "./objects/language";
document.querySelector("#app").innerHTML = "<canvas-2d></canvas-2d>";
let canvas_2d = document.querySelector("canvas-2d");
let scene_r = canvas_2d.scene_r;
scene_r.connect("resize", s => update_scene_pos(s));
scene_r.add(new Language, "language");
scene_r.add(new Scenes, "scenes");
scene_r.add(new UI, "ui");
let level_01 = new Level01;

function update_scene_pos(size) {
  scene_r.global_position = canvas_2d.win_center_position
};

update_scene_pos();
let images = new Images;
scene_r.add(images, "images");
scene_r.add(level_01, "level_01");
let grid = new Grid(new Vector2(16, 16));
grid.scale = 2;
grid.visible = false;
scene_r.add(grid, "grid")