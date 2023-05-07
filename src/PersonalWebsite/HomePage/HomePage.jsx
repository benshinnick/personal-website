import React from 'react';
import './HomePage.css';
import InfoPanels from './InfoPanels/InfoPanels';
import Moon from './Moon/Moon';
import Stars from './Stars/Stars';
import UFO from './UFO/UFO';
import ShootingStars from './Stars/ShootingStars';

export default class HomePage extends React.Component {

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
        this.handleResize()
        this.ufoFlyIn();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    ufoFlyIn() {
        var ufo = document.getElementById('ufo');
        setTimeout(() => {
            ufo.style.display = "block";
            ufo.style.animation = '500ms ease-out 0s 1 alternate slide-in';
        }, 25)
        setTimeout(() => {
            ufo.style.animation = '25s linear 0s infinite alternate shift'
        }, 500) 
    }

    handleResize() {
        document.getElementById('filler-home').style.height = `${Math.floor(window.innerHeight*5)}px`
        var ufo = document.getElementById('ufo');
        ufo.style.animation = 'none';
        setTimeout(() => {
            ufo.style.animation = '25s linear 1s infinite alternate shift'
        }, 25)
        if(window.innerWidth <= 1050)
            document.getElementById('connect-text').textContent = "CONNECT"
        else
            document.getElementById('connect-text').textContent = "CONNECT WITH ME"
    }

    render() {
        return (
            <main className='home-page'>
                <InfoPanels />
                <Stars />
                <ShootingStars />
                <Moon />
                <UFO />
                <div id='filler-home' style={{height: window.innerHeight*5 + 'px'}} />
            </main>
        );
    }
}