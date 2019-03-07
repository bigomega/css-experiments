function displayWhite(){
  //
}

$(document).ready(function(){
  $('.helmet-container, img').bind('click', e => {
    $('.helmet-container').addClass('expand')
    $('.helmet-container, img').unbind('click')
    var count = 3;
    console.log(count)
    var timer = setInterval(function() {
      if(count === 1) {
        clearInterval(timer);
        console.log(count-1)
        $('audio')[0].play()
      } else {
        console.log(count-1)
        count--;
      }
    }, 1000);
  })
});
