const els = {
    canvas2: document.getElementById('canvas2'),
    slider : document.getElementById('slider'),
    showGameSpeed: document.getElementById('showGameSpeed'),
}

const ctx = els.canvas2.getContext('2d');
const CANVAS_WIDTH = els.canvas2.width = 800;
const CANVAS_HEIGHT = els.canvas2.height =700;
let gameSpeed = 5;
let gameFrame = 0;
els.slider.value = gameSpeed;
els.showGameSpeed.innerHTML = gameSpeed;

slider.addEventListener('change',function(e)  {
    gameSpeed = e.target.value;
els.showGameSpeed.innerHTML = e.target.value;

})
// console.log(els.slider.value)

const backgroundLayer1 = new Image();

backgroundLayer1.src = './img/background/layer-1.png';

const backgroundLayer2 = new Image();
backgroundLayer2.src = './img/background/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = './img/background/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = './img/background/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = './img/background/layer-5.png';


window.addEventListener('load', () => {
class layer {
    constructor(image, speedModified) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        // this.x2 = this.width;
        this.image = image;
        this.speedModified = speedModified;
        this.speed = gameSpeed * this.speedModified;


    }

    update = () => {
        this.speed = gameSpeed * this.speedModified;
        // (this.x <= -this.width) ? this.x = 0  :'' ;
        // (this.x2 <= -this.width) ? this.x2 = this.width + this.x - this.speed  :'' ;
        // this.x = Math.floor(this.x - this.speed);
        this.x = gameFrame * this.speed % this.width;
        // this.x2 = Math.floor(this.x2 - this.speed);
        
    }
    draw = () => {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        
    }
    
}
const layer1 = new layer(backgroundLayer1, 0.3);
const layer2 = new layer(backgroundLayer2, 0.3);
const layer3 = new layer(backgroundLayer3, 0.2);
const layer4 = new layer(backgroundLayer4, 0.8);
const layer5 = new layer(backgroundLayer5, 0.5);

const gameObjects = [layer1, layer2, layer3, layer4, layer5]
const animateBackground = () => {
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT)
    gameObjects.forEach(object => {
        object.update();
        object.draw();
        gameFrame--;
   })
    requestAnimationFrame(animateBackground);
}

animateBackground()
})
