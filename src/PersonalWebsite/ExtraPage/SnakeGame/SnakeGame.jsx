import React from 'react';
import './SnakeGame.css';
import './swiped-events.js';
import * as sprites from './SpriteImageSources.js';
import Snake from './Snake.js';
import Food from './Food.js';


const UP_KEY_CODES = [38, 87];
const RIGHT_KEY_CODES = [39, 68];
const DOWN_KEY_CODES = [40, 83];
const LEFT_KEY_CODES = [37, 65];

const LEVEL_COLORS = ['#2fe2ff', '#56ffa1', '#ffc37d', '#ff94ee', '#ff4a4a'];
const VERTICAL_PROGRESS_SNAKE_BODY_TYPES = ['tail', 'one', 'two', 'one', 'head'];
const HORIZONTAL_PROGRESS_SNAKE_BODY_TYPES = ['tail', 'one', 'two', 'one', 'two', 'one', 'two', 'one', 'head'];

var levelsCompleted = 0;
var score = 0;
var progressCounter = 0;
var snake = null;
var food = null;

var GAME_STARTED = false;
var IS_VERTICAL_SCREEN = null;
var GAME_SCREEN_WIDTH_PX;
var GAME_SCREEN_HEIGHT_PX;
var SNAKE_ROWS;
var SNAKE_COLS;

var exitButtonHovered = false;
var restartButtonHovered = false; 

var gameCanvas;
var gameCanvasContext;
var gameInterval = -1;

export default class SnakeGame extends React.Component {
    componentDidMount() {
        this.handleResize();
        document.getElementById('main-content').style.overflowY = 'hidden';
        document.getElementById('main-content').style.height = '100vh';

        window.addEventListener('resize', this.handleResize);
        window.addEventListener('keydown', this.handleKeyDown);

        gameCanvas.addEventListener("mousemove", (evt) => {
            this.handleMouseGameCanvasHover(evt)
        }, false);
        gameCanvas.addEventListener("click", (evt) => {
            this.handleMouseGameCanvasClick(evt)
        }, false);
        gameCanvas.addEventListener("mouseleave", () => {
            this.handleMouseGameCanvasLeave()
        }, false);

        document.addEventListener('swiped-left', (evt) =>  {
            this.handleLeftMove();
        });
        document.addEventListener('swiped-right', (evt) =>  {
            this.handleRightMove();
        });
        document.addEventListener('swiped-up', (evt) => {
            this.handleUpMove();
        });
        document.addEventListener('swiped-down', (evt) =>  {
            this.handleDownMove();
        });
    }

    handleResize = () => {
        if(!GAME_STARTED) {
            const isVerticalScreen = window.innerHeight > window.innerWidth * 1.35;
            if(IS_VERTICAL_SCREEN === isVerticalScreen) return;
            IS_VERTICAL_SCREEN = isVerticalScreen;

            var containerClass;
            var baseImage;
            if(IS_VERTICAL_SCREEN) {
                [GAME_SCREEN_WIDTH_PX, GAME_SCREEN_HEIGHT_PX] = [87, 143];
                [SNAKE_ROWS, SNAKE_COLS] = [20, 14];
                containerClass = 'snake-game-container-vertical';
                baseImage = sprites.baseImageVertical;
                if(restartButtonHovered) baseImage = sprites.baseImageVerticalRestartHover;
            }
            else {
                [GAME_SCREEN_WIDTH_PX, GAME_SCREEN_HEIGHT_PX] = [129, 105];
                [SNAKE_ROWS, SNAKE_COLS] = [14, 21];
                containerClass = 'snake-game-container-horizontal';
                baseImage = sprites.baseImageHorizontal;
                if(restartButtonHovered) baseImage = sprites.baseImageHorizontalRestartHover;
            }
            document.getElementById('snake-game-container').className = containerClass;
            gameCanvas = document.getElementById('snake-game-canvas');
            gameCanvas.width = GAME_SCREEN_WIDTH_PX;
            gameCanvas.height = GAME_SCREEN_HEIGHT_PX;
            gameCanvasContext = gameCanvas.getContext("2d");

            this.drawImageOnGameCanvas(baseImage, 0, 0);
        }
    }

    componentWillUnmount() {
        this.resetGameVariables();
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('swiped-left', (evt) =>  {
            this.handleLeftMove();
        });
        document.removeEventListener('swiped-right', (evt) =>  {
            this.handleRightMove();
        });
        document.removeEventListener('swiped-up', (evt) => {
            this.handleUpMove();
        });
        document.removeEventListener('swiped-down', (evt) =>  {
            this.handleDownMove();
        });
        document.getElementById('main-content').style.overflowY = '';
        document.getElementById('main-content').style.height = '';
    }

