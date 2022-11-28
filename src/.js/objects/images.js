// https://img.itch.zone/aW1hZ2UvNDY4NzkyLzIzOTYwMjMucG5n/original/pUNrO5.png
export default class Images extends BasicObject {
  get mainlev() {
    return this._mainlev
  };

  constructor() {
    super();
    this._mainlev = new Image;
    this._mainlev.src = "/assets/canves/mainlev_build.png"
  };

  draw(r) {
    r.imageSmoothingEnabled = false
  }
}