import React from 'react';
import './ExtraPage.css';

export default class TechnicalPage extends React.Component {
    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <main className='extra-page'>
                <div className='fill'>
                    <div id='computer-layout' className='sprite'/>
                    <div id='game-selection-container'>
                        <div className='game-selection'>
                            <div id='snake-game-cart' className='sprite'></div>
                            <div className='game-selection-text'>SNAKE</div>
                        </div>
                        <div className='game-selection'>
                            <div id='tetris-game-cart' className='sprite'></div>
                            <div className='game-selection-text'>TETRIS</div>
                        </div>
                        <div className='game-selection'>
                            <div id='minesweeper-game-cart' className='sprite'></div>
                            <div className='game-selection-text'>MINESWEEPER</div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}