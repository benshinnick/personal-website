import React from 'react';
// import './SnakeGame.css';

export default class SnakeGame extends React.Component {
    componentDidMount() {
        console.log('SNAKE GAME LOADED');
    }

    exitGame() {
        this.props.unmountMe();
    }

    render() {
        return (
            <div id='snake-game-container' className='game-background'>
                <div id='game-close-button' onClick={() => {this.exitGame()}}>EXIT</div>
                <canvas id='snake-game-canvas'/>
            </div>
        );
    }
}