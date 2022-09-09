window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1200;
    canvas.height = 700;
    let enemies = [];
    let score = 0;


    let gameOver = false;
    const fullscreenButton = document.getElementById('buttonFullscreen');


    class inputhandler {
        constructor() {
            this.keys = [];
            this.touchY = '';
            this.touchTreshold = 30;
            window.addEventListener('keydown', e => {
                if ((e.key === "ArrowDown" ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight')
                    && this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key);
                    // console.log(this.key)
                }
                else if (e.key === "Enter" && gameOver === true) restartGame();
            });


            window.addEventListener('keyup', e => {
                if (e.key === "ArrowDown" ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight') {
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
               
            });

            window.addEventListener('touchstart', e => {
                this.touchY = e.changedTouches[0].pageY;
                // console.log( e.changedTouches[0].pageY)
            });
            
            window.addEventListener('touchmove', e => {
                const swipDistance = e.changedTouches[0].pageY - this.touchY;

                if (swipDistance < -this.touchTreshold && this.keys.indexOf('swipe up') === -1) this.keys.push('swipe up');

                else if (swipDistance > this.touchTreshold && this.keys.indexOf('swipe down') === -1) {
                    this.keys.push('swipe down');
                    if (gameOver) restartGame();
                }
            });
            
            window.addEventListener('touchend', e => {
                this.keys.splice(this.keys.indexOf('swipe up'), 1);
                this.keys.splice(this.keys.indexOf('swipe down'), 1);
console.log(this.keys)

            });
                
        }
     }
    
    class Player {
        constructor(gameWidth, gameheight) {
            this.gameWidth = gameWidth;
            this.gameheight = gameheight;
            this.width = 200;
            this.height = 200;
            this.x = 150;
            this.speed = 0;
            this.y =  this.gameheight - this.height;
            this.vy = 0;
            this.image = document.getElementById('playerImage');
            this.weight = 1;
            this.frameX = 0;
            this.frameY = 0;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;
            this.frameMax = 8;
        }
        restart() {
            this.x = 0;
            this.y = this.gameheight - this.height;
            
        }
        draw(context) {
            // context.fillStyle = 'white';
            // context.lineWidth = 5;
            // context.strokeStyle = 'white';
            // context.beginPath();
            // context.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
            // context.stroke();
            // context.fillRect(this.x, this.y, this.width, this.height)
            context.drawImage(this.image,this.frameX * this.width,0, this.width, this.height, this.x,this.y - 90, this.width, this.height);
        }
        update(input, deltaTime, enemies) {
            // collision detection
            enemies.forEach(enemy => {
                const dx = (enemy.x + enemy.width/2) - (this.x + this.width/2);
                const dy = (enemy.y + enemy.height / 2) - (this.y + this.height / 2);
                const distance = Math.sqrt(dx * dx + dy * dy);
                if(distance < enemy.width/2 + this.width/2){ gameOver = true}

})


            if (this.frameTimer > this.frameInterval) {
                if (this.frameX > this.frameMax) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }
            if (input.keys.indexOf('ArrowRight') > -1) {
                this.speed = 5;
                console.log(this.speed)
            }
            else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.speed = -5;
            }
            else if ((input.keys.indexOf('ArrowUp') > -1 || input.keys.indexOf('swipe up') > -1)  && this.onGround()) {
                this.vy -= 32;
                } 
            else {
                
                this.speed = 0
            }
            
            this.x += this.speed;
            if (this.x < 0) this.x = 0;
            else if(this.x > this.gameWidth - this.width)this.x = this.gameWidth - this.width
            
            this.y += this.vy;
            
            if (!this.onGround()) {
                this.vy += this.weight;
                this.maxframe = 5; 
                this.frameY = 1;
            } else {
                this.vy = 0;
                this.maxframe = 8;
                this.frameY = 0;
                
            }
            if(this.y > this.gameWidth - this.height)this.y = this.gameheight - this.height

        }
        onGround() {
            return this.y >= this.gameheight - this.height;
        }
    }

    class Background {
        constructor(gameWidth, gameheight) {
            this.gameWidth = gameWidth;
            this.gameheight = gameheight;
            this.image = document.getElementById('backgroundImage');
            this.platforme = document.getElementById('platformImage');
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 720;
            this.speed = 3;
        }
        restart() {
            this.x = 0;
        }
        draw(context) {
            context.drawImage(this.image,this.x, this.y, this.width, this.height)
            context.drawImage(this.platforme,this.x, this.y, this.width, this.height)

            context.drawImage(this.image,this.x + this.width - this.speed, this.y, this.width, this.height)
            context.drawImage(this.platforme,this.x + this.width - this.speed, this.y, this.width, this.height)


        }

        update() {
            this.x -= this.speed;
            if (this.x < 0 - this.width) this.x = 0;
        }
     }
    
    class Enemy {
        constructor(gameWidth, gameheight) {
            this.gameWidth = gameWidth;
            this.gameheight = gameheight;
            this.width = 160;
            this.height = 119;
            this.image = document.getElementById('enemyImage');
            this.x = this.gameWidth;
            this.y = this.gameheight - this.height;
            this.frameX = 0;
            this.maxframe = 5;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;
            this.speed = Math.random() * 12 + 12;
            this.markedForDeletion = false;
        }
        draw(context) {
            // context.strokeRect(this.x, this.y, this.width, this.height)
            context.drawImage(this.image,this.frameX * this.width,0, this.width, this.height, this.x, this.y -80,this.width, this.height )
         }
        update(deltaTime) {
            if (this.frameTimer > this.frameInterval) {
                if (this.frameX >= this.maxframe) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }
            this.x -= this.speed;
            if (this.x < 0 - this.width) {
                this.markedForDeletion = true;

                score++;
            }
        }
    }

    function handleEnemies(deltaTime) {
        if (enemyTimer > enemyInterval + randomEnemyInterval) {
            enemies.push(new Enemy(canvas.width, canvas.height));
    let randomEnemyInterval = Math.random() * 2000 + 500;

            enemyTimer = 0;
            
        } else {
            enemyTimer += deltaTime;
        }
        enemies.forEach(object => {
            object.draw(ctx);
            object.update(deltaTime);
        })
        enemies = enemies.filter(enemy => !enemy.markedForDeletion)
    }

    function displayStatusText(context) {
        context.fillStyle = "red";
        context.font = '40px Helvetica';
        context.fillText('score: ' + score, 20, 50)
        if (gameOver === true) {
            context.fillStyle = "red";
        context.font = '40px Helvetica';
        
            context.textAlign = 'center';
            context.fillText('gameOver! taper entrer  ou swipe pour recommencer :', canvas.width/2 ,canvas.height/2)
}
    }

    function toggleScreen() {
        if (!document.fullscreenElement) {
            canvas.requestFullscreen().then().catch(err=> console.log(err));
        } else {
            document.exitFullscreen();
}
    };
    fullscreenButton.addEventListener('click', toggleScreen)
    

    function restartGame() {
        player.restart();
        background.restart();
     enemies = [];
        score = 0;
        gameOver = false;
        animate(0);
    }
    const input = new inputhandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
    let lastTime = 0
    let enemyTimer = 0;
    let enemyInterval = 1000;
    let randomEnemyInterval = Math.random() * 1000 + 500;
//   const enemy1 = new Enemy(canvas.width, canvas.height)  
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp
        ctx.clearRect(0,0,canvas.width, canvas.height)
        background.draw(ctx);
        background.update();
        player.draw(ctx);
        player.update(input, deltaTime, enemies);
        handleEnemies(deltaTime);
        displayStatusText(ctx);
      if(!gameOver)  requestAnimationFrame(animate);
    }
    animate(0);
})