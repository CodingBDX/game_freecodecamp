const els = {
    canvas4 : document.getElementById('canvas4'),
    explosions: [],
}
let canvasPosition = els.canvas4.getBoundingClientRect();

const ctx = els.canvas4.getContext('2d');
els.canvas4.width = 500;
els.canvas4.height = 700;

// ctx.fillStyle = 'red';
// ctx.fillRect(10, 10, 50, 50);

class Explosion {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.7;
        this.height = this.spriteHeight * 0.7;
        this.image = new Image();
        this.image.src = './img/boom.png';
        this.audio = new Audio();
        this.audio.src = './sound/rumble.flac'
        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2;
    }

    update() {
        (this.frame === 0) ? this.audio.play(): '';
        this.timer++;
        (this.timer % 10 === 0) ? this.frame++ : '';
        // this.frame++;
     }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)
        ctx.drawImage(this.image, this.spriteWidth * this.frame,0,this.spriteWidth, this.spriteHeight , 0 , 0, this.width, this.height)
        ctx.restore();
    }
}

// const explosion = new Explosion()

window.addEventListener('click', e => { 
    createAnimation(e);
})

const createAnimation = e => {
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;
   els.explosions.push(new Explosion(positionX -25, positionY -25));
    // ctx.fillStyle = 'red';
    // ctx.fillRect(e.x - canvasPosition.left -25,e.y - canvasPosition.top -25 , 50, 50)

}

const animateExplosion = () => {
    ctx.clearRect(0,0, els.canvas4.width, els.canvas4.height)
    for (let index = 0; index < els.explosions.length; index++) {
        els.explosions[index].update();
        els.explosions[index].draw();
        if(els.explosions[index].frame > 5) {
            els.explosions.splice(index, 1);
            index--;
        }

        
    }
    requestAnimationFrame(animateExplosion)
}

animateExplosion()