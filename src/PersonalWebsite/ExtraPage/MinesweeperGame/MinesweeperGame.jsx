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