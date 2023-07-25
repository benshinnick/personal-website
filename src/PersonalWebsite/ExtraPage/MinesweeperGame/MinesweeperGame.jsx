import React from 'react';
import './MinesweeperGame.css';

export default class MinesweeperGame extends React.Component {
    componentDidMount() {
        console.log('MINESWEEPER GAME LOADED');
        document.getElementById('main-content').style.overflowY = 'hidden';
        document.getElementById('main-content').style.height = '100vh';
    }

    componentWillUnmount() {
        document.getElementById('main-content').style.overflowY = '';
        document.getElementById('main-content').style.height = '';
    }

    exitGame() {
        this.props.unmountMe();
    }

    render() {
        return (
            <div className='game-background'>
                <div id='minesweeper-game-container'>
                    <div id='game-close-button' onClick={() => {this.exitGame()}}>EXIT</div>
                    <canvas id='minesweeper-game-canvas'/>
                </div>
            </div>
        );
    }
}