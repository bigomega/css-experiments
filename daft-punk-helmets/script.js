function delay(t, v) {
  return new Promise(function(resolve) {
    setTimeout(resolve.bind(null, v), t)
  });
}

function initiateGlobalTimer() {
  let time = 0
  let timer = setInterval(function(){
    const timeCallbacks = {
      '6.5': _ => { display('white', 'PTX'); display('orange', 'PTX') },
      // '26': _ => $('.logo').addClass('animate')
    }
    timeCallbacks[time] && timeCallbacks[time]()
    time += .5
  }, 500)
}

$.fn.lightOff = function() {
  this.removeClass('on-r on-g')
}

function display(type, val){
  $(`.${type} .light`).lightOff()
  const query = (window[type][val] || window[type]['Ω']).split('\n').map((row, i) => 
    row.split('').map((v,j) => 
      v !== ' ' ? $(`.${type} .light-${i}-${j}`).addClass('on-'+v) : ''
    )
  )
}

$(document).ready(function(){
  $('.helmet-container, img').bind('click', e => {
    $('.helmet-container').addClass('expand')
    $('.helmet-container, img').unbind('click')
    setTimeout(function(){
      var count = 3;
      display('white', count)
      display('orange', count)
      var timer = setInterval(function() {
        if(count === 1) {
          clearInterval(timer);
          display('white', 'GO')
          display('orange', 'GO')
          $('.white').removeClass('colored')
          delay(450)
            .then(_ => $('.orange').removeClass('colored'))
            .then(_ => delay(500))
            .then(_ => $('.white').addClass('colored'))
            .then(_ => delay(450))
            .then(_ => $('.orange').addClass('colored'))
            .catch(_ => window.location.reload())
          ;
          $('audio')[0].play()
          initiateGlobalTimer()
        } else {
          display('white', count-1)
          display('orange', count-1)
          count--;
        }
      }, 1000);
    }, 750)
  })

  $('.white .display').html([...Array(5)].map((und, i) => 
    `<div class="row">${
      [...Array(17)].map((und, j) => `<div class="light light-${i}-${j}"></div>`).join('')
    }</div>`
  ).join(''))
  display('white', 'initial_play')


  $('.orange .display').html([...Array(20)].map((und, i) => 
    `<div class="row">${
      [...Array(11)].map((und, j) => `<div class="light light-${i}-${j}"></div>`).join('')
    }</div>`
  ).join(''))
  display('orange', 'initial_play')
});
