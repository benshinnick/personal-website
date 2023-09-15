import React from 'react';
import './TetraMixGame.css';

export default class TetraMixGame extends React.Component {
    componentDidMount() {
        console.log('TETRA MIX GAME LOADED');
        document.getElementById('main-content').style.overflowY = 'hidden';
        document.getElementById('main-content').style.height = '100vh';

        var canvas = document.getElementById('tetra-mix-game-canvas');
        canvas.width = 133;
        canvas.height = 103;
        const ctx = canvas.getContext("2d");
        var img = new Image();
        img.onload = function(){
          ctx.drawImage(img,0,0);
        };
        // temporary to get idea down
        img.src = 'data:image/png;base64,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'
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
                    <canvas id='tetra-mix-game-canvas' onClick={() => {this.exitGame()}}/>
                </div>
            </div>
        );
    }
}