import React from 'react';
import './ExtraPage.css';
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

    componentWillUnmount() {
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
                                <input type="text" id="password-input" name="password"></input>
                                <input type="submit" id="password-submit-input" value="Enter"></input>
                            </div>
                        </div>
                    </div>
                    <div id='game-selection-container'>
                        <div className='game-selection' id='snake-game-selection'>
                            <div id='snake-game-cart' className='sprite'></div>
                            <div id='snake-label' className='game-selection-text'>SNAKE</div>
                        </div>
                        <div className='game-selection' id='tetris-game-selection'>
                            <div id='tetris-game-cart' className='sprite'></div>
                            <div id='tetris-label' className='game-selection-text'>TETRIS</div>
                        </div>
                        <div className='game-selection' id='minesweeper-game-selection'>
                            <div id='minesweeper-game-cart' className='sprite'></div>
                            <div id='minesweeper-label' className='game-selection-text'>MINESWEEPER</div>
                        </div>
                    </div>
                    <div id='password-clue'>Password Segments Unlocked (0/3)</div>
                </div>
            </main>
        );
    }
}