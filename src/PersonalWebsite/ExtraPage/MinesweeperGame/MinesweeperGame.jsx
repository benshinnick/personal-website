import React from 'react';
import './MinesweeperGame.css';
import * as sprites from './SpriteImageSources.js';
import * as ch from '../CookieHelper.js';

var GAME_STARTED = false;
var GAME_SIZE = null;
var IS_VERTICAL_SCREEN = null;

var GAME_SCREEN_WIDTH_PX;
var GAME_SCREEN_HEIGHT_PX;
var MINESWEEPER_GRID_ROWS;
var MINESWEEPER_GRID_COLS;

var gameCanvas;
var gameCanvasContext;

var selectMode = 'shovel';
var lastTileHovered = null;
var exitButtonHovered = false;
var restartButtonHovered = false;
var selectModeButtonHovered = false;

const SHOVEL_SELECT_MODE = 'shovel';
const FLAG_SELECT_MODE = 'flag';
const CONTROL_BUTTON_HEIGHT = 10;
const EXIT_BUTTON_WIDTH = 22;
const RESTART_BUTTON_WIDTH = 40;
const SELECT_MODE_BUTTON_WIDTH = 33;

export default class MinesweeperGame extends React.Component {

    componentDidMount() {
        GAME_SIZE = ch.readCookie('minesweeper-size')
        this.handleResize();
        document.getElementById('main-content').style.overflowY = 'hidden';
        document.getElementById('main-content').style.height = '100vh';

        window.addEventListener('resize', this.handleResize);
        // window.addEventListener('keydown', this.handleKeyDown);

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

    componentWillUnmount() {
        this.resetGameVariables();
        window.removeEventListener('resize', this.handleResize);
        // window.removeEventListener('keydown', this.handleKeyDown);
        document.getElementById('main-content').style.overflowY = '';
        document.getElementById('main-content').style.height = '';
    }

    exitGame() {
        this.props.unmountMe();
    }

    restartGame() {
        console.log("Restarting Game")
    }

    handleResize = () => {
        if(!GAME_STARTED) {
            const isVerticalScreen = window.innerHeight > window.innerWidth * 1.35;
            if(IS_VERTICAL_SCREEN === isVerticalScreen) return;
            IS_VERTICAL_SCREEN = isVerticalScreen;

            var containerClass;
            var baseImage;
            if(!IS_VERTICAL_SCREEN) { // horizontal screen layouts
                if (GAME_SIZE === 'large') {
                    [GAME_SCREEN_WIDTH_PX, GAME_SCREEN_HEIGHT_PX] = [202, 177];
                    [MINESWEEPER_GRID_ROWS, MINESWEEPER_GRID_COLS] = [16, 22];
                    baseImage = sprites.baseScreenHorizontalLarge;
                }
                else if (GAME_SIZE === 'medium') {
                    [GAME_SCREEN_WIDTH_PX, GAME_SCREEN_HEIGHT_PX] = [175, 159];
                    [MINESWEEPER_GRID_ROWS, MINESWEEPER_GRID_COLS] = [14, 17];
                    baseImage = sprites.baseScreenHorizontalMedium;
                }
                else if (GAME_SIZE === 'small') {
                    [GAME_SCREEN_WIDTH_PX, GAME_SCREEN_HEIGHT_PX] = [121, 150];
                    [MINESWEEPER_GRID_ROWS, MINESWEEPER_GRID_COLS] = [13, 13];
                    baseImage = sprites.baseScreenHorizontalSmall;
                }
                containerClass = `minesweeper-game-container-horizontal-${GAME_SIZE}`;
            }
            else { // vertical screen layouts
                if (GAME_SIZE === 'large') {
                    [GAME_SCREEN_WIDTH_PX, GAME_SCREEN_HEIGHT_PX] = [148, 231];
                    [MINESWEEPER_GRID_ROWS, MINESWEEPER_GRID_COLS] = [22, 16];
                    baseImage = sprites.baseScreenVerticalLarge;
                }
                else if (GAME_SIZE === 'medium') {
                    [GAME_SCREEN_WIDTH_PX, GAME_SCREEN_HEIGHT_PX] = [130, 186];
                    [MINESWEEPER_GRID_ROWS, MINESWEEPER_GRID_COLS] = [17, 14];
                    baseImage = sprites.baseScreenVerticalMedium;
                }
                else if (GAME_SIZE === 'small') {
                    [GAME_SCREEN_WIDTH_PX, GAME_SCREEN_HEIGHT_PX] = [121, 150];
                    [MINESWEEPER_GRID_ROWS, MINESWEEPER_GRID_COLS] = [13, 13];
                    baseImage = sprites.baseScreenVerticalSmall;
                }
                containerClass = `minesweeper-game-container-vertical-${GAME_SIZE}`;
            }
            document.getElementById('minesweeper-game-container').className = containerClass;
            gameCanvas = document.getElementById('minesweeper-game-canvas');
            gameCanvas.width = GAME_SCREEN_WIDTH_PX;
            gameCanvas.height = GAME_SCREEN_HEIGHT_PX;
            gameCanvasContext = gameCanvas.getContext("2d");

            gameCanvasContext.clearRect(0, 0, GAME_SCREEN_WIDTH_PX, CONTROL_BUTTON_HEIGHT + 1);
            this.drawImageOnGameCanvas(baseImage, 0, 0);
        }
    }

    handleMouseGameCanvasHover(event) {
        var mousePos = getMousePos(gameCanvas, event);

        const exitButtonX = GAME_SCREEN_WIDTH_PX - EXIT_BUTTON_WIDTH;
        const restartButtonX = GAME_SCREEN_WIDTH_PX - EXIT_BUTTON_WIDTH - RESTART_BUTTON_WIDTH - 3;
        if (mousePos.x >= exitButtonX && mousePos.y < CONTROL_BUTTON_HEIGHT + 1) {
            if(selectModeButtonHovered) this.resetSelectModeButton();
            if(restartButtonHovered) this.resetRestartButton(restartButtonX);
            if(!exitButtonHovered) this.handleExitButtonHover(exitButtonX);
        }
        else if (mousePos.x >= restartButtonX && mousePos.x < restartButtonX + RESTART_BUTTON_WIDTH && mousePos.y < CONTROL_BUTTON_HEIGHT + 1) {
            if(selectModeButtonHovered) this.resetSelectModeButton();
            if(exitButtonHovered) this.resetExitButton(exitButtonX);
            if(!restartButtonHovered) this.handleRestartButtonHover(restartButtonX);
        }
        else if (mousePos.x <= SELECT_MODE_BUTTON_WIDTH && mousePos.y <= CONTROL_BUTTON_HEIGHT) {
            if(exitButtonHovered) this.resetExitButton(exitButtonX);
            if(restartButtonHovered) this.resetRestartButton(restartButtonX);
            if(!selectModeButtonHovered) this.handleSelectModeButtonHover();
        }
        else {
            if(exitButtonHovered) this.resetExitButton(exitButtonX);
            if(restartButtonHovered) this.resetRestartButton(restartButtonX);
            if(selectModeButtonHovered) this.resetSelectModeButton();
        }
        if(this.isGameGridHover(mousePos)) {
            const gridPos = getGameGridPosFromMousePos(mousePos);
            if(lastTileHovered === null) {
                if (selectMode === SHOVEL_SELECT_MODE) this.drawImageOnGameCanvas(sprites.tileShovelHover, gridPos.x, gridPos.y);
                if (selectMode === FLAG_SELECT_MODE) this.drawImageOnGameCanvas(sprites.tileFlagHover, gridPos.x, gridPos.y);
                lastTileHovered = gridPos;
            }
            if(gridPos.x === lastTileHovered.x && gridPos.y === lastTileHovered.y) return;

            this.drawImageOnGameCanvas(sprites.tile, lastTileHovered.x, lastTileHovered.y);
            if (selectMode === SHOVEL_SELECT_MODE) this.drawImageOnGameCanvas(sprites.tileShovelHover, gridPos.x, gridPos.y);
            if (selectMode === FLAG_SELECT_MODE) this.drawImageOnGameCanvas(sprites.tileFlagHover, gridPos.x, gridPos.y);
            lastTileHovered = gridPos;
        }
        else {
            if (lastTileHovered !== null) {
                this.drawImageOnGameCanvas(sprites.tile, lastTileHovered.x, lastTileHovered.y);
                lastTileHovered = null;
            }
        }
    }

    handleRestartButtonHover(restartButtonX) {
        gameCanvasContext.clearRect(restartButtonX, 0, RESTART_BUTTON_WIDTH, 1);
        this.drawImageOnGameCanvas(sprites.restartButton, restartButtonX, 1);
        restartButtonHovered = true;
    }

    resetRestartButton(restartButtonX) {
        gameCanvasContext.clearRect(restartButtonX, CONTROL_BUTTON_HEIGHT, RESTART_BUTTON_WIDTH, 1);
        this.drawImageOnGameCanvas(sprites.restartButton, restartButtonX, 0);
        restartButtonHovered = false;
    }

    handleExitButtonHover(exitButtonX) {
        gameCanvasContext.clearRect(exitButtonX, 0, EXIT_BUTTON_WIDTH, 1);
        this.drawImageOnGameCanvas(sprites.exitButton, exitButtonX, 1);
        exitButtonHovered = true;
    }

    resetExitButton(exitButtonX) {
        gameCanvasContext.clearRect(exitButtonX, CONTROL_BUTTON_HEIGHT, EXIT_BUTTON_WIDTH, 1);
        this.drawImageOnGameCanvas(sprites.exitButton, exitButtonX, 0);
        exitButtonHovered = false;
    }

    handleSelectModeButtonHover() {
        let selectModeButtonImage = '';
        if(selectMode === SHOVEL_SELECT_MODE) selectModeButtonImage = sprites.shovelModeButton;
        if(selectMode === FLAG_SELECT_MODE) selectModeButtonImage = sprites.flagModeButton;
        gameCanvasContext.clearRect(0, 0, SELECT_MODE_BUTTON_WIDTH, 1);
        this.drawImageOnGameCanvas(selectModeButtonImage, 0, 1);
        selectModeButtonHovered = true;
    }

    resetSelectModeButton() {
        let selectModeButtonImage = '';
        if(selectMode === SHOVEL_SELECT_MODE) selectModeButtonImage = sprites.shovelModeButton;
        if(selectMode === FLAG_SELECT_MODE) selectModeButtonImage = sprites.flagModeButton;
        gameCanvasContext.clearRect(0, CONTROL_BUTTON_HEIGHT - 1, SELECT_MODE_BUTTON_WIDTH, 1);
        this.drawImageOnGameCanvas(selectModeButtonImage, 0, 0);
        selectModeButtonHovered = false;
    }

    isGameGridHover(mousePos) {
        return ((mousePos.x >= 2 && mousePos.x < (GAME_SCREEN_WIDTH_PX - 2)) && (mousePos.y >= 31 && mousePos.y < (GAME_SCREEN_HEIGHT_PX -2)))
    }

    handleMouseGameCanvasClick(event) {
        var mousePos = getMousePos(gameCanvas, event);
        const exitButtonX = GAME_SCREEN_WIDTH_PX - EXIT_BUTTON_WIDTH;
        const restartButtonX = GAME_SCREEN_WIDTH_PX - EXIT_BUTTON_WIDTH - RESTART_BUTTON_WIDTH - 3;

        if (mousePos.x >= exitButtonX && mousePos.y < CONTROL_BUTTON_HEIGHT + 1) this.exitGame();
        else if (mousePos.x >= restartButtonX && mousePos.x < restartButtonX + RESTART_BUTTON_WIDTH && mousePos.y < CONTROL_BUTTON_HEIGHT + 1) this.restartGame();
        else if (mousePos.x <= SELECT_MODE_BUTTON_WIDTH && mousePos.y <= CONTROL_BUTTON_HEIGHT) this.handleSelectModeButtonClick();
    }

    handleMouseGameCanvasLeave() {
        const exitButtonX = GAME_SCREEN_WIDTH_PX - EXIT_BUTTON_WIDTH;
        const restartButtonX = GAME_SCREEN_WIDTH_PX - EXIT_BUTTON_WIDTH - RESTART_BUTTON_WIDTH - 3;
        if(exitButtonHovered) this.resetExitButton(exitButtonX);
        if(restartButtonHovered) this.resetRestartButton(restartButtonX);
        if(selectModeButtonHovered) this.resetSelectModeButton();
        if (lastTileHovered !== null) {
            this.drawImageOnGameCanvas(sprites.tile, lastTileHovered.x, lastTileHovered.y);
            lastTileHovered = null;
        }
    }

    handleSelectModeButtonClick() {
        selectMode = (selectMode === SHOVEL_SELECT_MODE) ? FLAG_SELECT_MODE : SHOVEL_SELECT_MODE;
        this.handleSelectModeButtonHover();
    }

    drawImageOnGameCanvas(imageSrc, x, y) {
        return new Promise(function(resolve, reject) {
            var img = new Image();
            img.src = imageSrc;
            img.onload = function(){
                gameCanvasContext.drawImage(img,x,y);
                resolve();
            };
        })
    }

    resetGameVariables() {
        GAME_STARTED = false;
        selectMode = SHOVEL_SELECT_MODE;
        exitButtonHovered = false;
        restartButtonHovered = false;
        selectModeButtonHovered = false;
        IS_VERTICAL_SCREEN = null;
        var lastTileHovered = null;
    }

    render() {
        return (
            <div className='game-background'>
                <div id='minesweeper-game-container'>
                    <canvas id='minesweeper-game-canvas'/>
                </div>
            </div>
        );
    }
}

function getGameGridPos(position) {
    return {
        x: 2 + (9 * position[1]),
        y: 31 + (9 * position[0])
    };
}

function getGameGridPosFromMousePos(mousePos) {
    return {
        x: 2 + (9 * Math.floor((mousePos.x - 2) / 9)),
        y: 31 + (9 * Math.floor((mousePos.y - 31) / 9))
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