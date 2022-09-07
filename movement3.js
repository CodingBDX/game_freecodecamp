/**  @type {HTMLCanvasElement} */
const els = {
canvas3: document.getElementById('canvas3'), 
numberOfEnemy: 5,
enemiesArray : [],
gameFrame: 0
}

const  ctx = els.canvas3.getContext('2d')
CANVAS_WIDTH = els.canvas3.width = 800;
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
        this.image.src = './img/enemy/enemy3.png'
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.speed = Math.random() * 3 + 1 ;
        this.flapSpeed = Math.floor(Math.random()) * 3 + 1;
        this.y = Math.random() * (CANVAS_HEIGHT - this.height);
        this.x = Math.random() * (CANVAS_WIDTH - this.width);
        this.frame = 0;
        this.angle = Math.random() * 500;
        this.angleSpeed = Math.random() * 1.2 + 0.5;
     this.curve = Math.random() * 200 + 50;

    }
    update() {
        this.x = this.curve * Math.sin(this.angle * Math.PI/700) + (CANVAS_WIDTH/2  - this.width/2);
        // this.y += this.curve * Math.sin(this.angle);
        this.y = this.curve * Math.cos(this.angle * Math.PI/360) + (CANVAS_WIDTH/2  - this.width/2);

        this.angle += this.angleSpeed;
        (this.x + this.width < 0) ? this.X = this.canvas3 : '';
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