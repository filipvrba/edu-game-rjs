import STask from "../s_task";
import Helper from "../../helper";

export default class STaskA extends STask {
  constructor(language) {
    let info = `${`
      <p>${language.get_translate_task("a", 0)}</p>
      <h2>${language.get_translate_task(
      "a",
      1
    )}</h2
      <p>${language.get_translate_task("a", 2)}</p>

      <h3>${language.get_translate_task(
      STask.EXAMPLE,
      0
    )}</h3>
      <strong>'1 5 -3 4 2' => '-3 5'</strong>

      <p>${language.get_translate_task(
      "a",
      3
    )}</p>
    `}`;

    let code = `${`
def vector_correction(str_nums)
  
end
    `}`;
    let code_result = `${`
def vector_correction_result(str_nums)
  return str_nums.split(" ").minmax.join(" ")
end
    `}`;
    super(info, code.trim(), code_result.trim())
  };

  static generate_input(length) {
    let result = [];

    for (let i = 0; i < length; i++) {
      let number = Helper.random_int(-10, 10);
      result.push(number)
    };

    return result.join(" ")
  };

  code_evaluation(code) {
    let input = STaskA.generate_input(Helper.random_int(5, 10));
    return `${`
${code}
${this.code_result}

code = vector_correction('${input}')
code_result = vector_correction_result('${input}')
"\#{code}${STask.UNIQ_SYM}\#{code_result}"
    `}`.trim()
  }
}