import React from 'react';
import './ExtraPage.css';
import './PasswordScreen.css';
import './TitleScreens.css';
import * as vt from './vanilla-tilt.js';

var selectedGame = 'none'

export default class TechnicalPage extends React.Component {
    componentDidMount() {
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
        passwordClue.innerHTML = 'Password Sections Unlocked (0/3)'
        passwordInputContainer.appendChild(passwordClue)

        document.getElementById('computer-screen').appendChild(passwordInputContainer)
    }

    loadSnakeTitleScreen() {
        this.clearComputerScreen();

        var snakeTitleScreenContainer = document.createElement('div')
        snakeTitleScreenContainer.className = 'computer-screen-container'

        var titleBanner = document.createElement('div')
        titleBanner.className = 'title-banner'
        titleBanner.id = 'snake-title-banner'
        snakeTitleScreenContainer.appendChild(titleBanner)

        var titleLabel = document.createElement('div')
        titleLabel.className = 'game-title'
        titleLabel.innerHTML = 'SNAKE'
        snakeTitleScreenContainer.appendChild(titleLabel)

        var playButton = document.createElement('div')
        playButton.id = 'snake-play-button'
        playButton.className = 'game-play-button'
        playButton.innerHTML = 'PLAY'
        snakeTitleScreenContainer.appendChild(playButton)

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

        snakeTitleScreenContainer.appendChild(iconContainer)

        document.getElementById('computer-screen').appendChild(snakeTitleScreenContainer)
    }

    loadTetraMixTitleScreen() {
        this.clearComputerScreen();

        var tetraMixTitleScreenContainer = document.createElement('div')
        tetraMixTitleScreenContainer.className = 'computer-screen-container'

        var titleLabel = document.createElement('div')
        titleLabel.id = 'password-label'
        titleLabel.innerHTML = 'TETRA MIX'
        tetraMixTitleScreenContainer.appendChild(titleLabel)

        document.getElementById('computer-screen').appendChild(tetraMixTitleScreenContainer)
    }

    loadMinesweeperTitleScreen() {
        this.clearComputerScreen();

        var minesweeperTitleScreenContainer = document.createElement('div')
        minesweeperTitleScreenContainer.className = 'computer-screen-container'

        var titleLabel = document.createElement('div')
        titleLabel.id = 'password-label'
        titleLabel.innerHTML = 'MINESWEEPER'
        minesweeperTitleScreenContainer.appendChild(titleLabel)

        document.getElementById('computer-screen').appendChild(minesweeperTitleScreenContainer)
    }

    passwordSubmitButtonOnClick() {
        console.log("password submit button was clicked")
        document.getElementById("password-input").style.animation = "horizontal-shaking linear 150ms"
        setTimeout(() => {
            document.getElementById("password-input").style.animation = ""
        }, 150);
    }

    handleGameSelection(game) {
        document.getElementById('inserted-game-cart').style.animation = '';
        if(selectedGame === game) {
            this.loadPasswordScreen()
            document.getElementById(`${game}-game-selection`).className = 'game-selection'
            document.getElementById(`${game}-label`).innerHTML = game.toUpperCase().replace('-',' ')
            selectedGame = 'none'
            document.getElementById('inserted-game-cart').style.animation = 'eject-cart forwards ease-in-out 650ms'
            return
        }
        if(game === 'snake') this.loadSnakeTitleScreen()
        if(game === 'tetra-mix') this.loadTetraMixTitleScreen()
        if(game === 'minesweeper') this.loadMinesweeperTitleScreen()

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
        // document.getElementById('inserted-game-cart').style.animation = 'insert-cart forwards ease-in-out 650ms'
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