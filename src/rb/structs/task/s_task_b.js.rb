import 'STask', '../s_task'
import 'Helper', '../../helper'

export default class STaskB < STask
  def initialize language
  info = """
      <p>#{language.get_translate_task(:b, 0)}</p>
      <h2>#{language.get_translate_task(:b, 1)}</h2>
      <p>#{language.get_translate_task(:b, 2)}</p>

      <h3>#{language.get_translate_task(STask::EXAMPLE, 0)}</h3>
      <strong>'f357a6' => '7a6f35'</strong>

      <p>#{language.get_translate_task(:b, 3)}</p>

      <h3>#{language.get_translate_task(STask::EXAMPLE, 0)}</h3>
      <strong>[['f', '3', '5'], ['7', 'a', '6']]</strong>

      <p>#{language.get_translate_task(:b, 4)}</p>

      #{STask.get_docs(language)}
    """
    code = '''
def id_correction(str)
  
end
    '''
    code_result = '''
def id_correction_result(str)
  return str.split("", str.length)
    .partition.with_index { |_,i| i < str.length / 2 }.rotate.join
end
    '''

    super info, code.trim(), code_result.trim()
  end

  def self.generate_input(length)
    result = ""
    (0...length).each do |i|
      result += Helper.random_char()
    end
    return result
  end

  def code_evaluation code
    input = STaskB.generate_input Helper.random_int(10, 20)

    return """
#{code}
#{self.code_result}

code = id_correction('#{input}')
code_result = id_correction_result('#{input}')
puts \"\#{code}#{STask.UNIQ_SYM}\#{code_result}\"
    """.trim()
  end
end