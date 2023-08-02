import React from 'react';
import './MinesweeperGame.css';

export default class MinesweeperGame extends React.Component {
    componentDidMount() {
        console.log('MINESWEEPER GAME LOADED');
        document.getElementById('main-content').style.overflowY = 'hidden';
        document.getElementById('main-content').style.height = '100vh';

        var canvas = document.getElementById('minesweeper-game-canvas');
        canvas.width = 188;
        canvas.height = 176;
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
                <div id='minesweeper-game-container'>
                    <canvas id='minesweeper-game-canvas' onClick={() => {this.exitGame()}}/>
                </div>
            </div>
        );
    }
}