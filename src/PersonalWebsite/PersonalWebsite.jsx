import React from 'react';
import './PersonalWebsite.css';
import Navbar from './Navbar/Navbar';
import RocketGuy from './RocketGuy/RocketGuy';

export default class PersonalWebsite extends React.Component {
    render() {
        return (
            <div id='personal-website'>
                <Navbar></Navbar>
                <main>
                    <RocketGuy></RocketGuy>
                </main>
            </div>
        );
    }
}