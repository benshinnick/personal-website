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