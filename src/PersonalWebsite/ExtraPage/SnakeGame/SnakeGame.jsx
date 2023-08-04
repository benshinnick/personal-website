import React from 'react';
import './SnakeGame.css';

const GAME_SCREEN_WIDTH_PX = 129;
const GAME_SCREEN_HEIGHT_PX = 105;

var exitButtonHovered = false;
var restartButtonHovered = false;

// 129 x 105
var baseImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIEAAABpBAMAAADvmV2MAAAAAXNSR0IArs4c6QAAABJQTFRFAAAAAAAAgAAAgICA/wAA////2e6U+wAAAAF0Uk5TAEDm2GYAAAHDSURBVFjD7dlRrpswEIVhv2QBf9OzgJsduKwgUhbAke7sfyt9MCRcCg3gq9IHj0SEjPJpPBgYkpTeRsyjnw69/366mFnEZEj9BoGwgnBYZUcXFMLhMJsESwiEJSx0QZQ9NgtBICKeQhnYKoQFWIU6moPi6yxKHbYK89B0qE+XqAr3Kb7o/DUWDqtPLlMa56VwxMJnBCD0QCaQUTnQJwvZloQRxpbjj0/b3MXn424JW0hgKDnIETJh4bXg83EXj5dQ1id9MmXklUMspmHDVBBgxFgH61WHtVKA+Pmsg3jlUHUu6FNUxiyHA9Enf++a3B/6llk0oQlNaEITThC08nDYLqw8Q+TNgpeTYIcQyynsEJbLu1vQvHb7hXnLcUBwrSDp/FlUC9Xnom49KCLGbYtw7XLX0XUTATRuU+F6WxYyOV9zznkieBCs57Vq8+v2sSyUYCIISZKQ0HBR2tzWBHLHQg7jm9l74drlUorlOkyEH7dD50KE69ZDeZ+pFYjjgsrLtn1cKMuhIAcFVQrjnapCEOcLw4o8V9DgnCngwlQIQ/vxb+/V9f1DdQ9T30fV93KtK25CE5rQhP9LqP+dtvL/i0i/AXNAtwyjWgJ2AAAAAElFTkSuQmCC';
// 24 x 9
var exitButtonImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAJAgMAAABVkwRVAAAAAXNSR0IArs4c6QAAAAlQTFRFAAAAAAAA////g93P0gAAAAF0Uk5TAEDm2GYAAAA0SURBVAjXY9BaBQQrGJaGAkEUw9SV07KywhimTp0WGQmkVmaCKRhvWhaIAqkMYwBpW7UMADOOGi+Dzp5CAAAAAElFTkSuQmCC';
// 24 x 8
var exitButtonHoverImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAIAgMAAACez9fwAAAAAXNSR0IArs4c6QAAAAxQTFRFAAAAAAAA/wAA////0ZO6SAAAAAF0Uk5TAEDm2GYAAAAvSURBVAjXY9BaBQQrGJaGAkEUw9SV07KywhimTp0WGQmkVmaCKRhvWhaQ+g8C3wCWeBnpKsgGYQAAAABJRU5ErkJggg==';
// 37 x 8
var restartButtonImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAIAgMAAAADwt54AAAAAXNSR0IArs4c6QAAAAlQTFRFAAAAAAAA////g93P0gAAAAF0Uk5TAEDm2GYAAABCSURBVAjXY9BaBQUMDEtDISCsgWHa0pVZWVFR05YCmZFTp0amzkydCmKuzIzMgjCXTg2LTJ01FSK6EqpgKtSE0AYAsrEmKFM3mlMAAAAASUVORK5CYII=';
// 37 x 7
var restartButtonHoverImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAHAgMAAADylGytAAAAAXNSR0IArs4c6QAAAAlQTFRFAAAAAAAAALHg3reUQQAAAAF0Uk5TAEDm2GYAAAA9SURBVAjXY9BaBQUMDEtDISCsgWHa0pVZWVFR05YCmZFTp0amzkydCmKuzIzMgjCXTg2LTJ01FSK6EqIAACMbImsR3sysAAAAAElFTkSuQmCC'; 

var gameCanvas;
var gameCanvasContext;

export default class SnakeGame extends React.Component {
    componentDidMount() {
        console.log('SNAKE GAME LOADED');
        document.getElementById('main-content').style.overflowY = 'hidden';
        document.getElementById('main-content').style.height = '100vh';

        gameCanvas = document.getElementById('snake-game-canvas');
        gameCanvas.width = GAME_SCREEN_WIDTH_PX;
        gameCanvas.height = GAME_SCREEN_HEIGHT_PX;
        gameCanvasContext = gameCanvas.getContext("2d");

        gameCanvas.addEventListener("mousemove", (evt) => { this.handleMouseGameCanvasHover(evt) }, false);
        gameCanvas.addEventListener("click", (evt) => { this.handleMouseGameCanvasClick(evt) }, false);

        this.drawImageOnGameCanvas(baseImage, 0, 0);
    }

    componentWillUnmount() {
        document.getElementById('main-content').style.overflowY = '';
        document.getElementById('main-content').style.height = '';
    }

    handleMouseGameCanvasHover(event) {
        var mousePos = getMousePos(gameCanvas, event);
        if (mousePos.x > 66 && mousePos.x < 104 && mousePos.y < 8) {
            if(exitButtonHovered) this.resetExitButton();
            if(!restartButtonHovered) this.handleRestartButtonHover();
        }
        else if (mousePos.x > 104 && mousePos.y < 8) {
            if(restartButtonHovered) this.resetRestartButton();
            if(!exitButtonHovered) this.handleExitButtonHover();
        }
        else {
            if(exitButtonHovered) this.resetExitButton();
            if(restartButtonHovered) this.resetRestartButton();
        }
    }

    handleRestartButtonHover() {
        gameCanvasContext.clearRect(67, 0, 37, 2);
        this.drawImageOnGameCanvas(restartButtonHoverImage, 67, 1);
        restartButtonHovered = true;
    }

    resetRestartButton() {
        gameCanvasContext.clearRect(67, 0, 37, 2);
        this.drawImageOnGameCanvas(restartButtonImage, 67, 0);
        restartButtonHovered = false;
    }

    handleExitButtonHover() {
        gameCanvasContext.clearRect(105, 0, 24, 2);
        this.drawImageOnGameCanvas(exitButtonHoverImage, 105, 1);
        exitButtonHovered = true;
    }

    resetExitButton() {
        gameCanvasContext.clearRect(105, 0, 24, 2);
        this.drawImageOnGameCanvas(exitButtonImage, 105, 0);
        exitButtonHovered = false;
    }

    handleMouseGameCanvasClick(event) {
        var mousePos = getMousePos(gameCanvas, event);
        if (mousePos.x > 66 && mousePos.x < 104 && mousePos.y < 8) this.restartGame();
        if (mousePos.x > 104 && mousePos.y < 8) this.exitGame();
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