import React from 'react';
import './ExtraPage.css';
import './PasswordScreen.css'
import * as vt from './vanilla-tilt.js';

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

    // componentWillUnmount() {
    // }

    clearComputerScreen() {
        document.getElementById('computer-screen').innerHTML = '';
    }

    loadPasswordScreen() {
        this.clearComputerScreen();

        var passwordInputContainer = document.createElement('div')
        passwordInputContainer.id = 'password-input-container'

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
        snakeTitleScreenContainer.id = 'password-input-container'

        var titleLabel = document.createElement('div')
        titleLabel.id = 'password-label'
        titleLabel.innerHTML = 'SNAKE'
        snakeTitleScreenContainer.appendChild(titleLabel)

        document.getElementById('computer-screen').appendChild(snakeTitleScreenContainer)
    }

    loadTetraMixTitleScreen() {
        this.clearComputerScreen();

        var tetraMixTitleScreenContainer = document.createElement('div')
        tetraMixTitleScreenContainer.id = 'password-input-container'

        var titleLabel = document.createElement('div')
        titleLabel.id = 'password-label'
        titleLabel.innerHTML = 'TETRA MIX'
        tetraMixTitleScreenContainer.appendChild(titleLabel)

        document.getElementById('computer-screen').appendChild(tetraMixTitleScreenContainer)
    }

    loadMinesweeperTitleScreen() {
        this.clearComputerScreen();

        var minesweeperTitleScreenContainer = document.createElement('div')
        minesweeperTitleScreenContainer.id = 'password-input-container'

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

    snakeGameSelected() {
        console.log("snake game was selected")
        this.loadSnakeTitleScreen()
    }

    tetraMixGameSelected() {
        console.log("tetra mix game was selected")
        this.loadTetraMixTitleScreen()
    }

    minesweeperGameSelected() {
        console.log("minesweeper game was selected")
        this.loadMinesweeperTitleScreen()
    }

    render() {
        return (
            <main className='extra-page'>
                <div className='fill'>
                <div id='nav-bar-background'></div>
                    <div id='computer-layout' className='sprite'>
                        <div id='computer-screen'></div>
                    </div>
                    <div id='game-selection-container'>
                        <div className='game-selection' id='snake-game-selection' onClick={() => this.snakeGameSelected()}>
                            <div id='snake-game-cart' className='sprite'></div>
                            <div id='snake-label' className='game-selection-text'>SNAKE</div>
                        </div>
                        <div className='game-selection' id='tetra-mix-game-selection' onClick={() => this.tetraMixGameSelected()}>
                            <div id='tetra-mix-game-cart' className='sprite'></div>
                            <div id='tetra-mix-label' className='game-selection-text'>TETRA MIX</div>
                        </div>
                        <div className='game-selection' id='minesweeper-game-selection' onClick={() => this.minesweeperGameSelected()}>
                            <div id='minesweeper-game-cart' className='sprite'></div>
                            <div id='minesweeper-label' className='game-selection-text'>MINESWEEPER</div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}