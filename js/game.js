let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    console.log("Starte");
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


window.addEventListener('keydown', (event) => {

    // console.log("Taste gerückt");


    if (event.key == 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (event.key == 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if (event.key == 'ArrowUp') {
        keyboard.UP = true;
    }
    if (event.key == 'ArrowDown') {
        keyboard.DOWN = true;
    }
    if (event.key == 'Space') {
        keyboard.SPACE = true;
    }

    if (event.key == 'd') {
        keyboard.D = true;
    }

    if (event.key == 'f') {
        keyboard.F = true;
    }

});


window.addEventListener('keyup', (event) => {

    if (event.key == 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if (event.key == 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if (event.key == 'ArrowUp') {
        keyboard.UP = false;
    }
    if (event.key == 'ArrowDown') {
        keyboard.DOWN = false;
    }
    if (event.key == 'Space') {
        keyboard.SPACE = false;
    }
    if (event.key == 'd') {
        keyboard.D = false;
    }

    if (event.key == 'f') {
        keyboard.F = false;
    }


});

