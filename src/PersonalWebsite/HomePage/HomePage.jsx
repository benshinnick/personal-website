import React from 'react';
import './HomePage.css';
import AboutPanel from './AboutPanel/AboutPanel';
import RocketGuy from './RocketGuy/RocketGuy';
import Clouds from './Clouds/Clouds';
import Moon from './Moon/Moon';
import Saturn from './Saturn/Saturn';
import Stars from './Stars/Stars';
import UFO from './UFO/UFO';

export default class HomePage extends React.Component {
    render() {
        return (
            <main className='home-page'>
                <div id="background-gradient"></div>
                <AboutPanel></AboutPanel>
                <RocketGuy></RocketGuy>
                <Clouds></Clouds>
                <Stars></Stars>
                <Moon></Moon>
                <Saturn></Saturn>
                <UFO></UFO>
                <div id='filler' style={{height: window.innerHeight*4 + 'px'}}></div>
            </main>
        );
    }
}

window.onresize = adjust_filler_size;

function adjust_filler_size() {
    document.getElementById('filler').style.height = `${window.innerHeight*3.3}px`
}