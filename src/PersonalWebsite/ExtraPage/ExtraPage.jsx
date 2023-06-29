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
        vt.VanillaTilt.init(document.querySelector("#tetris-game-selection"), {
            max: 14,
            speed: 8
        });
        vt.VanillaTilt.init(document.querySelector("#minesweeper-game-selection"), {
            max: 14,
            speed: 8
        });
    }

    // componentWillUnmount() {
    // }

    passwordSubmitButtonOnClick() {
        console.log("password submit button was clicked")
        document.getElementById("password-input").style.animation = "horizontal-shaking linear 150ms"
        setTimeout(() => {
            document.getElementById("password-input").style.animation = ""
        }, 150);
    }

    snakeGameSelected() {
        console.log("snake game was selected")
    }

    tetrisGameSelected() {
        console.log("tetris game was selected")
    }

    minesweeperGameSelected() {
        console.log("minesweeper game was selected")
    }

    render() {
        return (
            <main className='extra-page'>
                <div className='fill'>
                <div id='nav-bar-background'></div>
                    <div id='computer-layout' className='sprite'>
                        <div id='computer-screen'>
                            <div id="password-input-container">
                                <div id="password-label">Password: </div>
                                <input type="text" id="password-input" name="password" autoComplete="off"></input>
                                <div id="password-submit-button" onClick={() => this.passwordSubmitButtonOnClick()}>
                                    <div className="corner" id="submit-top-left-corner"></div>
                                    <div className="corner" id="submit-top-right-corner"></div>
                                    <div className="corner" id="submit-bottom-right-corner"></div>
                                    <div className="corner" id="submit-bottom-left-corner"></div>
                                    <div className="submit-border" id="submit-top-border"></div>
                                    <input type="submit" id="password-submit-input" value="Enter"></input>
                                    <div className="submit-border" id="submit-bottom-border"></div>
                                </div>
                                <div id='password-clue'>Password Sections Unlocked (0/3)</div>
                            </div>
                        </div>
                    </div>
                    <div id='game-selection-container'>
                        <div className='game-selection' id='snake-game-selection' onClick={() => this.snakeGameSelected()}>
                            <div id='snake-game-cart' className='sprite'></div>
                            <div id='snake-label' className='game-selection-text'>SNAKE</div>
                        </div>
                        <div className='game-selection' id='tetris-game-selection' onClick={() => this.tetrisGameSelected()}>
                            <div id='tetris-game-cart' className='sprite'></div>
                            <div id='tetris-label' className='game-selection-text'>TETRIS</div>
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