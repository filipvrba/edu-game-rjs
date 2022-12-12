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
  };

  static get_docs(language) {
    return `${`
    <h3>${language.get_translate_task(STask.DOCS, 0)}</h3>
    <p>${language.get_translate_task(
      STask.DOCS,
      1
    )}</p>
    <ul>
      <li><a href='https://mruby.org/docs/api/Array.html'>Array</a></li>
      <li><a href='https://mruby.org/docs/api/String.html'>String</a></li>
    </ul>
    `}`
  }
};

STask.EXAMPLE = "example";
STask.DOCS = "docs";
STask.UNIQ_SYM = "<<|>>"