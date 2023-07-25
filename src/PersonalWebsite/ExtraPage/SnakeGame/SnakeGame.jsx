import React from 'react';
import './SnakeGame.css';

export default class SnakeGame extends React.Component {
    componentDidMount() {
        console.log('SNAKE GAME LOADED');
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
                <div id='snake-game-container'>
                    <div id='game-close-button' onClick={() => {this.exitGame()}}>EXIT</div>
                    <canvas id='snake-game-canvas'/>
                </div>
            </div>
        );
    }
}