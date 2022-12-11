export default class STask {
  get info() {
    return this._info
  };

  set info(info) {
    this._info = info
  };

  get code() {
    return this._code
  };

  set code(code) {
    this._code = code
  };

  get code_result() {
    return this._code_result
  };

  set code_result(code_result) {
    this._code_result = code_result
  };

  constructor(info, code, code_result) {
    this._info = info;
    this._code = code;
    this._code_result = code_result
  }
};

STask.EXAMPLE = "example";
STask.UNIQ_SYM = "<<|>>"