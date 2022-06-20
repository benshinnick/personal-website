import React from 'react';
import './Clouds.css';

var numSmall = 0
var numMedium = 0
var numLarge = 0

export default class Clouds extends React.Component {

    componentDidMount() {
        this.handlePageResize()
        window.addEventListener('resize', this.handlePageResize)
    }

    handlePageResize = () => {
        if(numSmall !== getFullPageWidthClouds('small')) {
            numSmall = getFullPageWidthClouds('small')
            let smallClouds = document.getElementById('small-clouds')
            while (smallClouds.firstChild) { smallClouds.removeChild(smallClouds.firstChild) }
            for(let i = 0; i < numSmall; ++i) {
                let smallCloud = document.createElement('div')
                smallCloud.className = 'sprite cloud small' 
                smallCloud.style.animationDuration = `${numSmall * 10}s`
                smallCloud.style.animationDelay = `${-i * 10}s`
                smallClouds.appendChild(smallCloud)
            }
        }
        if(numMedium !== getFullPageWidthClouds('medium')) {
            numMedium = getFullPageWidthClouds('medium')
            let mediumClouds = document.getElementById('medium-clouds')
            while (mediumClouds.firstChild) { mediumClouds.removeChild(mediumClouds.firstChild); }
            for(let i = 0; i < numMedium; ++i) {
                let mediumCloud = document.createElement('div')
                mediumCloud.className = 'sprite cloud medium' 
                mediumCloud.style.animationDuration = `${numMedium * 15}s`
                mediumCloud.style.animationDelay = `${-i * 15}s`
                mediumClouds.appendChild(mediumCloud)
            }
        }
        if(numLarge !== getFullPageWidthClouds('large')) {
            numLarge = getFullPageWidthClouds('large')
            let largeClouds = document.getElementById('large-clouds')
            while (largeClouds.firstChild) { largeClouds.removeChild(largeClouds.firstChild); }
            for(let i = 0; i < numLarge; ++i) {
                let largeCloud = document.createElement('div')
                largeCloud.className = 'sprite cloud large' 
                largeCloud.style.animationDuration = `${numLarge * 30}s`
                largeCloud.style.animationDelay = `${-i * 30}s`
                largeClouds.appendChild(largeCloud)
            }
        }
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