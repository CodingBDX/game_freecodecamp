/**  @type {HTMLCanvasElement} */
const els = {
canvas3: document.getElementById('canvas3'), 
numberOfEnemy: 30,
enemiesArray : [],
gameFrame: 0
}

const  ctx = els.canvas3.getContext('2d')
CANVAS_WIDTH = els.canvas3.width = 500;
CANVAS_HEIGHT = els.canvas3.height = 1000;


// enemy1 = {
//     x: 0,
//     y: 0,
//     width: 200,
//     height:200
// }
class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = './img/enemy/enemy1.png'
        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.width = this.spriteWidth/2.5;
        this.height = this.spriteHeight/2.5;
        // this.speed = Math.random() * 4 - 2;
        this.flapSpeed = Math.floor(Math.random()) * 3 + 1;
        this.y = Math.random() * (CANVAS_HEIGHT - this.height);
        this.x = Math.random() * (CANVAS_WIDTH - this.width);
        this.frame = 1;
    }
    update() {
        this.x += Math.random() * 15 - 7.5;
        this.y += Math.random() * 7 - 2.5;
        if (els.gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw() {
        // ctx.strokeRect(this.x,this.y,this.width,this.height)
        ctx.drawImage(this.image,this.frame * this.spriteWidth,0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
    }
}

// const enemy1 = new Enemy();
for (let index = 0; index < els.numberOfEnemy; index++) {
    els.enemiesArray.push(new Enemy());
//    console.log(els.enemiesArray)
    
}

const animateEnemy = () => {
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT)
    // enemy1.update();
    // enemy1.draw();
    els.enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
        // console.log(enemy);
    });
    // // ctx.fillRect(enemy1.x, enemy1.y, enemy1.width, enemy1.height)
    els.gameFrame++;
    requestAnimationFrame(animateEnemy)
}

animateEnemy();