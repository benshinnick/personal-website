import React from 'react';
import './Stars.css';

const NUM_FRAMES = 12;
const ANIMATION_SPEED_MS = 750
const NUM_STARS = 9

export default class Stars extends React.Component {

    componentDidMount() {
        for(var i = 0; i < NUM_STARS; ++i) {
            this.startAnimation(i+1)
        }
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
        if (starNum === 1) return 900
        else if (starNum === 2) return 804
        else if (starNum === 3) return 1068
        else if (starNum === 4) return 528
        else if (starNum === 5) return 816
        else if (starNum === 6) return 720
        else if (starNum === 7) return 528
        else if (starNum === 8) return 900
        else if (starNum === 9) return 528
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
                <div className='sprite star' id='star-8'></div>
                <div className='sprite star' id='star-9'></div>
            </div>
        );
    }
}