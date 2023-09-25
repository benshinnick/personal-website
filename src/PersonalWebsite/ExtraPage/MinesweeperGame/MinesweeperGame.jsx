import React from 'react';
import './MinesweeperGame.css';
import MinesweeperBoard from './MinesweeperBoard';
import * as sprites from './SpriteImageSources.js';
import * as ch from '../CookieHelper.js';

var GAME_STARTED = false;
var GAME_SIZE = null;
var GAME_DIFFICULTY = null;
var IS_VERTICAL_SCREEN = null;
var IS_MOBILE = null;

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
var gameSummaryDisplayed = false;
var timerInterval = null;
var timeCounter = 0;

const SHOVEL_SELECT_MODE = 'shovel';
const FLAG_SELECT_MODE = 'flag';
const CONTROL_BUTTON_HEIGHT = 10;
const EXIT_BUTTON_WIDTH = 22;
const RESTART_BUTTON_WIDTH = 40;
const SELECT_MODE_BUTTON_WIDTH = 33;
const TILE_LENGTH = 9;

export default class MinesweeperGame extends React.Component {

    componentDidMount() {
        GAME_SIZE = ch.readCookie('minesweeper-size');
        GAME_DIFFICULTY = ch.readCookie('minesweeper-difficulty');
        this.handleResize();
        document.getElementById('main-content').style.overflowY = 'hidden';
        document.getElementById('main-content').style.height = '100vh';

        window.addEventListener('resize', this.handleResize);
        // window.addEventListener('keydown', this.handleKeyDown);

        window.mobileAndTabletCheck = function() {
            let check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera); // eslint-disable-line
            return check;
        };
        IS_MOBILE = window.mobileAndTabletCheck();
        
