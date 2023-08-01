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