    handleMouseGameCanvasHover(event) {
        var mousePos = getMousePos(gameCanvas, event);
        const restartButtonWidth = 37;
        const restartButtonX = (IS_VERTICAL_SCREEN) ? 25 : 67;
        const exitButtonX = (IS_VERTICAL_SCREEN) ? 63 : 105;
        if (mousePos.x >= restartButtonX && mousePos.x < restartButtonX + restartButtonWidth && mousePos.y < 8) {
            if(exitButtonHovered) this.resetExitButton(exitButtonX);
            if(!restartButtonHovered) this.handleRestartButtonHover(restartButtonX);
        }
        else if (mousePos.x >= exitButtonX && mousePos.y < 8) {
            if(restartButtonHovered) this.resetRestartButton(restartButtonX);
            if(!exitButtonHovered) this.handleExitButtonHover(exitButtonX);
        }
        else {
            if(exitButtonHovered) this.resetExitButton(exitButtonX);
            if(restartButtonHovered) this.resetRestartButton(restartButtonX);
        }
    }

    handleRestartButtonHover(restartButtonX) {
        gameCanvasContext.clearRect(restartButtonX, 0, 37, 2);
        this.drawImageOnGameCanvas(sprites.restartButtonHoverImage, restartButtonX, 1);
        restartButtonHovered = true;
    }

    resetRestartButton(restartButtonX) {
        gameCanvasContext.clearRect(restartButtonX, 0, 37, 2);
        this.drawImageOnGameCanvas(sprites.restartButtonImage, restartButtonX, 0);
        restartButtonHovered = false;
    }

    handleExitButtonHover(exitButtonX) {
        gameCanvasContext.clearRect(exitButtonX, 0, 24, 2);
        this.drawImageOnGameCanvas(sprites.exitButtonHoverImage, exitButtonX, 1);
        exitButtonHovered = true;
    }

    resetExitButton(exitButtonX) {
        gameCanvasContext.clearRect(exitButtonX, 0, 24, 2);
        this.drawImageOnGameCanvas(sprites.exitButtonImage, exitButtonX, 0);
        exitButtonHovered = false;
    }

    handleMouseGameCanvasClick(event) {
        var mousePos = getMousePos(gameCanvas, event);
        const restartButtonWidth = 37;
        const restartButtonX = (IS_VERTICAL_SCREEN) ? 25 : 67;
        const exitButtonX = (IS_VERTICAL_SCREEN) ? 63 : 105;
        if (mousePos.x >= restartButtonX && mousePos.x < restartButtonX + restartButtonWidth && mousePos.y < 8) this.restartGame();
        if (mousePos.x >= exitButtonX && mousePos.y < 8) this.exitGame();
    }

    handleMouseGameCanvasLeave() {
        const restartButtonX = (IS_VERTICAL_SCREEN) ? 25 : 67;
        const exitButtonX = (IS_VERTICAL_SCREEN) ? 63 : 105;
        if(exitButtonHovered) this.resetExitButton(exitButtonX);
        if(restartButtonHovered) this.resetRestartButton(restartButtonX);
    }

    restartGame() {
        if(GAME_STARTED) {
            this.resetGameVariables();
            restartButtonHovered = true;
            this.handleResize();
        }
    }

    startGame() {
        var initialBody;
        var initialDirection = [0, 1];
        var initialFoodPosition;
        if(IS_VERTICAL_SCREEN) {
            gameCanvasContext.fillRect(2, 22, 83, 120);
            initialBody = [[14, 3], [14, 4], [14, 5]];
            initialDirection = [0, 1];
            initialFoodPosition = [14, 10];
        }
        else {
            gameCanvasContext.fillRect(2, 20, 124, 83);
            initialBody = [[6, 1], [6, 2], [6, 3]];
            initialDirection = [0, 1];
            initialFoodPosition = [6, 15];
        }
        snake = new Snake(initialBody, initialDirection, SNAKE_ROWS, SNAKE_COLS);
        food = new Food(initialFoodPosition, SNAKE_ROWS, SNAKE_COLS);
        this.drawInitialSprites();
        GAME_STARTED = true;

        gameInterval = setInterval(() => { this.handleGameUpdate() }, 125);
    }

    handleGameUpdate() {
        const isGameOver = this.isGameOver();
        if(isGameOver) {
            this.handleGameOver();
            return;
        }
        const foodEaten = this.wasFoodEaten();
        if(!foodEaten) this.clearSnakeGridPosition(snake.getTailPosition());
        snake.update(foodEaten);

        if(!foodEaten) {
            const tailGridPos = getGameGridPos(snake.getTailPosition());
            this.drawImageOnGameCanvas(snake.getBodyImage(0), tailGridPos.x, tailGridPos.y);
        }
        else this.handleFoodEaten();
        const beforeHeadGridPos = getGameGridPos(snake.getBeforeHeadPosition());
        this.drawImageOnGameCanvas(snake.getBodyImage(snake.getLength() - 2), beforeHeadGridPos.x, beforeHeadGridPos.y);
        const headGridPos = getGameGridPos(snake.getHeadPosition());
        this.drawImageOnGameCanvas(snake.getBodyImage(snake.getLength() - 1), headGridPos.x, headGridPos.y);
    }

