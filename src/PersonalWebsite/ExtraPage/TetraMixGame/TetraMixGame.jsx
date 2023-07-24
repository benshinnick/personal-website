import React from 'react';
// import './TetraMixGame.css';

export default class TetraMixGame extends React.Component {
    componentDidMount() {
        console.log('TETRA MIX GAME LOADED');
    }

    exitGame() {
        this.props.unmountMe();
    }

    render() {
        return (
            <div id='tetra-mix-game-container' className='game-background'>
                <div id='game-close-button' onClick={() => {this.exitGame()}}>EXIT</div>
                <canvas id='tetra-mix-game-canvas'/>
            </div>
        );
    }
}