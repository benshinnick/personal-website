import React from 'react';
import './SnakeGame.css';
import * as sprites from './SpriteImageSources.js';

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
        window.addEventListener('resize', this.handleResize);
        document.getElementById('main-content').style.overflowY = 'hidden';
        document.getElementById('main-content').style.height = '100vh';

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
        IS_VERTICAL_SCREEN = null;
        window.removeEventListener('resize', this.handleResize);
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

    exitGame() {
        this.props.unmountMe();
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