let playerState = "idle";

const els = {
     canvas : document.getElementById('canvas1'),
     dropDown : document.getElementById('animations')
    }
    
    
els.dropDown.addEventListener('change', (e) => {
    playerState = e.target.value;
    // console.log(playerState)
    })
    
    const ctx = els.canvas.getContext('2d');
    const CANVAS_WIDTH = els.canvas.width = 600;
    const CANVAS_HEIGHT = els.canvas.height = 600;
    const playerImage = new Image();
    playerImage.src = './shadow_dog.png';
    // 6876px / 12 columns = 573
    const spriteWidth = 575;
    // 5230px /10 animate = 523
    const spriteHeight = 523;
    // let x = 0;
    let gameFrame = 0;

let staggerFrames = 4;
const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7
    },
    {
        name: 'jump',
        frames: 7
    },
    
    {
        name: 'fall',
        frames: 7
    },

    {
        name: 'run',
        frames: 9
    },

    {
        name: 'dizzy',
        frames: 11
    },

    {
        name: 'sit',
        frames: 5
    },

    {
        name: 'roll',
        frames: 7
    },

    {
        name: 'bite',
        frames: 7
    },

    {
        name: 'ko',
        frames: 12
    },

    {
        name: 'getHit',
        frames: 4
    },
];

animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({ x: positionX, y: positionY })
    }
    spriteAnimations[state.name] = frames;
});

console.log(spriteAnimations)

const animate = () => {
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
   let frameX = spriteWidth * position;

    let frameY = spriteAnimations[playerState].loc[position].y;

    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    if (gameFrame % staggerFrames == 0) {
        (frameX < 6) ? frameX++ : frameX = 0; 
        // if (frameX < 6) { frameX++ } else { frameX = 0 };

    }
    gameFrame++;
    requestAnimationFrame(animate);
}

animate()
