// http://jsfiddle.net/vWx8V/
var keyCodeToChar = {8:'Backspace',9:'Tab',13:'Enter',16:'Shift',17:'Ctrl',18:'Alt',19:'Pause/Break',20:'Caps Lock',27:'Esc',32:'Space',33:'Page Up',34:'Page Down',35:'End',36:'Home',37:'Left',38:'Up',39:'Right',40:'Down',45:'Insert',46:'Delete',48:'0',49:'1',50:'2',51:'3',52:'4',53:'5',54:'6',55:'7',56:'8',57:'9',65:'A',66:'B',67:'C',68:'D',69:'E',70:'F',71:'G',72:'H',73:'I',74:'J',75:'K',76:'L',77:'M',78:'N',79:'O',80:'P',81:'Q',82:'R',83:'S',84:'T',85:'U',86:'V',87:'W',88:'X',89:'Y',90:'Z',91:'Super',92:'Right Super',93:'Right Click',96:'Numpad 0',97:'Numpad 1',98:'Numpad 2',99:'Numpad 3',100:'Numpad 4',101:'Numpad 5',102:'Numpad 6',103:'Numpad 7',104:'Numpad 8',105:'Numpad 9',106:'Numpad *',107:'Numpad +',109:'Numpad -',110:'Numpad .',111:'Numpad /',112:'F1',113:'F2',114:'F3',115:'F4',116:'F5',117:'F6',118:'F7',119:'F8',120:'F9',121:'F10',122:'F11',123:'F12',144:'Num Lock',145:'Scroll Lock',182:'My Computer',183:'My Calculator',186:';',187:'=',188:',',189:'-',190:'.',191:'/',192:'`',219:'[',220:'\\',221:']',222:'\'',224:'Super'};
var keyCharToCode = {'Backspace':8,'Tab':9,'Enter':13,'Shift':16,'Ctrl':17,'Alt':18,'Pause/Break':19,'Caps Lock':20,'Esc':27,'Space':32,'Page Up':33,'Page Down':34,'End':35,'Home':36,'Left':37,'Up':38,'Right':39,'Down':40,'Insert':45,'Delete':46,'0':48,'1':49,'2':50,'3':51,'4':52,'5':53,'6':54,'7':55,'8':56,'9':57,'A':65,'B':66,'C':67,'D':68,'E':69,'F':70,'G':71,'H':72,'I':73,'J':74,'K':75,'L':76,'M':77,'N':78,'O':79,'P':80,'Q':81,'R':82,'S':83,'T':84,'U':85,'V':86,'W':87,'X':88,'Y':89,'Z':90,'Super':91,'Right Super':92,'Right Click':93,'Numpad 0':96,'Numpad 1':97,'Numpad 2':98,'Numpad 3':99,'Numpad 4':100,'Numpad 5':101,'Numpad 6':102,'Numpad 7':103,'Numpad 8':104,'Numpad 9':105,'Numpad *':106,'Numpad +':107,'Numpad -':109,'Numpad .':110,'Numpad /':111,'F1':112,'F2':113,'F3':114,'F4':115,'F5':116,'F6':117,'F7':118,'F8':119,'F9':120,'F10':121,'F11':122,'F12':123,'Num Lock':144,'Scroll Lock':145,'My Computer':182,'My Calculator':183,';':186,'=':187,',':188,'-':189,'.':190,'/':191,'`':192,'[':219,'\\':220,']':221,'\'':222};

if(!!navigator.userAgent.match(/Mac/)) {
  keyCodeToChar[224] = 'cmd' // Firefox
  keyCodeToChar[93] = 'Right cmd' // Right cmd
  keyCodeToChar[91] = 'cmd'
  keyCharToCode['cmd'] = 91
  // '⇧': 16, '⌥': 18, '⌃': 17, '⌘': 91,
}


keyCodeToChar[-1] = 'Click'
keyCodeToChar[-2] = 'Point-Click'
keyCharToCode['Point-Click'] = -2
keyCharToCode['Click'] = -1
var keyBinding = {
  Q: keyCharToCode.Q,
  W: keyCharToCode.W,
  E: keyCharToCode.E,
  R: keyCharToCode.R,
  D: keyCharToCode.D,
  F: keyCharToCode.F,
}
var spells = {
  'cold snap': { combo: { Q:3 }, target: true, unit: true },
  'ghost walk': { combo: { Q:2, W:1 } },
  'tornado': { combo: { Q:1, W:2 }, target: true },
  'emp': { combo: { W:3 }, target: true, radius: 675 },
  'alacrity': { combo: { W:2, E:1 }, target: true, unit: true },
  'chaos meteor': { combo: { W:1, E:2 }, target: true },
  'sun strike': { combo: { E:3 }, target: true, radius: 175 },
  'forge spirit': { combo: { E:2, Q:1 } },
  'ice wall': { combo: { E:1, Q:2 } },
  'deafening blast': { combo: { Q:1, W:1, E:1 }, target: true },
  _list: ['cold snap' 'ghost walk', 'tornado', 'emp', 'alacrity', 'chaos meteor', 'sun strike', 'forge spirit', 'ice wall', 'deafening blast']
}


var userCombo = []
function reset() {
  userCombo = []
}

function test() {
  // 1 - if done right
  // 0 - if right but not done yet
  // -1 - if done wrong
  var isEqual = userCombo.join('') === combo.slice(0, userCombo.length).join('')
  if (!isEqual) {
    return -1
  }

  return +(userCombo.length === combo.length)
}


var keyBindHappening

var TIME_TICK = 1
var timer = null
// for default values, only use alphabets. Special characters codes are very inconsistent
var combo = 'Q W E R D'
console.log(combo.split(' ').join(' > '))
combo = combo.split(' ').map(str => keyCharToCode[str])
console.log(combo)
var startTime, currentTime
var started
function start(combo) {
  startTime = new Date()
  currentTime = new Date()
  timer = window.setInterval(function(){
    currentTime = new Date()
    $('.timer').html(currentTime - startTime)
    // render  currentTime - startTime
  }, TIME_TICK)
}


started = true
$(document).keydown(function(event) {
  var key = event.which || event.key || event.keyIdentifier || event.keyCode
  console.log('-----> down', keyCodeToChar[key], key)
  // console.log(key, 'alt, ctrl, meta, shift', event.altKey, event.ctrlKey, event.metaKey, event.shiftKey)

  if(started) {
    if (!userCombo.length) {
      start()
    }
    userCombo.push(key)
    if(test() === -1) {
      window.clearInterval(timer)
      console.log('<<<<<<WRONG')
      window.alert('Sorry, wrong combo')
      started = false
    } else if (test() === 1) {
      window.clearInterval(timer)
      console.log('<<<<<<RIGHT')
      window.alert('Whatteey WOW. So fast - ' + (currentTime - startTime)/1000 + ' s')
      console.log(currentTime - startTime)
      started = false
    } else {
      //
    }
    event.preventDefault()
    event.stopPropagation()
  } else if(keyBindHappening) {
    //
    event.preventDefault()
    event.stopPropagation()
  }
})


$(document).keyup(function(event) {
  var key = event.which || event.key || event.keyIdentifier || event.keyCode
  console.log('-----> release', keyCodeToChar[key], key)
})


$(document).keypress(function(event) {
  var key = event.which || event.key || event.keyIdentifier || event.keyCode
  console.log('-----> press', keyCodeToChar[key], key)
})
