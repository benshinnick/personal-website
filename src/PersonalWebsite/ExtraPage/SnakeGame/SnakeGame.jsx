import React from 'react';
// import './SnakeGame.css';

export default class SnakeGame extends React.Component {
    componentDidMount() {
        console.log('SNAKE GAME LOADED');
    }

    render() {
        return (
            <canvas id='snake-game-canvas'/>
        );
    }
}