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
        img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIEAAABpBAMAAADvmV2MAAAAAXNSR0IArs4c6QAAAA9QTFRFAAAAAAAAAND//wAA////P19WfwAAAAF0Uk5TAEDm2GYAAAHxSURBVFjD7VnLjeMwFNMhDTDDBuwODDcgIuy/pj3In2eNJ/ZGBmYX8DsIgqTQFB/pAElKh+W6clw6/nx6CFU5LDGfQIBFw7JYJnyAJmRZOIUgEgQIkRDBB4gyw2kEwyDsBaEsnEWwCEAsUJ9yoLe3KDqcRaiLcSmnh5tKOXmDjre1s82cVK403+vZd30/jbTsabQBEBxBwaDAspGTCEoiCYHo0HXPrkfXPTtDosooCQPxGgeRkAgSEFA4UDYFi+hCKRZe40CMK0LxJ3ISysrKoZ9pLAQMSQIiAgEIxKyDuOqwSLGIUEaA+Fp0IFYOTb1ATm6sisMHlZOu9eTfV/Fk5bywHbaqY8skJyk6DxtZ4tbGoOF8Tqpqg3CiCocV/xsH79GI53OSHaXYIGy31jGev8QPDM9d5vODDvBp5SSHuy/zSQEcIHjuRRS/6sJ7hKkXDAhUdMIhB7H0Ioq/duG7RXduYVyUzR0DHHZhOV/rgP2A/KjDXi9OdmHiwNoP+iEg7zlUngyv5hPvl/ZeDHUuPkMw1OiHk7K/Q6Au9ORnCNfm4rd0aO9Fux+aPHlRLyoOHFt1eI1DYy/GDxDYilB58mu8c3Hn4pd1uL8v7lzcubhzcefizsWdizsX/2Mu3MxB/0IuLuhFo5Ltv9M2/n/h9AczoowZkAGMQwAAAABJRU5ErkJggg=='
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