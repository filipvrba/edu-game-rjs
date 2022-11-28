import "../css/style.css";
import Pillar from "./objects/pillar";
import Images from "./objects/images";
document.querySelector("#app").innerHTML = "<canvas-2d></canvas-2d>";
let canvas_2d = document.querySelector("canvas-2d");
let scene_r = canvas_2d.scene_r;
scene_r.connect("resize", () => update_scene_pos());

function update_scene_pos() {
  scene_r.global_position = canvas_2d.win_center_position
};

update_scene_pos();
let images = new Images;
scene_r.add(images, "images");
let pillar = new Pillar(Pillar.BREAK_UP_LEFT);
pillar.scale = 5;
scene_r.add(pillar, "pillar")