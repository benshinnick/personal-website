import React from 'react';
import './Stars.css';

const NUM_FRAMES = 12;
const ANIMATION_SPEED_MS = 200

export default class Stars extends React.Component {

    componentDidMount() {
        this.startAnimation(1)
        this.startAnimation(2)
        this.startAnimation(3)
    }

    startAnimation(starNum) {
        // I have to animate this way instead of css for browser reasons
        var star = document.getElementById(`star-${starNum}`)
        var spriteWidth = this.getSpriteSheetWidth(starNum) / NUM_FRAMES
        var position = spriteWidth

        this.currAnimationInterval = setInterval(() => {
            star.style.backgroundPosition = `-${position}px 0px`
            if (position < spriteWidth * NUM_FRAMES)
                position += spriteWidth
            else
                position = spriteWidth
        }, ANIMATION_SPEED_MS);
    }

    getSpriteSheetWidth(starNum) {
        if(starNum === 1) return 900
        else if (starNum === 2) return 804
        else if (starNum === 3) return 612
    }

    render() {
        return (
            <div id='stars'>
                <div className='sprite star' id='star-1'></div>
                <div className='sprite star' id='star-2'></div>
                <div className='sprite star' id='star-3'></div>
            </div>
        );
    }
}