    handleFoodEaten() {
        score += 1;
        
        var scoreText = score.toString();
        // pad with beginning zeros
        for(let i = 0; i <= 3 - scoreText.length; i++) scoreText = "0" + scoreText;

        // update score text
        var numeralDrawPosition = (IS_VERTICAL_SCREEN) ? [10, 79] : [10, 121];
        for(let i = scoreText.length - 1; i >= 0; i--) {
            var numberImage;
            if (scoreText.charAt(i) === '1') numberImage = sprites.oneNumberImage;
            else if (scoreText.charAt(i) === '2') numberImage = sprites.twoNumberImage;
            else if (scoreText.charAt(i) === '3') numberImage = sprites.threeNumberImage;
            else if (scoreText.charAt(i) === '4') numberImage = sprites.fourNumberImage;
            else if (scoreText.charAt(i) === '5') numberImage = sprites.fiveNumberImage;
            else if (scoreText.charAt(i) === '6') numberImage = sprites.sixNumberImage;
            else if (scoreText.charAt(i) === '7') numberImage = sprites.sevenNumberImage;
            else if (scoreText.charAt(i) === '8') numberImage = sprites.eightNumberImage;
            else if (scoreText.charAt(i) === '9') numberImage = sprites.nineNumberImage;
            else numberImage = sprites.zeroNumberImage;

            this.drawImageOnGameCanvas(numberImage, numeralDrawPosition[1], numeralDrawPosition[0]);
            if(scoreText.charAt(i) === '1') numeralDrawPosition[1] -= 4;
            else numeralDrawPosition[1] = numeralDrawPosition[1] -= 5;
        }

        // update progress snake
        var progressBodyTypes = (IS_VERTICAL_SCREEN) ? VERTICAL_PROGRESS_SNAKE_BODY_TYPES : HORIZONTAL_PROGRESS_SNAKE_BODY_TYPES;
        const progressSnakeDrawPosition = (IS_VERTICAL_SCREEN) ? [10, 29] : [10, 30];
        const index = progressCounter % progressBodyTypes.length;
        var level = Math.floor(progressCounter / progressBodyTypes.length);
        if(this.isLevelComplete(index)) this.handleLevelComplete(level);
        progressCounter += 1;
        if (level > 4) {
            this.handleLevelSetComplete();
            level = 0;
        }
        const progressBodyType = progressBodyTypes[index];
        var progressSpriteImage;
        if(progressBodyType === 'tail') progressSpriteImage = sprites.progressTailImages[level];
        else if(progressBodyType === 'one') progressSpriteImage = sprites.progressBody1Images[level];
        else if(progressBodyType === 'two') progressSpriteImage = sprites.progressBody2Images[level];
        else progressSpriteImage = sprites.progressHeadImages[level];
        this.drawImageOnGameCanvas(progressSpriteImage, progressSnakeDrawPosition[1] + (6 * index), progressSnakeDrawPosition[0]);

        food.handleEaten(snake.body);
        const foodGridPos = getGameGridPos(food.position);
        this.drawImageOnGameCanvas(sprites.foodImage, foodGridPos.x, foodGridPos.y)
    }

    isLevelComplete(index) {
        return (IS_VERTICAL_SCREEN && index === 4) || (!IS_VERTICAL_SCREEN && index === 8);
    }

    handleLevelComplete(level) {
        const numLevels = LEVEL_COLORS.length;
        if (IS_VERTICAL_SCREEN) {
            gameCanvasContext.fillStyle = LEVEL_COLORS[level];
            const xOffset = ((levelsCompleted - Math.floor(levelsCompleted / 5)) * 2) + (Math.floor(levelsCompleted/5) * 4)
            const width = (level === (numLevels - 1)) ? 4 : 2;
            gameCanvasContext.fillRect(1 + xOffset, 17, width, 1);
        }
        else {
            if(progressCounter > 0 && level === 0)
                for(let i = 0; i < numLevels; i++)
                    gameCanvasContext.fillRect(89 + (i * 3), 9, 2, 3);
            gameCanvasContext.fillStyle = LEVEL_COLORS[level];
            gameCanvasContext.fillRect(89 + (level * 3), 9, 2, 3);
        }
        gameCanvasContext.fillStyle = "black";
        levelsCompleted += 1;
    }

