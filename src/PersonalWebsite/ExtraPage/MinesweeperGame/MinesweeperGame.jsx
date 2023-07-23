import React from 'react';
// import './MinesweeperGame.css';

export default class MinesweeperGame extends React.Component {
    componentDidMount() {
        console.log('MINESWEEPER GAME LOADED');
    }

    render() {
        return (
            <canvas id='minesweeper-game-canvas'/>
        );
    }
}