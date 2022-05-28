import React from 'react';
import './Stars.css';

const NUM_FRAMES = 12;
const ANIMATION_SPEED_MS = 500

export default class Stars extends React.Component {

    componentDidMount() {
        this.startAnimation(1)
        this.startAnimation(2)
        this.startAnimation(3)
        this.startAnimation(4)
        this.startAnimation(5)
        this.startAnimation(6)
        this.startAnimation(7)
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
        else if (starNum === 4) return 240
        else if (starNum === 5) return 912
        else if (starNum === 6) return 1068
        else if (starNum === 7) return 432
    }

    render() {
        return (
            <div id='stars'>
                <div className='sprite star' id='star-1'></div>
                <div className='sprite star' id='star-2'></div>
                <div className='sprite star' id='star-3'></div>
                <div className='sprite star' id='star-4'></div>
                <div className='sprite star' id='star-5'></div>
                <div className='sprite star' id='star-6'></div>
                <div className='sprite star' id='star-7'></div>
            </div>
        );
    }
}