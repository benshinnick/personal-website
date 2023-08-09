import React from 'react';
import './SnakeGame.css';
import * as sprites from './SpriteImageSources.js';
import Snake from './Snake.js';
import Food from './Food.js';

const UP_KEY_CODES = [38, 87];
const RIGHT_KEY_CODES = [39, 68];
const DOWN_KEY_CODES = [40, 83];
const LEFT_KEY_CODES = [37, 65];

var score = 0;
var turn = 0;
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
    }

    handleResize = () => {
        if(!GAME_STARTED) {
            const isVerticalScreen = window.innerHeight > window.innerWidth * 1.35;
            if(IS_VERTICAL_SCREEN === isVerticalScreen) return;
            IS_VERTICAL_SCREEN = isVerticalScreen;

            var containerClass;
            var baseImage;
            if(IS_VERTICAL_SCREEN) {
                [GAME_SCREEN_WIDTH_PX, GAME_SCREEN_HEIGHT_PX] = [87, 142];
                [SNAKE_ROWS, SNAKE_COLS] = [20, 14];
                containerClass = 'snake-game-container-vertical';
                baseImage = sprites.baseImageVertical;
            }
            else {
                [GAME_SCREEN_WIDTH_PX, GAME_SCREEN_HEIGHT_PX] = [129, 105];
                [SNAKE_ROWS, SNAKE_COLS] = [14, 21];
                containerClass = 'snake-game-container-horizontal';
                baseImage = sprites.baseImageHorizontal;
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
        snake = null;
        food = null;
        GAME_STARTED = false;
        exitButtonHovered = false;
        restartButtonHovered = false; 
        IS_VERTICAL_SCREEN = null;
        turn = 0;
        score = 0;
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('keydown', this.handleKeyDown);
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
        console.log("Restart Game Button Clicked");
    }

    startGame() {
        var initialBody;
        var initialDirection = [0, 1];
        var initialFoodPosition;
        if(IS_VERTICAL_SCREEN) {
            gameCanvasContext.fillRect(2, 20, 83, 120);
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

        setInterval(() => { this.handleGameUpdate() }, 125);
    }

    handleGameUpdate() {
        turn += 1;
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
        console.log(turn, score);
        food.handleEaten(snake.body);
        const foodGridPos = getGameGridPos(food.position);
        this.drawImageOnGameCanvas(sprites.foodImage, foodGridPos.x, foodGridPos.y)
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
    return {
        x: 2 + (6 * position[1]),
        y: 20 + (6 * position[0])
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