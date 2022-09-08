const els = {
    canvas5: document.getElementById('canvas5'),
    
}

const ctx = els.canvas5.getContext('2d');
els.canvas5.width = window.innerWidth;
els.canvas5.height = window.innerHeight;
let score = 0;
let gameOver = false;
ctx.font = '3em Impact';

const collisionCanvas = document.getElementById('collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d');
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

let timeToNextRaven = 0;
let ravenInterval = 900;
let timeFinal = 0;
let ravens = [];

class Raven {
    constructor() {
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.sizeModified = Math.random() * 0.6 + 0.4
        this.width = this.spriteWidth * this.sizeModified;
        this.heigth = this.spriteHeight * this.sizeModified;
        this.x = els.canvas5.width;
        this.y = Math.random() * (els.canvas5.height - this.heigth);
        this.directionX = Math.random() * 5 + 3;
        this.directionY = Math.random() * 5 - 2.5;
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = './img/enemy/raven.png';
        this.frame = 0;
        this.maxframe = 4;
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 50 + 50;
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
    }

    update(deltaTime) {
        this.x -= this.directionX 
       
        if (this.x < 0 - this.width) { this.markedForDeletion = true }
        
             this.timeSinceFlap += deltaTime;

        if (this.timeSinceFlap > this.flapInterval) {
                  if (this.frame >this.maxframe) {
            this.frame = 0;

                  } else {
                      this.frame++;
                      this.timeSinceFlap = 0;
                  }
            
             }
        if (this.x < 0 - this.width) gameOver = true;
    }
    
    draw() {
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.heigth)
        ctx.drawImage(this.image,this.spriteWidth * this.frame,0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.heigth)
    }
}
// const raven = new Raven();

let explosions = [];
class explosion {
    constructor(x, y, size) {
        this.image = new Image();
        this.image.src = './img/boom.png'
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.size = size;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.sound = new Audio();
        this.sound.src = './sound/rumble.flac';
        this.timeTolastframe = 0;
        this.frameInterval = 100;
        this.markedForDeletion = false;
    }

    update(deltaTime) {
        (this.frame === 0) ? this.sound.play(): ''; 
        this.timeTolastframe += deltaTime;
        if (this.timeTolastframe > this.frameInterval) { this.frame++;
            // this.timeTolastframe = 0;
            if (this.frame > 5) { this.markedForDeletion = true;
}  
        } else {
            this.frame = 0;
            // this.sound.play();
        }
     }
    draw() { 
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y - this.size/4, this.size, this.size)
    }
    

}

const drawScore = () => {
    ctx.fillStyle = 'white';
    ctx.fillText('score:' + score, 50, 75)
}

const drawGameOver = () => {
    ctx.textAlign = 'center';
    ctx.fillStyle = "red";
    ctx.fillText("game over buddy, the game restart on 3sec, your score is: " + score, canvas5.width/2, canvas5.height/2);
    setInterval(() => {
    
        window .location.reload();
    }, 3000);
}

window.addEventListener('click', e => {
    const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1,1)
    console.log(detectPixelColor)
    const pc = detectPixelColor.data;
    ravens.forEach(object => {
        if (object.randomColors[0] === pc[0] && object.randomColors[1] === pc[1] && object.randomColors[2] === pc[2]) {
            object.markedForDeletion = true;
            explosions.push(new explosion(object.x, object.y, object.width));
            score++;
       } 
    })
})

const animateRaven = timestamp => {
    ctx.clearRect(0, 0, els.canvas5.width, els.canvas5.height)
    collisionCtx.clearRect(0, 0, els.canvas5.width, els.canvas5.height)


    // raven.update();
    // raven.draw();
    let deltaTime = timestamp - timeFinal;
    timeFinal = timestamp
    timeToNextRaven += deltaTime;
    if (timeToNextRaven > ravenInterval) {
        ravens.push(new Raven())
        timeToNextRaven = 0;
        ravens.sort((a, b) => {
            return a.width - b.width;
        })
    }
    drawScore();
    [...ravens, ...explosions].forEach(raven => {
        raven.update(deltaTime);
        // raven.draw();
    });
    [...ravens, ...explosions].forEach(raven => {
        raven.draw();
        
    });
    ravens = ravens.filter(object => !object.markedForDeletion)
    explosions = explosions.filter(object => !object.markedForDeletion)

        // console.log(deltaTime)
    if (!gameOver) { requestAnimationFrame(animateRaven) } else {
        drawGameOver();
    }
    
}

animateRaven(0)