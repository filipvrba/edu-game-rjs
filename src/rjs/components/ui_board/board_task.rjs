import 'STask', '../../structs/s_task'

export default class BoardTask < BasicObject
  attr_reader :s_task, :callback_done

  def initialize
    super

    @s_task = nil
    @callback_done = nil
  end

  def start task, &callback
    @s_task = task

    self.parent.reset()
    self.parent.task.innerHTML = @s_task.info
    self.parent.mrb_code.value = @s_task.code
    self.parent.mrb_code_change()

    self.parent.visible(true)
    @callback_done = callback
  end

  def done()
    @callback_done.call()
    @s_task = nil
    @callback_done = nil
  end
end