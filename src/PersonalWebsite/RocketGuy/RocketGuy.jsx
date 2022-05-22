import React from 'react';
import './RocketGuy.css';

const ANIMATION_SPEED_MS = 100
const SPRITE_WIDTH_PX = 128
const STARTING_SCROLL_Y_POS = 450

var lastScrollYPos = STARTING_SCROLL_Y_POS
var timer = null

export default class RocketGuy extends React.Component {

    constructor(props) {
        super(props);
        this.currAnimationInterval = -1
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this.switchAnimation('idle', 4)
        window.addEventListener('scroll', this.handleScroll)
        window.scrollTo(0, STARTING_SCROLL_Y_POS);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    switchAnimation(name, frameCount) {
        this.switchSpriteImage(name)
        var spriteSheet = document.querySelector('#rocket-guy')
        var position = SPRITE_WIDTH_PX

        this.currAnimationInterval = setInterval(() => {
            spriteSheet.style.backgroundPosition = `-${position}px 0px`
            if (position < SPRITE_WIDTH_PX * frameCount)
                position += SPRITE_WIDTH_PX
            else
                position = SPRITE_WIDTH_PX
        }, ANIMATION_SPEED_MS);
    }

    switchSpriteImage(name) {
        this.stopCurrentAnimation();
        document.querySelector('#rocket-guy').className = `sprite ${name}`
    }

    stopCurrentAnimation() {
        clearInterval(this.currAnimationInterval)
    }

    switchToFlyingAnimation(direction) {
        if(this.isReadyToSwitchAnimation()) {
            this.switchAnimation(`fly-${direction}-build`, 4)
            setTimeout(() => {
                this.switchAnimation(`fly-${direction}-sustain`, 4)
            }, 4 * ANIMATION_SPEED_MS)
        }
        else setTimeout(() => { this.switchToFlyingAnimation(direction) }, ANIMATION_SPEED_MS)
    }

    switchToStoppingAnimation(direction) {
        if(this.isReadyToSwitchAnimation()) {
            this.switchAnimation(`fly-${direction}-stop`, 4)
            setTimeout(() => {
                this.switchAnimation(`idle`, 4)
            }, 4 * ANIMATION_SPEED_MS)
        }
        else setTimeout(() => { this.switchToStoppingAnimation(direction) }, ANIMATION_SPEED_MS)
    }

    isReadyToSwitchAnimation() {
        return document.querySelector('#rocket-guy').style.backgroundPosition === `-${SPRITE_WIDTH_PX}px 0px`
    }

    handleScroll() {
        var rocketGuy = document.querySelector('#rocket-guy')
        var currScrollYPos = window.scrollY
        var spriteYPos = currScrollYPos/2.5

        if(lastScrollYPos > currScrollYPos)
            if(!isFlyingUpAnimated(rocketGuy)) 
                this.switchToFlyingAnimation('up')
        if(lastScrollYPos < currScrollYPos)
            if(!isFlyingDownAnimated(rocketGuy)) 
                this.switchToFlyingAnimation('down')

        if(timer !== null) clearTimeout(timer);        
        timer = setTimeout(() => {
            if(isFlyingUpAnimated(rocketGuy))
                this.switchToStoppingAnimation('up')
            if(isFlyingDownAnimated(rocketGuy))
                this.switchToStoppingAnimation('down')
        }, 400);

        document.querySelector('#rocket-guy').style.marginTop = `${spriteYPos}px`
        lastScrollYPos = currScrollYPos
        // console.log(`scrolling currScrollYPos ${currScrollYPos}`)
    }

    render() {
        return (
            <canvas width="16" height="16" className='sprite' id='rocket-guy'></canvas>
        );
    }
}

function isFlyingUpAnimated(rocketGuy) {
    return rocketGuy.classList.contains('fly-up-build')
        || rocketGuy.classList.contains('fly-up-sustain')
        || rocketGuy.classList.contains('fly-up-stop')
}

function isFlyingDownAnimated(rocketGuy) {
    return rocketGuy.classList.contains('fly-down-build')
        || rocketGuy.classList.contains('fly-down-sustain')
        || rocketGuy.classList.contains('fly-down-stop') 
}