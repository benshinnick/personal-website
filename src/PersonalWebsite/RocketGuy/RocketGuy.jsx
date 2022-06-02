import React from 'react';
import './RocketGuy.css';

const ANIMATION_SPEED_MS = 75
const SPRITE_WIDTH_PX = 80
const STARTING_SCROLL_Y_POS = 450
const NUM_ANIMATION_FRAMES = 4

var lastScrollYPos = STARTING_SCROLL_Y_POS
var timer = null
// var isSwitchingSwitchingFlyUp = false
// var isSwitchingSwitchingFlyDown = false

export default class RocketGuy extends React.Component {

    constructor(props) {
        super(props);
        this.currAnimationInterval = -1
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        this.switchAnimation('idle', NUM_ANIMATION_FRAMES)
        window.addEventListener('scroll', this.handleScroll)
        window.scrollTo(0, STARTING_SCROLL_Y_POS);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    switchAnimation(name, frameCount) {
        this.switchSpriteImage(name)
        var spriteSheet = getRocketGuyElement()
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
        getRocketGuyElement().className = `sprite ${name}`
    }

    stopCurrentAnimation() {
        clearInterval(this.currAnimationInterval)
    }

    switchToFlyingAnimation(direction) {
        if(this.isReadyToSwitchAnimation()) {
            // if(isMidFlying(getRocketGuyElement()))
            //     this.switchAnimation(`fly-${direction}-build-switch-mid`, NUM_ANIMATION_FRAMES)
            // else
                this.switchAnimation(`fly-${direction}-build`, NUM_ANIMATION_FRAMES)
            setTimeout(() => {
                this.switchAnimation(`fly-${direction}-sustain`, NUM_ANIMATION_FRAMES)
            }, 4 * ANIMATION_SPEED_MS)
        }
        else setTimeout(() => { this.switchToFlyingAnimation(direction) }, ANIMATION_SPEED_MS)
    }

    switchToStoppingAnimation() {
        if(this.isReadyToSwitchAnimation()) {
            const direction = isFlyingUpAnimated(getRocketGuyElement()) ? 'up' : 'down'
            this.switchAnimation(`fly-${direction}-stop`, NUM_ANIMATION_FRAMES)
            setTimeout(() => {
                this.switchAnimation(`idle`, NUM_ANIMATION_FRAMES)
            }, 4 * ANIMATION_SPEED_MS)
        }
        else setTimeout(() => { this.switchToStoppingAnimation() }, ANIMATION_SPEED_MS)
    }

    isReadyToSwitchAnimation() {
        return document.querySelector('#rocket-guy').style.backgroundPosition === `-${SPRITE_WIDTH_PX}px 0px`
    }

    handleScroll() {
        var rocketGuy = getRocketGuyElement()
        var currScrollYPos = window.scrollY
        var spriteYPos = currScrollYPos/2.5

        // Todo: switch flying direction mid flight
        if(lastScrollYPos > currScrollYPos)
            if(!isFlyingUpAnimated(rocketGuy))
                    this.switchToFlyingAnimation('up')
        if(lastScrollYPos < currScrollYPos)
            if(!isFlyingDownAnimated(rocketGuy)) 
                this.switchToFlyingAnimation('down')

        if(timer !== null) clearTimeout(timer)       
        timer = setTimeout(() => {
            this.switchToStoppingAnimation()
        }, 500);

        rocketGuy.style.marginTop = `${spriteYPos}px`
        lastScrollYPos = currScrollYPos
        // console.log(`scrolling currScrollYPos ${currScrollYPos}`)
    }

    render() {
        return (
            <canvas width="16" height="16" className='sprite' id='rocket-guy'></canvas>
        );
    }
}

function getRocketGuyElement() {
    return document.querySelector('#rocket-guy')
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

// function isMidFlying(rocketGuy) {
//     return rocketGuy.classList.contains('fly-down-build')
//         || rocketGuy.classList.contains('fly-down-sustain')
//         // || rocketGuy.classList.contains('fly-up-build')
//         // || rocketGuy.classList.contains('fly-up-sustain')
// }
