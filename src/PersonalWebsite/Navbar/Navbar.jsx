import React from 'react';
import './Navbar.css';

export default class Navbar extends React.Component {
    render() {
        return (
            <div className='section' id='navbar'>
                <div className='container'>
                    <div className='navbar-wrapper'>
                        <button id='name-home-button'>Ben Shinnick</button>
                        <div className='links-wrapper'>
                            <button>About</button>
                            <button>Experience</button>
                            <button>Technical</button>
                            <button>Contact</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}