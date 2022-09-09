// document.addEventListener('load', () => {

const els = {

    canvas: document.getElementById('canvas6')
}

const ctx = els.canvas.getContext('2d');
els.canvas.width = 500;
els.canvas.height = 700;


class Game {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.enemies = [];
        this.enemyInterval = 400;
        this.enemyTimer = 0;
        this.enemyTypes = ['worm', 'ghost', 'spider']
        // this.#addNewEnemy();
     }
    
    update(deltaTime) {
        this.enemies = this.enemies.filter(object => !object.markForDelation)
        if(this.enemyTimer > this.enemyInterval)
        {
            this.#addNewEnemy();
            this.enemyTimer = 0;
            // console.log(this.enemies)
        } else {
            this.enemyTimer += deltaTime;
        }

        this.enemies.forEach(object => {
            object.update(deltaTime);
        })
     }
    draw() { 

        this.enemies.forEach(object => {
            object.draw(this.ctx);
        })
    }
    
    #addNewEnemy() {
        const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)]
        switch (randomEnemy) {
            case 'worm':
                 this.enemies.push(new Worm(this));
       
                break;
         case 'ghost':
                 this.enemies.push(new Ghost(this));
       
                break;
         case 'spider':
                 this.enemies.push(new Spider(this));
       
                break;
        
        }
        this.enemies.sort(function (a, b) {
            return a.y - b.y;
})
}
}

class Enemy {
    constructor(game) {
        this.game = game;
        // this.x = this.game.width;
        // this.y = Math.random() * this.game.height;
        // this.width = 200;
        // this.height = 100;
        this.markForDelation = false;

        this.frameX = 0;
        this.maxFrame = 5;
        this.frameInterval = 100;
        this.frameTimer = 0;


     }
    
    update(deltaTime) {

        this.x -= this.speed * deltaTime;
        
        if (this.x < 0 - this.width) { this.markForDelation = true;
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX < this.maxFrame) this.frameX++; else
                    this.frameX = 0;
                this.frameTimer = 0;
                console.log(this.frameX)
                
                }
             } else {
                this.frameTimer += deltaTime;
             };
}
     
    draw(ctx) { 
        // ctx.fillRect(this.x,this.y,this.width,this.height)
    ctx.drawImage(this.image,this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
    
}

class Worm extends Enemy {
    constructor(game) {
        super(game);
        // console.log(this.game)

        this.spriteWidth = 229;
        this.spriteHeight = 171;
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.x = this.game.width;
        this.y =  this.game.height - this.height;
        this.speed = Math.random() * 0.1 + 0.1;
        this.image = worm;
        // console.log(this.image)
    }
}

class Ghost extends Enemy {
    constructor(game) {
        super(game);
        // console.log(this.game)

        this.spriteWidth = 261;
        this.spriteHeight = 209;
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.speed = Math.random() * 0.2 + 0.1;
        this.image = ghost;
        this.angle = 0;
        this.curve = Math.random() * 6;
        // console.log(this.image)
    }
    update(deltaTime) {
    super.update(deltaTime)
        this.y += Math.sin(this.angle) * this.curve;
        this.angle += 0.06;
}
    draw() {
        ctx.save();
        ctx.globalAlpha = 0.3;
        super.draw(ctx);
        ctx.restore();
    }
}


class Spider extends Enemy {
    constructor(game) {
        super(game);
        // console.log(this.game)

        this.spriteWidth = 310;
        this.spriteHeight = 175;
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.x = Math.random() * this.game.width;
        this.y =  0 - this.height;
        this.speed = 0;
        this.image = spider;
        this.vy = Math.random() * 0.1 + 0.1;
        this.maxLenght = Math.random() * 200 + 100;        // console.log(this.image)
    }
    update(deltaTime) {
        super.update(deltaTime);
        if (this.y < 0 - this.height * 2) { this.markForDelation = true };

        this.y += this.vy * deltaTime;
        (this.y > this.maxLenght) ? this.vy-- : '';
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x + this.width/2 , 0);
        ctx.lineTo(this.x + this.width/2, this.y +10);
        ctx.stroke();

        super.draw(ctx)
    }
}


    let lastTime = 1;

    const game = new Game(ctx, els.canvas.width, els.canvas.height);
const animateEnemy = (timeStamp) => {
    ctx.clearRect(0, 0, els.canvas.width, els.canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    game.update(deltaTime);
    game.draw();
    requestAnimationFrame(animateEnemy)
}
animateEnemy(0);

