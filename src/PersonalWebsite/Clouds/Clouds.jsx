import React from 'react';
import './Clouds.css';

var numSmall = 0
var numMedium = 0
var numLarge = 0

export default class Clouds extends React.Component {
    constructor(props) {
        super(props);
   
        this.state = {
            cloudPosition: 'bottom'
        };
    }

    componentDidMount() {
        this.handlePageResize()
        window.addEventListener('resize', this.handlePageResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handlePageResize)
    }

    handlePageResize = () => {
        this.updateNumClouds('small', 10)
        this.updateNumClouds('medium', 15)
        this.updateNumClouds('large', 30)
        if(this.state.cloudPosition === 'top') {
            adjustBottomClouds(document.getElementsByClassName('small'), 52, 21)
            adjustBottomClouds(document.getElementsByClassName('medium'), 60, -6)
            adjustBottomClouds(document.getElementsByClassName('large'), 60, -32)
        }
    }

    updateNumClouds(size, animationDuration) {
        let numClouds = 0
        if(size === 'small') { numClouds = numSmall }
        if(size === 'medium') { numClouds = numMedium }
        if(size === 'large') { numClouds = numLarge }

        if(numClouds !== getFullPageWidthClouds(size)) {
            numClouds = getFullPageWidthClouds(size)
            if(size === 'small') { numSmall = numClouds }
            if(size === 'medium') { numMedium = numClouds }
            if(size === 'large') { numLarge = numClouds }

            let clouds = document.getElementById(`${size}-clouds`)
            while (clouds.firstChild) { clouds.removeChild(clouds.firstChild); }
            for(let i = 0; i < numClouds; ++i) {
                let cloud = document.createElement('div')
                if (i % 2 === 0) {cloud.className = `sprite cloud ${size} even`}
                else {cloud.className = `sprite cloud ${size}`}
                cloud.style.animationDuration = `${numClouds * animationDuration}s`
                cloud.style.animationDelay = `${-i * animationDuration}s`
                if(size === 'small' || size === 'medium') {
                    cloud.style.filter = 'drop-shadow(0 0 2px rgb(235, 235, 235))'
                }
                if(this.state.cloudPosition === 'hidden') {
                    cloud.style.display = 'none'
                }
                clouds.appendChild(cloud)
            }
        }
    }

    hideClouds() {
        this.setState({ cloudPosition: 'hidden' }, () => {
            const collection = document.getElementsByClassName("cloud");
            for(let i = 0; i < collection.length; i++) {
                collection[i].style.translate = '0 800px';
                collection[i].style.display = 'none';
            }
        })
    }

    unhideClouds() {
        const collection = document.getElementsByClassName("cloud");
        for(let i = 0; i < collection.length; i++) {
            collection[i].style.display = '';
        }
    }

    instantMoveCloudsToTop() {
        this.setState({ cloudPosition: 'top' }, () => {
            moveCloudsToTopInstant(document.getElementsByClassName('small'), 52, 21, 0.1)
            moveCloudsToTopInstant(document.getElementsByClassName('medium'), 60, -6, 0.15)
            moveCloudsToTopInstant(document.getElementsByClassName('large'), 60, -32, 0.30)
        })
    }

    instantMoveCloudsToBottom() {
        this.setState({ cloudPosition: 'bottom' }, () => {
            moveCloudsToBottomInstant(document.getElementsByClassName('small'), -4, 0.1)
            moveCloudsToBottomInstant(document.getElementsByClassName('medium'), 12, 0.15)
            moveCloudsToBottomInstant(document.getElementsByClassName('large'), 37, 0.30)
        })
    }

    transitionCloudsToTop() {
        this.setState({ cloudPosition: 'top' }, () => {
            moveCloudsToTop(document.getElementsByClassName('small'), 52, 21, 0.1)
            moveCloudsToTop(document.getElementsByClassName('medium'), 60, -6, 0.15)
            moveCloudsToTop(document.getElementsByClassName('large'), 60, -32, 0.30)
        })
    }

