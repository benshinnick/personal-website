import React from 'react';
import './RocketGuy.css';

const ANIMATION_SPEED_MS = 75
const SPRITE_WIDTH_PX = 80
const STARTING_SCROLL_Y_POS = 450
const NUM_ANIMATION_FRAMES = 4

var lastScrollYPos = STARTING_SCROLL_Y_POS
var timer = null
var topOffset = 50
var percentageScrollingOn = false

export default class RocketGuy extends React.Component {

    constructor(props) {
        super(props);
        this.currAnimationInterval = -1
    }

    componentDidMount() {
        this.startAnimating()
        setTimeout(() => {
            window.scrollTo(0, STARTING_SCROLL_Y_POS)
             this.moveOnScroll(STARTING_SCROLL_Y_POS)
        }, 5)
    }

    startAnimating() {
        this.switchAnimation('idle', NUM_ANIMATION_FRAMES)
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

    moveOnScroll(currScrollYPos) {
        var rocketGuy = getRocketGuyElement()
        var spriteYPos;
        if(!percentageScrollingOn) {
            spriteYPos = Math.floor(currScrollYPos/(3.75) + topOffset)
        }
        else {
            const maxScrollYPos = document.getElementById("filler-tech").scrollHeight - window.innerHeight
            console.log(currScrollYPos / maxScrollYPos)
            spriteYPos = Math.floor((currScrollYPos / maxScrollYPos) * window.innerHeight - 80)
        }

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
    }

    flyInFromTop() {
        const rocketGuy = getRocketGuyElement()
        topOffset = 0
        rocketGuy.style.opacity = '0'
        rocketGuy.style.transition = ''
        rocketGuy.style.marginTop = '0'
        rocketGuy.style.transition = 'margin-top 600ms ease-out'
        disableScroll()
        setTimeout(() => {
            window.scrollTo({top: 700, behavior: 'instant'})
            enableScroll()
            rocketGuy.style.opacity = '1'
            rocketGuy.style.zIndex = '1'
            percentageScrollingOn = true
        }, 750)
    }

    flyInFromBottom() {
        const rocketGuy = getRocketGuyElement()
        const scrollHeight = Math.floor(window.innerHeight*4.4) - window.innerHeight
        topOffset = 50
        percentageScrollingOn = false
        rocketGuy.style.opacity = '0'
        rocketGuy.style.transition = ''
        rocketGuy.style.marginTop = `${scrollHeight/(2.5 * 1.5) + topOffset}px`
        rocketGuy.style.transition = 'margin-top 600ms ease-out'
        disableScroll()
        setTimeout(() => {
            window.scrollTo({top: scrollHeight - 650, behavior: 'instant'})
            enableScroll()
            rocketGuy.style.opacity = '1'
            rocketGuy.style.zIndex = '2'
        }, 750)
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

// stop scrolling during page transitions
// from: https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; return null }
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}