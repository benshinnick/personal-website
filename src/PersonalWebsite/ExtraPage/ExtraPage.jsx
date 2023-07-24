import React from 'react';
import { createRoot } from 'react-dom/client';
import SnakeGame from './SnakeGame/SnakeGame';
import TetraMixGame from './TetraMixGame/TetraMixGame';
import MinesweeperGame from './MinesweeperGame/MinesweeperGame';
import './ExtraPage.css';
import './PasswordScreen.css';
import './TitleScreens.css';
import * as vt from './vanilla-tilt.js';

var selectedGame = 'none';
var gameCanvas = null;

export default class TechnicalPage extends React.Component {
    constructor(props) {
        super(props)
        this.handleGameUnmount = this.handleGameUnmount.bind(this);
    }
    handleGameUnmount(){
        console.log('Handle Game Unmount')
        gameCanvas.render(<></>)
    }

    componentDidMount() {
        if(window.innerWidth >= 850) {
            vt.VanillaTilt.init(document.querySelector("#snake-game-selection"), {
                max: 14,
                speed: 8
            });
            vt.VanillaTilt.init(document.querySelector("#tetra-mix-game-selection"), {
                max: 14,
                speed: 8
            });
            vt.VanillaTilt.init(document.querySelector("#minesweeper-game-selection"), {
                max: 14,
                speed: 8
            });
        }
        this.loadPasswordScreen()
    }

    clearComputerScreen() {
        document.getElementById('computer-screen').innerHTML = '';
    }

    loadPasswordScreen() {
        this.clearComputerScreen();

        var passwordInputContainer = document.createElement('div')
        passwordInputContainer.className = 'computer-screen-container'

        var passwordLabel = document.createElement('div')
        passwordLabel.id = 'password-label'
        passwordLabel.innerHTML = 'Password: '
        passwordInputContainer.appendChild(passwordLabel)

        var passwordInput = document.createElement('input')
        passwordInput.id = 'password-input'
        passwordInput.type = 'text'
        passwordInput.name = 'password'
        passwordInput.autocomplete = 'off'
        passwordInputContainer.appendChild(passwordInput)

        var passwordSubmitButton = document.createElement('div')
        passwordSubmitButton.id = 'password-submit-button'
        passwordSubmitButton.addEventListener("click", (event) => { this.passwordSubmitButtonOnClick(); });

        var topLeftCorner = document.createElement('div')
        topLeftCorner.className = 'corner'
        topLeftCorner.id = 'submit-top-left-corner'
        var topRightCorner = document.createElement('div')
        topRightCorner.className = 'corner'
        topRightCorner.id = 'submit-top-right-corner'
        var bottomRightCorner = document.createElement('div')
        bottomRightCorner.className = 'corner'
        bottomRightCorner.id = 'submit-bottom-right-corner'
        var bottomLeftCorner = document.createElement('div')
        bottomLeftCorner.className = 'corner'
        bottomLeftCorner.id = 'submit-bottom-left-corner'
        passwordSubmitButton.appendChild(topLeftCorner)
        passwordSubmitButton.appendChild(topRightCorner)
        passwordSubmitButton.appendChild(bottomRightCorner)
        passwordSubmitButton.appendChild(bottomLeftCorner)

        var topBorder = document.createElement('div')
        topBorder.className = 'submit-border'
        topBorder.id = 'submit-top-border'
        passwordSubmitButton.appendChild(topBorder)

        var enterInput = document.createElement('input')
        enterInput.type = 'submit'
        enterInput.id = 'password-submit-input'
        enterInput.value = 'Enter'
        passwordSubmitButton.appendChild(enterInput)

        var bottomBorder = document.createElement('div')
        bottomBorder.className = 'submit-border'
        bottomBorder.id = 'submit-bottom-border'
        passwordSubmitButton.appendChild(bottomBorder)

        passwordInputContainer.appendChild(passwordSubmitButton)

        var passwordClue = document.createElement('div')
        passwordClue.id = 'password-clue'
        passwordClue.innerHTML = 'Passwords Unlocked (0/3)'
        passwordInputContainer.appendChild(passwordClue)

        var time = document.createElement('div')
        time.id = 'time'
        passwordInputContainer.appendChild(time)

        document.getElementById('computer-screen').appendChild(passwordInputContainer)

        startTime()
    }