    transitionCloudsToBottom() {
        this.setState({ cloudPosition: 'bottom' }, () => {
            moveCloudsToBottom(document.getElementsByClassName('small'), -4, 0.1)
            moveCloudsToBottom(document.getElementsByClassName('medium'), 12, 0.15)
            moveCloudsToBottom(document.getElementsByClassName('large'), 37, 0.30)
        })
    }

    render() {
        return (
            <div id='clouds'>
                <div id='small-clouds'></div>
                <div id='medium-clouds'></div>
                <div id='large-clouds'></div>
            </div>
        );
    }
}

function adjustBottomClouds(clouds, cloudHeight, cloudOffset) {
    for(var i = 0; i < clouds.length; ++i) {
        clouds[i].style.translate = `0 ${-1*(window.innerHeight-cloudHeight-cloudOffset)}px`
    }
}

function moveCloudsToTopInstant(clouds, cloudHeight, cloudOffset, speed) {
    for(var i = 0; i < clouds.length; ++i) {
        clouds[i].style.transition = ''
        clouds[i].style.translate = `0 ${-1*(window.innerHeight-cloudHeight-cloudOffset)}px`
        clouds[i].style.animationDuration = `${clouds.length * speed * 100}s`
        clouds[i].style.animationDelay = `${-i * speed * 100}s`
    }
}

function moveCloudsToTop(clouds, cloudHeight, cloudOffset, speed) {
    for(var i = 0; i < clouds.length; ++i) {
        clouds[i].style.transition = 'translate 750ms ease-in-out'
        clouds[i].style.translate = `0 ${-1*(window.innerHeight-cloudHeight-cloudOffset)}px`
        clouds[i].style.animationDuration = `${clouds.length * speed}s`
        clouds[i].style.animationDelay = `${-i * speed}s`
    }
    setTimeout(() => {
        for(var i = 0; i < clouds.length; ++i) {
            clouds[i].style.transition = ''
            clouds[i].style.animationDuration = `${clouds.length * speed * 100}s`
            clouds[i].style.animationDelay = `${-i * speed * 100}s`
        }
    }, 1000)
}

function moveCloudsToBottomInstant(clouds, cloudOffset, speed) {
    for(var i = 0; i < clouds.length; ++i) {
        clouds[i].style.transition = ''
        clouds[i].style.translate = `0 ${-1*cloudOffset}px`
        clouds[i].style.animationDuration = `${clouds.length * speed * 100}s`
        clouds[i].style.animationDelay = `${-i * speed * 100}s`
    }
}

function moveCloudsToBottom(clouds, cloudOffset, speed) {
    for(var i = 0; i < clouds.length; ++i) {
        clouds[i].style.transition = 'translate 750ms ease-in-out'
        clouds[i].style.translate = `0 ${-1*cloudOffset}px`
        clouds[i].style.animationDuration = `${clouds.length * speed}s`
        clouds[i].style.animationDelay = `${-i * speed}s`
    }
    setTimeout(() => {
        for(var i = 0; i < clouds.length; ++i) {
            clouds[i].style.transition = ''
            clouds[i].style.animationDuration = `${clouds.length * speed * 100}s`
            clouds[i].style.animationDelay = `${-i * speed * 100}s`
        }
    }, 1140)
}

function getFullPageWidthClouds(cloudSize) {
    if(cloudSize === 'small') {
        let numClouds = Math.floor(window.innerWidth / 130)
        if(numClouds < 7) return 7
        else return numClouds
    }
    else if(cloudSize === 'medium') {
        let numClouds = Math.floor(window.innerWidth / 160)
        if(numClouds < 5) return 5
        else return numClouds
    }
    else if(cloudSize === 'large'){
        let numClouds = Math.floor(window.innerWidth / 230)
        if(numClouds < 4) return 4
        else return numClouds
    }
}