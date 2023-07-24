import React from 'react';
// import './MinesweeperGame.css';

export default class MinesweeperGame extends React.Component {
    componentDidMount() {
        console.log('MINESWEEPER GAME LOADED');
    }

    exitGame() {
        this.props.unmountMe();
    }

    render() {
        return (
            <div id='minesweeper-game-container' className='game-background'>
                <div id='game-close-button' onClick={() => {this.exitGame()}}>EXIT</div>
                <canvas id='minesweeper-game-canvas'/>
            </div>
        );
    }
}