import React from 'react';
// import './TetraMixGame.css';

export default class TetraMixGame extends React.Component {
    componentDidMount() {
        console.log('TETRA MIX GAME LOADED');
    }

    render() {
        return (
            <canvas id='tetra-mix-game-canvas'/>
        );
    }
}