import React from 'react';
import './SnakeGame.css';

export default class SnakeGame extends React.Component {
    componentDidMount() {
        console.log('SNAKE GAME LOADED');
        document.getElementById('main-content').style.overflowY = 'hidden';
        document.getElementById('main-content').style.height = '100vh';

        var canvas = document.getElementById('snake-game-canvas');
        canvas.width = 129;
        canvas.height = 105;
        const ctx = canvas.getContext("2d");
        var img = new Image();
        img.onload = function(){
          ctx.drawImage(img,0,0); // Or at whatever offset you like
        };
        // temporary to get idea down
        img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIEAAABpBAMAAADvmV2MAAAAAXNSR0IArs4c6QAAAA9QTFRFAAAAAAAAAND//wAA////P19WfwAAAAF0Uk5TAEDm2GYAAAHPSURBVFjD7VnLbcMwFNOhCzDlAvIGhhcQkbf/TD3Itp5VN0klA2kBvYNgRApD8+MASQgtY2Wa3h8+hG2Y2hBAI2QyoRkBhAiiHcFg6EO4gAMhUwdCmRQ+rGuUgjk8EA/nZJspKN/Sdl+3KU7TutJktq5mAAguoGCgwLyRgghKIgmBiIjxFifEeIsGicqrJMzEfZlFQiJIQEDmQJlRMBHRjfzgvszEUhBEgwkpCPmVwmHaaOwEDJIEeAQCEIhNB7HosEuxi5BXgPjcdSAKhy4vkIJ1TsWhYVLQtZn8/eRMVslz226rOrZfpCD55OEgi986BNSdT0HVHBBemMyh4H/jYGc0/PkUZOalOCAct8rqz1+SB7rP3a+3D3qCT1MKMnfv+/WqAJ4g2OaFF79y4THC6gUdAuWT8JSDmL3w4hcXvkf05C4MF3XzJABPXdjP1zrgvCA/6nDmxYsurBxY50E/FOQxhyqT7tH8wvOl34u57kUbgkGdeXhR9kcI1IWZbEO4thfv0qHfi/48dGXyIi8qDlx6dbgvc6cXSwMCexGqTH4uoxejF2/WYXxfjF6MXoxejF6MXoxejF78x15YNwf9hV5c4EWnkv2/03b+f2HhCwtmeEsDV9gkAAAAAElFTkSuQmCC'
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
                    <canvas id='snake-game-canvas' onClick={() => {this.exitGame()}}/>
                </div>
            </div>
        );
    }
}