    loadGameTitleScreen(game) {
        this.clearComputerScreen();

        var gameTitleScreenContainer = document.createElement('div')
        gameTitleScreenContainer.className = `computer-screen-container ${game}-title-screen`

        var titleBanner = document.createElement('div')
        titleBanner.className = 'title-banner'
        titleBanner.id = `${game}-title-banner`
        gameTitleScreenContainer.appendChild(titleBanner)

        var titleLabel = document.createElement('div')
        titleLabel.className = 'game-title'
        titleLabel.innerHTML = `${game.toUpperCase().replace("-"," ")}`
        gameTitleScreenContainer.appendChild(titleLabel)

        var playButton = document.createElement('div')
        playButton.id = `${game}-play-button`
        playButton.className = 'game-play-button'
        playButton.innerHTML = 'PLAY'
        playButton.addEventListener('click', () => { this.loadGame(game) })
        gameTitleScreenContainer.appendChild(playButton)

        var iconContainer = document.createElement('div')
        iconContainer.className = 'game-icon-conatainer'

        var settingsButton = document.createElement('div')
        settingsButton.className = 'settings-button'
        var settingsButtonTooltip = document.createElement('div')
        settingsButtonTooltip.className = 'icon-tooltip'
        settingsButtonTooltip.innerHTML = "settings"
        settingsButton.appendChild(settingsButtonTooltip)
        iconContainer.appendChild(settingsButton)

        var highScoresButton = document.createElement('div')
        highScoresButton.className = 'high-scores-button'
        var highScoresButtonTooltip = document.createElement('div')
        highScoresButtonTooltip.className = 'icon-tooltip'
        highScoresButtonTooltip.innerHTML = "high<br></br>scores"
        highScoresButton.appendChild(highScoresButtonTooltip)
        iconContainer.appendChild(highScoresButton)

        gameTitleScreenContainer.appendChild(iconContainer)

        document.getElementById('computer-screen').appendChild(gameTitleScreenContainer)
    }

    loadGame(game) {
        const mainContent = document.getElementById("game-container")
        if(gameCanvas === null) gameCanvas = createRoot(mainContent)
        if(game === 'snake') gameCanvas.render(<SnakeGame unmountMe={this.handleGameUnmount} />)
        if(game === 'tetra-mix') gameCanvas.render(<TetraMixGame unmountMe={this.handleGameUnmount} />)
        if(game === 'minesweeper') gameCanvas.render(<MinesweeperGame unmountMe={this.handleGameUnmount} />)
    }

    passwordSubmitButtonOnClick() {
        document.getElementById("password-input").style.animation = "horizontal-shaking linear 150ms"
        setTimeout(() => {
            document.getElementById("password-input").style.animation = ""
        }, 150);
    }

    handleGameSelection(game) {
        // clear timeouts
        var id = setTimeout(function() {}, 0)
        while (id--) clearTimeout(id)
        // insert cart and load screen;
        document.getElementById('inserted-game-cart').style.animation = '';
        if(selectedGame === game) {
            this.loadPasswordScreen()
            document.getElementById(`${game}-game-selection`).className = 'game-selection'
            document.getElementById(`${game}-label`).innerHTML = game.toUpperCase().replace('-',' ')
            selectedGame = 'none'
            document.getElementById('inserted-game-cart').style.animation = 'eject-cart forwards ease-in-out 650ms'
            return
        }
        this.loadGameTitleScreen(game)

        document.getElementById('inserted-game-cart').className = ''
        if(selectedGame === 'none') {
            document.getElementById(`${game}-game-selection`).className = 'game-selection-ejected'
            document.getElementById(`${game}-label`).innerHTML = 'EJECT'
            selectedGame = game
        }
        else {
            document.getElementById(`${selectedGame}-game-selection`).className = 'game-selection'
            document.getElementById(`${selectedGame}-label`).innerHTML = selectedGame.toUpperCase().replace('-',' ')
            document.getElementById(`${game}-game-selection`).className = 'game-selection-ejected'
            document.getElementById(`${game}-label`).innerHTML = 'EJECT'
            selectedGame = game
        }
        setTimeout(() => {
            document.getElementById('inserted-game-cart').className = `${game}-game-cart`
            document.getElementById('inserted-game-cart').style.animation = 'insert-cart forwards ease-in-out 650ms'
        }, 1)
    }

    render() {
        return (
            <main className='extra-page'>
                <div className='fill'>
                <div id='nav-bar-background'></div>
                    <div id='computer-layout' className='sprite'>
                        <div id='inserted-game-cart'></div>
                        <div id='computer-screen'></div>
                        <div id='bottom-border'></div>
                    </div>
                    <div id='game-selection-container'>
                        <div className='game-selection' id='snake-game-selection' onClick={() => this.handleGameSelection('snake')}>
                            <div id='snake-game-cart' className='sprite game-cart snake-game-cart'></div>
                            <div id='snake-label' className='game-selection-label'>SNAKE</div>
                        </div>
                        <div className='game-selection' id='tetra-mix-game-selection' onClick={() => this.handleGameSelection('tetra-mix')}>
                            <div id='tetra-mix-game-cart' className='sprite game-cart tetra-mix-game-cart'></div>
                            <div id='tetra-mix-label' className='game-selection-label'>TETRA MIX</div>
                        </div>
                        <div className='game-selection' id='minesweeper-game-selection' onClick={() => this.handleGameSelection('minesweeper')}>
                            <div id='minesweeper-game-cart' className='sprite game-cart minesweeper-game-cart'></div>
                            <div id='minesweeper-label' className='game-selection-label'>MINESWEEPER</div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

function checkTime(i) {
    return (i < 10) ? "0" + i : i;
}

function startTime() {
    var dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var today = new Date();
    var d = checkTime(today.getDay());
    var h = checkTime(today.getHours());
    var m = checkTime(today.getMinutes());
    var s = checkTime(today.getSeconds());
    document.getElementById('time').innerHTML = dayOfWeek[parseInt(d)] + " " + h + ":" + m + ":" + s;
    setTimeout(function () {
        startTime()
    }, 500);
}