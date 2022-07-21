import React from 'react';
import './HomePage.css';
import InfoPanels from './InfoPanels/InfoPanels';
import RocketGuy from './RocketGuy/RocketGuy';
import Moon from './Moon/Moon';
import Stars from './Stars/Stars';
import UFO from './UFO/UFO';

export default class HomePage extends React.Component {
    render() {
        return (
            <main className='home-page'>
                <div id="background-gradient" />
                <InfoPanels />
                <RocketGuy />
                <Stars />
                <Moon />
                <UFO />
                <div id='filler' style={{height: window.innerHeight*4 + 'px'}} />
            </main>
        );
    }
}

window.onresize = adjust_filler_size;

function adjust_filler_size() {
    document.getElementById('filler').style.height = `${window.innerHeight*3.215 + 15}px`
    var ufo = document.getElementById('ufo');
    ufo.style.animation = 'none';
    setTimeout(() => {
        ufo.style.animation = '25s linear 1s infinite alternate shift'
    }, 25)
}