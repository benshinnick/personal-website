import React from 'react';
import './RocketGuy.css';

const ANIMATION_SPEED_MS = 125
const SPRITE_WIDTH_PX = 100

export default class RocketGuy extends React.Component {

    constructor(props) {
        super(props);
        this.currAnimationInterval = -1
    }

    componentDidMount() {
        this.switchAnimation('idle', 4)
        // this.switchAnimation('fly-up-build', 4)
        // this.switchAnimation('fly-up-sustain', 4)
        // this.switchAnimation('fly-up-stop', 4)
    }

    switchAnimation(name, frameCount) {
        this.switchSpriteImage(name)
        var spriteSheet = document.querySelector('#rocket-guy');
        var position = SPRITE_WIDTH_PX;

        this.currAnimationInterval = setInterval(() => {
            spriteSheet.style.backgroundPosition = `-${position}px 0px`;
            if (position < SPRITE_WIDTH_PX * frameCount)
                position += SPRITE_WIDTH_PX;
            else
                position = SPRITE_WIDTH_PX;
        }, ANIMATION_SPEED_MS);
    }

    switchSpriteImage(name) {
        this.stopAnimation();
        document.querySelector('#rocket-guy').className = `sprite ${name}`
    }

    stopAnimation() {
        clearInterval(this.currAnimationInterval);
    }

    render() {
        return (
            <div className='sprite' id='rocket-guy'></div>
        );
    }
}

window.onscroll = function() {
    console.log('scrolling');
};