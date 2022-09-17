import React from 'react';
import './ShootingStars.css';

const SPRITE_SHEET_WIDTH = 1648
const NUM_FRAMES = 4;
const ANIMATION_SPEED_MS =  50

export default class ShootingStars extends React.Component {

    componentDidMount() {
        this.shootStars()
    }
    
    shootStars() {
        setInterval(() => {
            if (Math.random() < 0.65) {
                let newStar = document.createElement("div");
                newStar.classList.add('shooting-star')
                if (Math.random() < 0.5) {
                    newStar.style.top = `${randomIntFromInterval(-140, window.innerHeight)}px`
                    newStar.style.right = `${-412}px`
                } else {
                    newStar.style.top = `${-140}px`
                    newStar.style.right = `${randomIntFromInterval(-412, window.innerWidth)}px`
                }
                document.getElementById('shooting-stars').appendChild(newStar)
                this.startAnimation(newStar)
                setTimeout(() => { newStar.remove() }, 2000)
            }
        }, 650)
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
            <div id='shooting-stars'></div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}