        if(!IS_MOBILE) {
            gameCanvas.addEventListener("mousemove", (evt) => {
                this.handleMouseGameCanvasHover(evt)
            }, false);
            gameCanvas.addEventListener("mouseleave", () => {
                this.handleMouseGameCanvasLeave()
            }, false);
        }
        gameCanvas.addEventListener("mousedown", (evt) => {
            this.handleMouseGameCanvasDown(evt)
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
        if(GAME_STARTED || (gameBoard.getFlagsLeft() !== gameBoard.getMinesForBoardSize())) {
            this.resetGameVariables();
            this.handleResize();
        }
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
            gameBoard = new MinesweeperBoard(MINESWEEPER_GRID_ROWS, MINESWEEPER_GRID_COLS, GAME_DIFFICULTY);
            this.drawImageOnGameCanvas(baseImage, 0, 0).then(() => {
                this.updateFlagCounter(gameBoard.getFlagsLeft());
            });
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
        if(!gameSummaryDisplayed && !tilesRevealed) {
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

    handleMouseGameCanvasDown(event) {
        if(event.button === 2) return; // right click
        var mousePos = getMousePos(gameCanvas, event);
        const exitButtonX = GAME_SCREEN_WIDTH_PX - EXIT_BUTTON_WIDTH;
        const restartButtonX = GAME_SCREEN_WIDTH_PX - EXIT_BUTTON_WIDTH - RESTART_BUTTON_WIDTH - 3;

        if (mousePos.x >= exitButtonX && mousePos.y < CONTROL_BUTTON_HEIGHT + 1) this.exitGame();
        else if (mousePos.x >= restartButtonX && mousePos.x < restartButtonX + RESTART_BUTTON_WIDTH && mousePos.y < CONTROL_BUTTON_HEIGHT + 1) this.restartGame();
        else if (mousePos.x <= SELECT_MODE_BUTTON_WIDTH && mousePos.y <= CONTROL_BUTTON_HEIGHT) this.handleSelectModeButtonClick();

        if (this.isGameGridHover(mousePos) && !gameSummaryDisplayed) {
            const boardPos = getGameBoardPosFromMousePos(mousePos);
            if(selectMode === SHOVEL_SELECT_MODE) this.handleGridMouseDownUncover(boardPos);
            if(selectMode === FLAG_SELECT_MODE) this.handleGridMouseDownFlag(boardPos);
        }
    }

    handleGridMouseDownUncover(boardPos) {
        const boardCell = gameBoard.getCell(boardPos[0], boardPos[1]);
        if(boardCell.cell.isFlagged) return;
        if(!gameBoard.isBoardGenerated()) {
            gameBoard.generateBoard(boardPos);
            GAME_STARTED = true;
            timerInterval = setInterval(() => {
                if (timeCounter >= 999) return;
                timeCounter += 1;
                this.updateTimeCounter(timeCounter);
            }, 1000);
        }
        const gridPos = getGameGridPos([boardPos[0], boardPos[1]]);
        if(!boardCell.cell.isRevealed) {
            this.drawImageOnGameCanvas(sprites.shovelTilePressed, gridPos.x, gridPos.y);
        }
        gameBoard.selectCell(boardPos);
        const revealedCells = gameBoard.getLastRevealedCells();
        if (revealedCells.length > 0) tilesRevealed = true;
    }

    handleGridMouseDownFlag(boardPos) {
        if(gameBoard.isCellFlagged(boardPos[0], boardPos[1])) {
            gameBoard.unflagCell(boardPos);
            const gridPos = getGameGridPos(boardPos);
            this.drawImageOnGameCanvas(sprites.tile, gridPos.x, gridPos.y);
            if(!gameSummaryDisplayed) this.updateFlagCounter(gameBoard.getFlagsLeft());
            unflaggedTilePosition = gridPos;
            lastTileHovered = null;
            return;
        }
        if(!gameBoard.isCellRevealed(boardPos[0], boardPos[1]) && gameBoard.getFlagsLeft() > 0) {
            gameBoard.flagCell(boardPos);
            const gridPos = getGameGridPos(boardPos);
            this.drawImageOnGameCanvas(sprites.flagTile, gridPos.x, gridPos.y);
            if(!gameSummaryDisplayed) this.updateFlagCounter(gameBoard.getFlagsLeft());
            flaggedTilePosition = gridPos;
            lastTileHovered = null;
            return;
        }
    }

    handleMouseGameCanvasUp() {
        if(gameBoard.isGameOver() && !gameSummaryDisplayed) this.handleGameOver();
        if(gameBoard.isGameWon() && !gameSummaryDisplayed) this.handleGameWon();

        if(flaggedTilePosition !== null && !gameSummaryDisplayed) {
            this.drawImageOnGameCanvas(sprites.flagTile, flaggedTilePosition.x, flaggedTilePosition.y);
            flaggedTilePosition = null;
            return;
        }
        if(unflaggedTilePosition !== null && !gameSummaryDisplayed) {
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
        if(!gameSummaryDisplayed) this.updateFlagCounter(gameBoard.getFlagsLeft());

        if (selectMode === SHOVEL_SELECT_MODE && lastTileHovered !== null) this.drawImageOnGameCanvas(sprites.tileShovelHoverRevealedCell, lastTileHovered.x, lastTileHovered.y);
        if (selectMode === FLAG_SELECT_MODE && lastTileHovered !== null) this.drawImageOnGameCanvas(sprites.tileFlagHoverRevealedCell, lastTileHovered.x, lastTileHovered.y);

        tilesRevealed = false;
    }

    handleMouseRightClick(event) {
        if(gameSummaryDisplayed) return;
        const mousePos = getMousePos(gameCanvas, event);
        if (this.isGameGridHover(mousePos)) {
            const boardPos = getGameBoardPosFromMousePos(mousePos)
            if(selectMode === FLAG_SELECT_MODE) this.handleGridMouseDownUncover(boardPos);
            if(selectMode === SHOVEL_SELECT_MODE) this.handleGridMouseDownFlag(boardPos);
        }
    }

    handleMouseGameCanvasLeave() {
        if(gameBoard.isGameOver() && !gameSummaryDisplayed) this.handleGameOver();
        if(gameBoard.isGameWon() && !gameSummaryDisplayed) this.handleGameWon();

        const exitButtonX = GAME_SCREEN_WIDTH_PX - EXIT_BUTTON_WIDTH;
        const restartButtonX = GAME_SCREEN_WIDTH_PX - EXIT_BUTTON_WIDTH - RESTART_BUTTON_WIDTH - 3;
        if(exitButtonHovered) this.resetExitButton(exitButtonX);
        if(restartButtonHovered) this.resetRestartButton(restartButtonX);
        if(selectModeButtonHovered) this.resetSelectModeButton();

        if(gameSummaryDisplayed) return;

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

    handleGameOver() {
        lastTileHovered = null;
        clearInterval(timerInterval);
        this.drawGameOverBanner();
        this.drawGameOverTimeCounter(timeCounter);
        this.drawGameOverFlagCounter(gameBoard.getFlagsLeft());
        this.drawMineCellsOnGrid(gameBoard.getAllMineCells());
        this.drawGameOverOutline();
        this.updateHighScores();
        gameSummaryDisplayed = true;
    }

    handleGameWon() {
        lastTileHovered = null;
        clearInterval(timerInterval);
        this.drawGameWonBanner();
        this.drawGameOverTimeCounter(timeCounter);
        this.drawGameOverFlagCounter(gameBoard.getFlagsLeft());
        this.drawGameWonMineCellsOnGrid(gameBoard.getAllMineCells());
        this.drawGameWonOutline();
        this.updateHighScores();
        gameSummaryDisplayed = true;
    }

    handleSelectModeButtonClick() {
        selectMode = (selectMode === SHOVEL_SELECT_MODE) ? FLAG_SELECT_MODE : SHOVEL_SELECT_MODE;
        this.handleSelectModeButtonHover();
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

    drawGameWonMineCellsOnGrid(mineCells) {
        for(let i = 0; i < mineCells.length; i++) {
            const row = mineCells[i].row;
            const column = mineCells[i].column;
            const gridPos = getGameGridPos([row, column]);
            this.drawImageOnGameCanvas(sprites.gameWonMineTile, gridPos.x, gridPos.y);
        }
    }

    drawRevealedCellOnGrid(revealedCell) {
        if (revealedCell.cell.isMine) return;
        const row = revealedCell.row;
        const column = revealedCell.column;
        const neighboringMines = revealedCell.cell.neighboringMines;
        const gridPos = getGameGridPos([row, column]);
        if (neighboringMines === 0) {
            const backgroundImage = (row + column) % 2 === 0 ? sprites.backgroundTile1 : sprites.backgroundTile2;
            this.drawImageOnGameCanvas(backgroundImage, gridPos.x, gridPos.y);
        }
        else if (neighboringMines === 1) this.drawImageOnGameCanvas(sprites.oneTile, gridPos.x, gridPos.y);
        else if (neighboringMines === 2) this.drawImageOnGameCanvas(sprites.twoTile, gridPos.x, gridPos.y);
        else if (neighboringMines === 3) this.drawImageOnGameCanvas(sprites.threeTile, gridPos.x, gridPos.y);
        else if (neighboringMines === 4) this.drawImageOnGameCanvas(sprites.fourTile, gridPos.x, gridPos.y);
        else if (neighboringMines === 5) this.drawImageOnGameCanvas(sprites.fiveTile, gridPos.x, gridPos.y);
        else if (neighboringMines === 6) this.drawImageOnGameCanvas(sprites.sixTile, gridPos.x, gridPos.y);
        else if (neighboringMines === 7) this.drawImageOnGameCanvas(sprites.sevenTile, gridPos.x, gridPos.y);
        else if (neighboringMines === 8) this.drawImageOnGameCanvas(sprites.eightTile, gridPos.x, gridPos.y);
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

    drawGameWonBanner() {
        let gameWonBannerImage = '';
        if(!IS_VERTICAL_SCREEN && GAME_SIZE === 'large') gameWonBannerImage = sprites.gameWonBannerHorizontalLarge;
        if(!IS_VERTICAL_SCREEN && GAME_SIZE === 'medium') gameWonBannerImage = sprites.gameWonBannerHorizontalMedium;
        if(!IS_VERTICAL_SCREEN && GAME_SIZE === 'small') gameWonBannerImage = sprites.gameWonBannerHorizontalSmall;
        if(IS_VERTICAL_SCREEN && GAME_SIZE === 'large') gameWonBannerImage = sprites.gameWonBannerVerticalLarge;
        if(IS_VERTICAL_SCREEN && GAME_SIZE === 'medium') gameWonBannerImage = sprites.gameWonBannerVerticalMedium;
        if(IS_VERTICAL_SCREEN && GAME_SIZE === 'small') gameWonBannerImage = sprites.gameWonBannerVerticalSmall;
        this.drawImageOnGameCanvas(gameWonBannerImage, 2, 15);
    }

    drawGameWonOutline() {
        let gameWonOutlineImage = '';
        if(!IS_VERTICAL_SCREEN && GAME_SIZE === 'large') gameWonOutlineImage = sprites.gameWonOutlineHorizontalLarge;
        if(!IS_VERTICAL_SCREEN && GAME_SIZE === 'medium') gameWonOutlineImage = sprites.gameWonOutlineHorizontalMedium;
        if(!IS_VERTICAL_SCREEN && GAME_SIZE === 'small') gameWonOutlineImage = sprites.gameWonOutlineHorizontalSmall;
        if(IS_VERTICAL_SCREEN && GAME_SIZE === 'large') gameWonOutlineImage = sprites.gameWonOutlineVerticalLarge;
        if(IS_VERTICAL_SCREEN && GAME_SIZE === 'medium') gameWonOutlineImage = sprites.gameWonOutlineVerticalMedium;
        if(IS_VERTICAL_SCREEN && GAME_SIZE === 'small') gameWonOutlineImage = sprites.gameWonOutlineVerticalSmall;
        this.drawImageOnGameCanvas(gameWonOutlineImage, 0, 13);
    }

    drawGameOverOutline() {
        let gameOverOutlineImage = '';
        if(!IS_VERTICAL_SCREEN && GAME_SIZE === 'large') gameOverOutlineImage = sprites.gameOverOutlineHorizontalLarge;
        if(!IS_VERTICAL_SCREEN && GAME_SIZE === 'medium') gameOverOutlineImage = sprites.gameOverOutlineHorizontalMedium;
        if(!IS_VERTICAL_SCREEN && GAME_SIZE === 'small') gameOverOutlineImage = sprites.gameOverOutlineHorizontalSmall;
        if(IS_VERTICAL_SCREEN && GAME_SIZE === 'large') gameOverOutlineImage = sprites.gameOverOutlineVerticalLarge;
        if(IS_VERTICAL_SCREEN && GAME_SIZE === 'medium') gameOverOutlineImage = sprites.gameOverOutlineVerticalMedium;
        if(IS_VERTICAL_SCREEN && GAME_SIZE === 'small') gameOverOutlineImage = sprites.gameOverOutlineVerticalSmall;
        this.drawImageOnGameCanvas(gameOverOutlineImage, 0, 13);
    }

    async updateFlagCounter(count) {        
        let countText = count.toString();
        let numeralDrawPosition = [GAME_SCREEN_WIDTH_PX - 43, 17]; // [x, y]
        if(countText.length === 1) numeralDrawPosition = [GAME_SCREEN_WIDTH_PX - 41, 17];
        if(countText === '9') {
            gameCanvasContext.fillStyle = '#ffdcdc';
            gameCanvasContext.fillRect(GAME_SCREEN_WIDTH_PX - 44, 17, 13, 5);
        }
        for (let i = 0; i < countText.length; i++) {
            let value = parseInt(countText[i]);
            let numberImage = sprites.flagNumerals[value];
            await this.drawImageOnGameCanvas(numberImage, numeralDrawPosition[0], numeralDrawPosition[1]);
            if (countText.charAt(i) === '1') numeralDrawPosition[0] += 4;
            else numeralDrawPosition[0] = numeralDrawPosition[0] += 5;
        }
    }

    async updateTimeCounter(count) {
        let lastCountText = (count - 1).toString();
        let countText = count.toString();
        // pad with beginning zeros
        if(lastCountText.length !== 3) for(let i = 0; i <= 3 - lastCountText.length; i++) lastCountText = "0" + lastCountText;
        if(countText.length !== 3) for(let i = 0; i <= 3 - countText.length; i++) countText = "0" + countText;
        let numeralDrawPosition = [GAME_SCREEN_WIDTH_PX - 19, 17]; // [x, y]
        for (let i = 0; i < countText.length; i++) {
            let lastValue = parseInt(lastCountText[i]);
            let value = parseInt(countText[i]);
            if(lastValue === value) {
                if (countText.charAt(i) === '1') numeralDrawPosition[0] += 4;
                else numeralDrawPosition[0] = numeralDrawPosition[0] += 5;
                continue;
            }
            let numberImage = sprites.timeNumerals[value];
            await this.drawImageOnGameCanvas(numberImage, numeralDrawPosition[0], numeralDrawPosition[1]);
            if (countText.charAt(i) === '1') numeralDrawPosition[0] += 4;
            else numeralDrawPosition[0] = numeralDrawPosition[0] += 5;
        }
    }

    drawGameOverFlagCounter(count) {
        this.drawImageOnGameCanvas(sprites.gameOverScoreBackground, GAME_SCREEN_WIDTH_PX - 47, 15).then(() => {
            let countText = count.toString();
            let numeralDrawPosition = [GAME_SCREEN_WIDTH_PX - 43, 17]; // [x, y]
            if(countText.length === 1) numeralDrawPosition = [GAME_SCREEN_WIDTH_PX - 41, 17];
            for (let i = 0; i < countText.length; i++) {
                let value = parseInt(countText[i]);
                this.drawImageOnGameCanvas(sprites.gameOverNumerals[value], numeralDrawPosition[0], numeralDrawPosition[1]);
                if (countText.charAt(i) === '1') numeralDrawPosition[0] += 4;
                else numeralDrawPosition[0] = numeralDrawPosition[0] += 5;
            }
        });
    }

    drawGameOverTimeCounter(count) {
        this.drawImageOnGameCanvas(sprites.gameOverScoreBackground, GAME_SCREEN_WIDTH_PX - 20, 15).then(() => {
            let countText = count.toString();
            // pad with beginning zeros
            if(countText.length !== 3) for(let i = 0; i <= 3 - countText.length; i++) countText = "0" + countText;
            let numeralDrawPosition = [GAME_SCREEN_WIDTH_PX - 19, 17]; // [x, y]
            for (let i = 0; i < countText.length; i++) {
                let value = parseInt(countText[i]);
                this.drawImageOnGameCanvas(sprites.gameOverNumerals[value], numeralDrawPosition[0], numeralDrawPosition[1]);
                if (countText.charAt(i) === '1') numeralDrawPosition[0] += 4;
                else numeralDrawPosition[0] = numeralDrawPosition[0] += 5;
            }
        });
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
        if(!IS_MOBILE) { 
            this.drawImageOnGameCanvas(selectModeButtonImage, 0, 1);
            gameCanvasContext.clearRect(0, 0, SELECT_MODE_BUTTON_WIDTH, 1);
        }
        else this.drawImageOnGameCanvas(selectModeButtonImage, 0, 0);

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

    resetGameVariables() {
        clearInterval(timerInterval);
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
        timerInterval = null;
        gameSummaryDisplayed = false;
        timeCounter = 0;
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

    updateHighScores() {
        const allHighScores = ch.getMinesweeperHighScores();
        let sizeIdx = 0;
        if(GAME_SIZE === 'small') sizeIdx = 0; if(GAME_SIZE === 'medium') sizeIdx = 1; if(GAME_SIZE === 'large') sizeIdx = 2;
        let difficultyIdx = 0;
        if(GAME_DIFFICULTY === 'easy') difficultyIdx = 0; if(GAME_DIFFICULTY === 'medium') difficultyIdx = 1; if(GAME_DIFFICULTY === 'hard') difficultyIdx = 2;
        let highScores = allHighScores[sizeIdx][difficultyIdx];
        highScores.push([gameBoard.getPercentBoardCompleted(), timeCounter]);

        highScores.sort(function(a, b) { 
            return cmp(a[0],b[0]) || cmp(b[1], a[1])
        });
        if(highScores.length > 5) {
            highScores = highScores.slice(0, 5);
        }
        allHighScores[sizeIdx][difficultyIdx] = highScores;

        ch.updateMinesweeperHighScores(allHighScores);
    }
}

function cmp(a, b) {return (a < b) - (a > b)};

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