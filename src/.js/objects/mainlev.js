export default class MainLev extends Sprite {
  constructor(type) {
    super(type)
  };

  ready() {
    super.ready();
    this.img = this.get_scene(true).find_child("images").mainlev
  }
}