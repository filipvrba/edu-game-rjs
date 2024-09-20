var Module = {
  print: (function(text) {
    if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
    
    customEvent = new CustomEvent('mruby-print', {
      detail: {
        value: text
      }
    })
    document.querySelector('#app').dispatchEvent(customEvent);
  })
}
