import React from 'react';
import './RocketGuy.css';

const ANIMATION_SPEED_MS = 125
const SPRITE_WIDTH_PX = 100
const STARTING_SCROLL_Y_POS = 150

var lastScrollYPos = STARTING_SCROLL_Y_POS

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

    handleScroll() {
        var currScrollYPos = window.scrollY
        console.log(currScrollYPos)
        var spriteYPos = currScrollYPos/3

        if(lastScrollYPos < currScrollYPos) {
            console.log('scrolling down')
        }
        else {
            console.log('scrolling up')
        }
        this.stopCurrentAnimation()
        document.querySelector('#rocket-guy').className = 'sprite fly-down-build'
        document.querySelector('#rocket-guy').style.marginTop = `${spriteYPos}px`

        console.log('scrolling react')
        lastScrollYPos = currScrollYPos
    }

    render() {
        return (
            <div className='sprite' id='rocket-guy'></div>
        );
    }
}



