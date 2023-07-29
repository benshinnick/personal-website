import React from 'react';
import './SnakeGame.css';

export default class SnakeGame extends React.Component {
    componentDidMount() {
        console.log('SNAKE GAME LOADED');
        document.getElementById('main-content').style.overflowY = 'hidden';
        document.getElementById('main-content').style.height = '100vh';

        var canvas = document.getElementById('snake-game-canvas');
        canvas.width = 129;
        canvas.height = 107;
        const ctx = canvas.getContext("2d");
        var img = new Image();
        img.onload = function(){
          ctx.drawImage(img,0,0); // Or at whatever offset you like
        };
        // temporary to get idea down
        img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIEAAABrCAYAAABQf+G0AAAAAXNSR0IArs4c6QAABBpJREFUeJztnO1y4yAMRS87fbo+cF9P+yMhK2MgdpYv1+fMZJpgGWMhA+ImDYLLYGY2uw0wmR5BYGb21bpSGIMPiBBCMDMLIYR4LJalNv5zfP9nVKOhPeFJ7Xjtb4SR4MLEJzsGg/98ph6C4ML4zs5NB0frYTq4MPakdtz/hV9Ar+zg1NwBc+GJhm4EoguGDjF3DbiV73u3Y3h2F+qoXTFdsZ+tc8J3yJZ9aF9qa1r2iX2tnneYmelpHqTd9XNtelcWy2t9VGyvP5ga+hQkl24cOba7+deHH5P07xU705fbz7Y8PVaxd223+NG1wZzJx/bObpeq2eOcrI9N2rze+fWoj3M2JVtfvtsn8Dcq5aMotYllucgsXfyf0U+5PHxvy8L3KfsQgkqXNzOlD+9Z+3jOyybp2CznNvMOk/q/1Ee5/thMB7WhLg2M1C6dFrxdlbSjpXwAePs0ECr2uY4tdegn9v6YH9pHUvN7PFbaXZSe2cGRTo3vz5SljdqNFqX5vMFaIRfI3gnpsZb2Kbun1I0ULdYEuVEgbVeu7FX+drhuyMhrrcTK921mxj4BrB2l0B9GAnhAENwbs8qOobTODtv/0jsbmOW3VvW8NoueaYbiKznhVRYrc2nKIXtf/szFh4xAve+rt32PelL/53YM06JXee5iZ+xr9fem5331tm9dT8ouCI42oNaQd/YzGHFfvex7+z9dE+ROCvYg2zhvd8Z+JCPvq7X9EP+PmpthTcwOZAetL9ii/jMr4FyQj8xMVqLkt6/UwK0quzTgf+uPq333+W39Ofu7UfPPZmFYW222oGX9hXm+ulq+OyX/ZLODKwTCmdVyzf5u5PxTzA56zJut6j/ytPv6e9/XVSj6gezg3myyg9GZgb/GkVV9ybZHW38jNb+l3zGMJ+y/CtaAT1f1aXtY7X9GyW9Z7aDng/XJqn4lDeLKuAdvU/4nNeo9sl5dg7gy0Wep776cQXHPuVEDit9iarH3DnVS/5Md3BjT9ocxw7UDWJPNN4uk/DdV4PeQ+5XUUO0A1mS4dgDrMVQ7gDXZpIgzGwLzGKYdwLrsFoZuv56FwU0Yrh3AegzXDmA9XkHg9HpSxJuR/Z9FcC+W0A7sMQ89rpnZ1oS+TNcOfABIe5UL+jNfO2AGmg7aAczXDoIU/BTAmmA8S2gHdPxc0A4A7QDQDkBoByC0AxDaAWgR7QDmMl07gPnM1w5gOmgHMF87gPksoR3AXNAOAO0A0A5AaAcgtAMQ2gEI7QCEdgBCOwChHYDQDkBoByC0AxDaAQjtAIR2AEI7AKEdgNAOQGgHILQDENoBCO0AhHYAQjsAoR2A0A5AaAcgtAMQ2gGokh1IBMVdSEeC13umhPuQzQ7gXmS1A7gXm21jvy5gPXAfyA5Age1h+AvIFaAf+EFDLQAAAABJRU5ErkJggg=='
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