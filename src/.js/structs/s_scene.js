export default class SScene {
  get message() {
    return this._message
  };

  set message(message) {
    this._message = message
  };

  get event() {
    return this._event
  };

  set event(event) {
    this._event = event
  };

  constructor(message, event) {
    this._message = message;
    this._event = event
  }
}