import React from 'react';
import './HomePage.css';
import AboutPanel from './AboutPanel/AboutPanel';
import RocketGuy from './RocketGuy/RocketGuy';
import Clouds from './Clouds/Clouds';
import Moon from './Moon/Moon';
import Stars from './Stars/Stars';

export default class HomePage extends React.Component {
    render() {
        return (
            <main className='home-page'>
                <AboutPanel></AboutPanel>
                <RocketGuy></RocketGuy>
                <Moon></Moon>
                <Clouds></Clouds>
                <Stars></Stars>
                <div style={{height: 3000 + 'px'}}></div>
            </main>
        );
    }
}