var theta = 5;
var r = 10;
var isMusicPlaying = false;
horn = new Audio('CarHorn.mp3');
music = new Audio('CarMusic.mp3');
w = window.innerWidth-150;
h = window.innerHeight-50;


// document.addEventListener("keydown", function(event) {
//     handleKey(event, true);
// });

// document.addEventListener("keyup", function(event) {
//     handleKey(event, false);
// });

// // to handle key events
// function handleKey(event, status) {
//     var currentController = keyMap[event.keyCode];
//     if(!!currentController) {
//         currentController.active = status;
//     }
// }

music.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
}, false);

document.onkeydown = function(e) {
    key=e.keyCode;
    // console.log(key + 'Button Pressed');
    // console.log('x = '+x);
    // console.log('y = '+y);
    // console.log('a = '+angle);

    // 37LEFT 38UP 39RIGHT 40BOTTOM

    if(key == 72) {
        horn.play();
    }

    if(key == 77) {
        playPauseMusic();
    }

    if (key == 37 || key==65) {
        moveUP();
        moveLEFT();
    }

    if (key == 38 || key==87) {
        moveUP();        
    }

    if (key == 39 || key==68) {
        moveUP();
        moveRIGHT();
    }

    if (key == 40 || key==83) {
        moveDOWN();
    }
}

function moveUP() {
    angle = getCurrentRotation(car);
    x = getCurrentLeft(car);
    y = getCurrentBottom(car);

    x+= r*cos(angle);
    y+= r*sin(angle);
    console.log(r*cos(angle),r*sin(angle));
    car.style.left = Math.round(x)+"px";
    car.style.bottom = Math.round(y)+"px";
}

function moveDOWN() {
    angle = getCurrentRotation(car);
    x = getCurrentLeft(car);
    y = getCurrentBottom(car);

    x-= r*cos(angle);
    y-= r*sin(angle);
    console.log(r*cos(angle),r*sin(angle));
    car.style.left = Math.round(x)+"px";
    car.style.bottom = Math.round(y)+"px";
}

function moveLEFT() {
    angle = getCurrentRotation(car);
    x = getCurrentLeft(car);
    y = getCurrentBottom(car);

    angle-=theta;
    car.style.transform = 'rotate('+angle+'deg)';
}

function moveRIGHT() {
    angle = getCurrentRotation(car);
    x = getCurrentLeft(car);
    y = getCurrentBottom(car);

    angle+=theta;
    car.style.transform = 'rotate('+angle+'deg)';
}

function playPauseMusic() {
    if(isMusicPlaying) {
        music.pause();
        isMusicPlaying = false;
    }
    else {
        music.play();
        isMusicPlaying = true;
    }
}

function cos(angle)
{
    return (Math.cos((360-angle)*3.14159/180));
}

function sin(angle)
{
    return (Math.sin((360-angle)*3.14159/180));
}

function getCurrentLeft(el){
    return parseInt(window.getComputedStyle(car, null).getPropertyValue('left'));
}

function getCurrentBottom(el){
    return parseInt(window.getComputedStyle(car, null).getPropertyValue('bottom'));
}

function getCurrentRotation(el){
    var st = window.getComputedStyle(el, null);
    var tm = st.getPropertyValue("-webkit-transform") ||
             st.getPropertyValue("-moz-transform") ||
             st.getPropertyValue("-ms-transform") ||
             st.getPropertyValue("-o-transform") ||
             st.getPropertyValue("transform") ||
             "none";
    if (tm != "none") {
      var values = tm.split('(')[1].split(')')[0].split(',');
      /*
      a = values[0];
      b = values[1];
      angle = Math.round(Math.atan2(b,a) * (180/Math.PI));
      */
      //return Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI));
      //this would return negative values the OP doesn't wants so it got commented and the next lines of code added
      var angle = Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI));
      return (angle < 0 ? angle + 360 : angle); //adding 360 degrees here when angle < 0 is equivalent to adding (2 * Math.PI) radians before
    }
    return 0;
  }