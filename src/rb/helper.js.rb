export default class Helper
  def self.random_int(min, max)
    return Math.floor(Math.random() * (max - min) ) + min
  end

  def self.random_char()
    chars = "abcdefghijklmnopqrstuvwxyz0123456789"
    number = Helper.random_int(0, chars.length - 1)
    return chars[number]
  end
end
