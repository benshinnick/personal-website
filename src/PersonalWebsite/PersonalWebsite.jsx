import React from 'react';
import './PersonalWebsite.css';
import Navbar from './Navbar/Navbar';
import RocketGuy from './RocketGuy/RocketGuy';
import Clouds from './Clouds/Clouds';
import Moon from './Moon/Moon';
import AboutPanel from './AboutPanel/AboutPanel';

export default class PersonalWebsite extends React.Component {
    render() {
        return (
            <div className='personal-website'>
                <Navbar></Navbar>
                <main>
                    <AboutPanel></AboutPanel>
                    <RocketGuy></RocketGuy>
                    <Moon></Moon>
                    <Clouds></Clouds>
                    <div style={{height: 3000 + 'px'}}></div>
                </main>
            </div>
        );
    }
}