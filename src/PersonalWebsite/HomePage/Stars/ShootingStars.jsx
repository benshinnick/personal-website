import React from 'react';
import './ShootingStars.css';

const SPRITE_SHEET_WIDTH = 1648
const NUM_FRAMES = 4;
const ANIMATION_SPEED_MS =  100

export default class ShootingStars extends React.Component {

    componentDidMount() {
        this.startAnimation(document.getElementById('shooting-star-1'))
    }

    startAnimation(star) {
        var spriteWidth = SPRITE_SHEET_WIDTH / NUM_FRAMES
        var position = spriteWidth

        this.currAnimationInterval = setInterval(() => {
            star.style.backgroundPosition = `-${position}px 0px`
            if (position < spriteWidth * NUM_FRAMES)
                position += spriteWidth
            else
                position = spriteWidth
        }, ANIMATION_SPEED_MS);
    }

    render() {
        return (
            <div id='shooting-stars'>
                <div id='shooting-star-1' className='shooting-star sprite'></div>
            </div>
        );
    }
}