export default class Helper {
  static random_int(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  };

  static random_char() {
    let chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let number = Helper.random_int(0, chars.length - 1);
    return chars[number]
  }
}