window.__mruby = lambda do |query|
  Ruby.new().Execute(query);
end
