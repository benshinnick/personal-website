import React from 'react';
import './MinesweeperGame.css';
import MinesweeperBoard from './MinesweeperBoard';
import * as sprites from './SpriteImageSources.js';
import * as ch from '../CookieHelper.js';

var GAME_STARTED = false;
var GAME_SIZE = null;
var IS_VERTICAL_SCREEN = null;

var GAME_SCREEN_WIDTH_PX;
var GAME_SCREEN_HEIGHT_PX;
var MINESWEEPER_GRID_ROWS;
var MINESWEEPER_GRID_COLS;

var gameBoard = null;
var gameCanvas;
var gameCanvasContext;

var selectMode = 'shovel';
var flaggedTilePosition = null;
var unflaggedTilePosition = null;
var tilesRevealed = false;
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
const TILE_LENGTH = 9;

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
        gameCanvas.addEventListener("mousedown", (evt) => {
            this.handleMouseGameCanvasDown(evt)
        }, false);
        gameCanvas.addEventListener("mouseleave", () => {
            this.handleMouseGameCanvasLeave()
        }, false);
        gameCanvas.addEventListener("mouseup", () => {
            this.handleMouseGameCanvasUp()
        }, false);
        gameCanvas.addEventListener('contextmenu', (evt) => {
            evt.preventDefault();
            this.handleMouseRightClick(evt);
            return false;
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
        this.resetGameVariables();
        this.handleResize();
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
                    [GAME_SCREEN_WIDTH_PX, GAME_SCREEN_HEIGHT_PX] = [184, 159];
                    [MINESWEEPER_GRID_ROWS, MINESWEEPER_GRID_COLS] = [14, 20];
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
                    [GAME_SCREEN_WIDTH_PX, GAME_SCREEN_HEIGHT_PX] = [130, 213];
                    [MINESWEEPER_GRID_ROWS, MINESWEEPER_GRID_COLS] = [20, 14];
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
            gameBoard = new MinesweeperBoard(MINESWEEPER_GRID_ROWS, MINESWEEPER_GRID_COLS);
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
        if(!gameBoard.isGameOver()) {
            if(this.isGameGridHover(mousePos))
                this.handleGameGridHover(mousePos);
            else if (lastTileHovered !== null)
                this.clearLastHoveredTileOfHoverEffect();
        }        
    }

    handleGameGridHover(mousePos) {
        if(gameBoard.getLastRevealedCells().length > 0) return;
        if(flaggedTilePosition !== null || unflaggedTilePosition !== null) return;
        const boardPos = getGameBoardPosFromMousePos(mousePos);
        const gridPos = getGameGridPosFromMousePos(mousePos);
        if(lastTileHovered !== null && gridPos.x === lastTileHovered.x && gridPos.y === lastTileHovered.y) return;
        if(lastTileHovered !== null) {
            if(!gameBoard.isBoardGenerated()) this.drawImageOnGameCanvas(sprites.tile, lastTileHovered.x, lastTileHovered.y);
            else this.clearLastHoveredTileOfHoverEffect();
        }
        if (gameBoard.isCellFlagged(boardPos[0], boardPos[1])) {
            lastTileHovered = null;
            return;
        }
        
        if(!gameBoard.isBoardGenerated()) {
            if (selectMode === SHOVEL_SELECT_MODE) this.drawImageOnGameCanvas(sprites.tileShovelHover, gridPos.x, gridPos.y);
            if (selectMode === FLAG_SELECT_MODE) this.drawImageOnGameCanvas(sprites.tileFlagHover, gridPos.x, gridPos.y);
        }
        else {
            if (gameBoard.isCellRevealed(boardPos[0], boardPos[1])) {
                if (selectMode === SHOVEL_SELECT_MODE) this.drawImageOnGameCanvas(sprites.tileShovelHoverRevealedCell, gridPos.x, gridPos.y);
                if (selectMode === FLAG_SELECT_MODE) this.drawImageOnGameCanvas(sprites.tileFlagHoverRevealedCell, gridPos.x, gridPos.y);
            }
            else {
                if (selectMode === SHOVEL_SELECT_MODE) this.drawImageOnGameCanvas(sprites.tileShovelHover, gridPos.x, gridPos.y);
                if (selectMode === FLAG_SELECT_MODE) this.drawImageOnGameCanvas(sprites.tileFlagHover, gridPos.x, gridPos.y);
            }
        }
        lastTileHovered = gridPos;
    }

    clearLastHoveredTileOfHoverEffect() {
        if(lastTileHovered !== null) {
            const lastHoveredTileBoardPos = getGameBoardPosFromMousePos(lastTileHovered);
            if (gameBoard.isCellRevealed(lastHoveredTileBoardPos[0], lastHoveredTileBoardPos[1]))
                this.drawRevealedCellOnGrid(gameBoard.getCell(lastHoveredTileBoardPos[0], lastHoveredTileBoardPos[1]));
            else this.drawImageOnGameCanvas(sprites.tile, lastTileHovered.x, lastTileHovered.y);
            lastTileHovered = null;
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

    handleMouseGameCanvasDown(event) {
        if(event.button === 2) return; // right click
        var mousePos = getMousePos(gameCanvas, event);
        const exitButtonX = GAME_SCREEN_WIDTH_PX - EXIT_BUTTON_WIDTH;
        const restartButtonX = GAME_SCREEN_WIDTH_PX - EXIT_BUTTON_WIDTH - RESTART_BUTTON_WIDTH - 3;

        if (mousePos.x >= exitButtonX && mousePos.y < CONTROL_BUTTON_HEIGHT + 1) this.exitGame();
        else if (mousePos.x >= restartButtonX && mousePos.x < restartButtonX + RESTART_BUTTON_WIDTH && mousePos.y < CONTROL_BUTTON_HEIGHT + 1) this.restartGame();
        else if (mousePos.x <= SELECT_MODE_BUTTON_WIDTH && mousePos.y <= CONTROL_BUTTON_HEIGHT) this.handleSelectModeButtonClick();

        if (this.isGameGridHover(mousePos) && !gameBoard.isGameOver()) {
            const boardPos = getGameBoardPosFromMousePos(mousePos);
            if(selectMode === SHOVEL_SELECT_MODE) this.handleGridMouseDownUncover(boardPos);
            if(selectMode === FLAG_SELECT_MODE) this.handleGridMouseDownFlag(boardPos);
        }
    }

    handleGridMouseDownUncover(boardPos) {
        if(!gameBoard.isBoardGenerated()) {
            gameBoard.generateBoard(boardPos);
            GAME_STARTED = true;
        }
        gameBoard.selectCell(boardPos);
        const gridPos = getGameGridPos([boardPos[0], boardPos[1]]);
        if(gameBoard.isGameOver()) {
            this.drawImageOnGameCanvas(sprites.shovelTilePressed, gridPos.x, gridPos.y);
            lastTileHovered = null;
            return;
        }
        const revealedCells = gameBoard.getLastRevealedCells();
        if (revealedCells.length > 0) {
            this.drawImageOnGameCanvas(sprites.shovelTilePressed, gridPos.x, gridPos.y);
            tilesRevealed = true;
        }
    }

    handleGridMouseDownFlag(boardPos) {
        if(gameBoard.isCellFlagged(boardPos[0], boardPos[1])) {
            gameBoard.unflagCell(boardPos);
            const gridPos = getGameGridPos(boardPos);
            this.drawImageOnGameCanvas(sprites.tile, gridPos.x, gridPos.y);
            unflaggedTilePosition = gridPos;
            lastTileHovered = null;
            return;
        }
        if(!gameBoard.isCellRevealed(boardPos[0], boardPos[1])) {
            gameBoard.flagCell(boardPos);
            const gridPos = getGameGridPos(boardPos);
            this.drawImageOnGameCanvas(sprites.flagTile, gridPos.x, gridPos.y);
            flaggedTilePosition = gridPos;
            lastTileHovered = null;
            return;
        }
    }

    handleMouseGameCanvasUp() {
        if(gameBoard.isGameOver()) {
            this.drawGameOverBanner();
            this.drawMineCellsOnGrid(gameBoard.getAllMineCells());
        }

        if(flaggedTilePosition !== null) {
            this.drawImageOnGameCanvas(sprites.flagTile, flaggedTilePosition.x, flaggedTilePosition.y);
            flaggedTilePosition = null;
            return;
        }
        if(unflaggedTilePosition !== null) {
            this.drawImageOnGameCanvas(sprites.tile, unflaggedTilePosition.x, unflaggedTilePosition.y);
            unflaggedTilePosition = null;
            return;
        }
        if (!tilesRevealed) return;

        const revealedCells = gameBoard.getLastRevealedCells();
        for(let i = 0; i < revealedCells.length; i++) {
            this.drawRevealedCellOnGrid(revealedCells[i]);
        }
        gameBoard.clearLastRevealedCells();

        if (selectMode === SHOVEL_SELECT_MODE && lastTileHovered !== null) this.drawImageOnGameCanvas(sprites.tileShovelHoverRevealedCell, lastTileHovered.x, lastTileHovered.y);
        if (selectMode === FLAG_SELECT_MODE && lastTileHovered !== null) this.drawImageOnGameCanvas(sprites.tileFlagHoverRevealedCell, lastTileHovered.x, lastTileHovered.y);

        tilesRevealed = false;
    }

    drawMineCellsOnGrid(mineCells) {
        for(let i = 0; i < mineCells.length; i++) {
            const row = mineCells[i].row;
            const column = mineCells[i].column;
            const gridPos = getGameGridPos([row, column]);
            if(mineCells[i].cell.isRevealed) this.drawImageOnGameCanvas(sprites.revealedMineTile, gridPos.x, gridPos.y);
            else if(mineCells[i].cell.isFlagged) this.drawImageOnGameCanvas(sprites.flaggedMineTile, gridPos.x, gridPos.y);
            else this.drawImageOnGameCanvas(sprites.mineTile, gridPos.x, gridPos.y);
        }
    }

    drawRevealedCellOnGrid(revealedCell) {
        const row = revealedCell.row;
        const column = revealedCell.column;
        const neighboringMines = revealedCell.cell.neighboringMines;
        const gridPos = getGameGridPos([row, column]);
        if (neighboringMines === 0) {
            const backgroundImage = (row + column) % 2 === 0 ? sprites.backgroundTile1 : sprites.backgroundTile2;
            this.drawImageOnGameCanvas(backgroundImage, gridPos.x, gridPos.y);
        }
        if (neighboringMines === 1) this.drawImageOnGameCanvas(sprites.oneTile, gridPos.x, gridPos.y);
        if (neighboringMines === 2) this.drawImageOnGameCanvas(sprites.twoTile, gridPos.x, gridPos.y);
        if (neighboringMines === 3) this.drawImageOnGameCanvas(sprites.threeTile, gridPos.x, gridPos.y);
        if (neighboringMines === 4) this.drawImageOnGameCanvas(sprites.fourTile, gridPos.x, gridPos.y);
        if (neighboringMines === 5) this.drawImageOnGameCanvas(sprites.fiveTile, gridPos.x, gridPos.y);
        if (neighboringMines === 6) this.drawImageOnGameCanvas(sprites.sixTile, gridPos.x, gridPos.y);
        if (neighboringMines === 7) this.drawImageOnGameCanvas(sprites.sevenTile, gridPos.x, gridPos.y);
        if (neighboringMines === 8) this.drawImageOnGameCanvas(sprites.eightTile, gridPos.x, gridPos.y);
    }

    drawGameOverBanner() {
        let gameOverBannerImage = '';
        if(!IS_VERTICAL_SCREEN && GAME_SIZE === 'large') gameOverBannerImage = sprites.gameOverBannerHorizontalLarge;
        if(!IS_VERTICAL_SCREEN && GAME_SIZE === 'medium') gameOverBannerImage = sprites.gameOverBannerHorizontalMedium;
        if(!IS_VERTICAL_SCREEN && GAME_SIZE === 'small') gameOverBannerImage = sprites.gameOverBannerHorizontalSmall;
        if(IS_VERTICAL_SCREEN && GAME_SIZE === 'large') gameOverBannerImage = sprites.gameOverBannerVerticalLarge;
        if(IS_VERTICAL_SCREEN && GAME_SIZE === 'medium') gameOverBannerImage = sprites.gameOverBannerVerticalMedium;
        if(IS_VERTICAL_SCREEN && GAME_SIZE === 'small') gameOverBannerImage = sprites.gameOverBannerVerticalSmall;
        this.drawImageOnGameCanvas(gameOverBannerImage, 2, 15);
    }

    handleMouseRightClick(event) {
        if(gameBoard.isGameOver()) return;
        const mousePos = getMousePos(gameCanvas, event);
        if (this.isGameGridHover(mousePos)) {
            const boardPos = getGameBoardPosFromMousePos(mousePos)
            if(selectMode === FLAG_SELECT_MODE) this.handleGridMouseDownUncover(boardPos);
            if(selectMode === SHOVEL_SELECT_MODE) this.handleGridMouseDownFlag(boardPos);
        }
    }

    handleMouseGameCanvasLeave() {
        const exitButtonX = GAME_SCREEN_WIDTH_PX - EXIT_BUTTON_WIDTH;
        const restartButtonX = GAME_SCREEN_WIDTH_PX - EXIT_BUTTON_WIDTH - RESTART_BUTTON_WIDTH - 3;
        if(exitButtonHovered) this.resetExitButton(exitButtonX);
        if(restartButtonHovered) this.resetRestartButton(restartButtonX);
        if(selectModeButtonHovered) this.resetSelectModeButton();
        if (lastTileHovered !== null) {
            if(!gameBoard.isBoardGenerated()) this.drawImageOnGameCanvas(sprites.tile, lastTileHovered.x, lastTileHovered.y);
            else this.clearLastHoveredTileOfHoverEffect();
        }
        if(flaggedTilePosition !== null) {
            this.drawImageOnGameCanvas(sprites.flagTile, flaggedTilePosition.x, flaggedTilePosition.y);
            flaggedTilePosition = null;
        }
        if(unflaggedTilePosition !== null) {
            this.drawImageOnGameCanvas(sprites.tile, unflaggedTilePosition.x, unflaggedTilePosition.y);
            unflaggedTilePosition = null;
        }
        const revealedCells = gameBoard.getLastRevealedCells();
        for(let i = 0; i < revealedCells.length; i++) {
            this.drawRevealedCellOnGrid(revealedCells[i]);
        }
        gameBoard.clearLastRevealedCells();
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
        gameBoard = null;
        selectMode = SHOVEL_SELECT_MODE;
        exitButtonHovered = false;
        restartButtonHovered = false;
        selectModeButtonHovered = false;
        tilesRevealed = false;
        IS_VERTICAL_SCREEN = null;
        lastTileHovered = null;
        flaggedTilePosition = null;
        unflaggedTilePosition = null;
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
        x: 2 + (TILE_LENGTH * position[1]),
        y: 31 + (TILE_LENGTH * position[0])
    };
}

function getGameGridPosFromMousePos(mousePos) {
    return {
        x: 2 + (TILE_LENGTH * Math.floor((mousePos.x - 2) / TILE_LENGTH)),
        y: 31 + (TILE_LENGTH * Math.floor((mousePos.y - 31) / TILE_LENGTH))
    }
}

function getGameBoardPosFromMousePos(mousePos) {
    return [
            Math.floor((mousePos.y - 31) / TILE_LENGTH),
            Math.floor((mousePos.x - 2) / TILE_LENGTH)
    ]
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