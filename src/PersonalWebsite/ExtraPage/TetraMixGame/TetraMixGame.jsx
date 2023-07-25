import React from 'react';
import './TetraMixGame.css';

export default class TetraMixGame extends React.Component {
    componentDidMount() {
        console.log('TETRA MIX GAME LOADED');
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
                <div id='tetra-mix-game-container'>
                    <div id='game-close-button' onClick={() => {this.exitGame()}}>EXIT</div>
                    <canvas id='tetra-mix-game-canvas'/>
                </div>
            </div>
        );
    }
}