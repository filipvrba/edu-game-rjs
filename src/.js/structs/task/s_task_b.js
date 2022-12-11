import STask from "../s_task";
import Helper from "../../helper";

export default class STaskB extends STask {
  constructor(language) {
    let info = `${`
      <p>${language.get_translate_task("b", 0)}</p>
      <h2>${language.get_translate_task(
      "b",
      1
    )}</h2>
      <p>${language.get_translate_task("b", 2)}</p>

      <h3>${language.get_translate_task(
      STask.EXAMPLE,
      0
    )}</h3>
      <strong>'f357a6' => '7a6f35'</strong>

      <p>${language.get_translate_task(
      "b",
      3
    )}</p>

      <h3>${language.get_translate_task(STask.EXAMPLE, 0)}</h3>
      <strong>[['f', '3', '5'], ['7', 'a', '6']]</strong>

      <p>${language.get_translate_task(
      "b",
      4
    )}</p>
    `}`;

    let code = `${`\ndef id_correction(str)\n  \nend\n    `}`;
    let code_result = `${`
def id_correction_result(str)
  return str.split("", str.length)
    .partition.with_index { |_,i| i < str.length / 2 }.rotate.join
end
    `}`;
    super(info, code.trim(), code_result.trim())
  };

  static generate_input(length) {
    let result = "";

    for (let i = 0; i < length; i++) {
      result += Helper.random_char()
    };

    return result
  };

  code_evaluation(code) {
    let input = STaskB.generate_input(Helper.random_int(10, 20));
    return `${`
${code}
${this.code_result}

code = id_correction('${input}')
code_result = id_correction_result('${input}')
"\#{code}${STask.UNIQ_SYM}\#{code_result}"
    `}`.trim()
  }
}