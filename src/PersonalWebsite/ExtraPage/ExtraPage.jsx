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
                </div>
                <div id='game-selection-container'>
                    <div id='snake-game-cart'></div>
                    <div id='tetris-game-cart'></div>
                    <div id='minesweeper-game-cart'></div>
                </div>
            </main>
        );
    }
}