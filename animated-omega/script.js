// b - bottom triangle
// t - top triangle
// tb - both
var bigomega_grid = [
    ' bbb',
    ' bttb',
    ['', 'tb', ' ', 'tb'],
    ['b', 'tb', '', '', 'tb', 'b'],
    'tt tt'
  ]

  $('.bigomega-block').html((new Array(6)).join(1).split('').reduce(function(mem, x, index) {
    return mem + '\
      <div class="line line-'+(index+1)+'">\
        ' + (new Array(7)).join(1).split('').reduce(function(mem2, y, index2) {
          return mem2 + '\
            <div class="point point-'+(index2+1)+' point-'+(bigomega_grid[index][index2] || '')+'"></div>\
          '
        }, '') + '\
      </div>\
    '
  }, ''))

  $('.point-t, .point-b').each(function(index) {
    var delay = Math.random() * 2 * Math.random() < 0.5 ? -1 : 1
    var duration = Math.random() < 0.5 ? Math.random() * 3 : 3
    duration = duration > 1 ? duration : 1
    $(this).attr('style', '\
      -webkit-animation-delay: '+delay+'s;\
       -moz-animation-delay: '+delay+'s;\
       -o-animation-delay: '+delay+'s;\
       animation-delay: '+delay+'s;\
      -webkit-animation-duration: '+duration+'s;\
       -moz-animation-duration: '+duration+'s;\
       -o-animation-duration: '+duration+'s;\
       animation-duration: '+duration+'s;\
    ')
  })