    handleLevelSetComplete() {
        const numLevels = LEVEL_COLORS.length;
        const levelSetsCompleted = levelsCompleted / numLevels;
        gameCanvasContext.fillStyle = LEVEL_COLORS[levelSetsCompleted - 1];
        if(levelSetsCompleted === 1) gameCanvasContext.fillRect(89, 13, 7, 1);
        if(levelSetsCompleted === 2) gameCanvasContext.fillRect(96, 13, 7, 1);
        if(levelSetsCompleted === 3) gameCanvasContext.fillRect(89, 15, 7, 1);
        if(levelSetsCompleted === 4) gameCanvasContext.fillRect(96, 15, 7, 1);
        gameCanvasContext.fillStyle = "black";
        progressCounter = 1;
    }

    handleGameOver() {
        console.log('GAME OVER');
        if(gameInterval !== -1) {
            window.clearInterval(gameInterval);
            gameInterval = -1;
        }
        snake.toggleLastDrawnBodyType();
        for(let i = snake.getLength() - 1; i >= 0; i--) {
            const gridPos = getGameGridPos(snake.body[i]);
            this.drawImageOnGameCanvas(snake.getDeadBodyImage(i), gridPos.x, gridPos.y);
        }
        setTimeout(() => {
            if(IS_VERTICAL_SCREEN) this.drawImageOnGameCanvas(sprites.gameOverScreenVerticalImage, 2, 22);
            else this.drawImageOnGameCanvas(sprites.gameOverScreenHorizontalImage, 2, 20);
        }, 25);
    }

    isGameOver() {
        const directedPos = snake.getDirectedPosition();
        if(directedPos[0] < 0 || directedPos[1] < 0) return true;
        if(directedPos[0] >= SNAKE_ROWS || directedPos[1] >= SNAKE_COLS) return true;
        return snake.body.some(a => directedPos.every((v, i) => v === a[i]));
    }

    wasFoodEaten() {
        const directedPos = snake.getDirectedPosition();
        return directedPos[0] === food.position[0] && directedPos[1] === food.position[1];
    }

    drawInitialSprites() {
        for(var i = 0; i < snake.getLength(); i++) {
            const gridPos = getGameGridPos(snake.body[i]);
            this.drawImageOnGameCanvas(snake.getBodyImage(i), gridPos.x, gridPos.y);
        }
        const foodPos = getGameGridPos(food.position);
        this.drawImageOnGameCanvas(sprites.foodImage, foodPos.x, foodPos.y)
    }

    exitGame() {
        this.props.unmountMe();
    }

    handleKeyDown = (event) => {
        var code = event.keyCode;
        if(UP_KEY_CODES.includes(code)) this.handleUpMove();
        else if(RIGHT_KEY_CODES.includes(code)) this.handleRightMove();
        else if(DOWN_KEY_CODES.includes(code)) this.handleDownMove();
        else if(LEFT_KEY_CODES.includes(code)) this.handleLeftMove();
    }

    handleUpMove() {
        if(!GAME_STARTED) this.startGame();
        snake.setDirection([-1, 0]);
    }

    handleRightMove() {
        if(!GAME_STARTED) this.startGame();
        snake.setDirection([0, 1]);
    }

    handleDownMove() {
        if(!GAME_STARTED) this.startGame();
        snake.setDirection([1, 0]);
    }

    handleLeftMove() {
        if(!GAME_STARTED) this.startGame();
        snake.setDirection([0, -1]);
    }

    clearSnakeGridPosition(position) {
        var gridPos = getGameGridPos(position);
        gameCanvasContext.fillRect(gridPos.x, gridPos.y, 5, 5);
    }

    drawImageOnGameCanvas(imageSrc, x, y) {
        var img = new Image();
        img.src = imageSrc;
        img.onload = function(){
            gameCanvasContext.drawImage(img,x,y);
        };
    }

    resetGameVariables() {
        if(gameInterval !== -1) {
            window.clearInterval(gameInterval);
            gameInterval = -1;
        }
        GAME_STARTED = false;
        snake = null;
        food = null;
        exitButtonHovered = false;
        restartButtonHovered = false; 
        IS_VERTICAL_SCREEN = null;
        levelsCompleted = 0;
        score = 0;
        progressCounter = 0;
    }

    render() {
        return (
            <div className='game-background'>
                <div id='snake-game-container'>
                    <canvas id='snake-game-canvas'/>
                </div>
            </div>
        );
    }
}

function getGameGridPos(position) {
    const yOffset = (IS_VERTICAL_SCREEN) ? 22 : 20;
    return {
        x: 2 + (6 * position[1]),
        y: yOffset + (6 * position[0])
    };
}

// getting mouse x and y on canvas
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    var scaleY = rect.height / GAME_SCREEN_HEIGHT_PX;
    var scaleX = rect.width / GAME_SCREEN_WIDTH_PX;
    return {
        x: Math.floor((evt.clientX - rect.left) / scaleX),
        y: Math.floor((evt.clientY - rect.top) / scaleY)
    };
}