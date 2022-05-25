import React from 'react';
import './Navbar.css';

export default class Navbar extends React.Component {

    componentDidMount() {
        document.querySelector('#about-btn').className = 'selected';
    }

    aboutButtonOnClick() {
        document.querySelector('.selected').className = '';
        document.querySelector('#about-btn').className = 'selected'
    }

    technicalButtonOnClick() {
        document.querySelector('.selected').className = '';
        document.querySelector('#technical-btn').className= 'selected';
    }

    contactButtonOnClick() {
        document.querySelector('.selected').className = '';
        document.querySelector('#contact-btn').className = 'selected';
    }

    render() {
        return (
            <div className='section' id='navbar'>
                <div className='container'>
                    <div className='navbar-wrapper'>
                        <div id='left-corner'></div>
                        <div id='nb-left-side'></div>
                        <div id='right-corner'></div>
                        <div id='nb-right-side'></div>
                        <button id='name-home-button'>Ben Shinnick</button>
                        <div className='links-wrapper'>
                            <button id='about-btn' onClick={() => this.aboutButtonOnClick()}>About</button>
                            <button id='technical-btn' onClick={() => this.technicalButtonOnClick()}>Technical</button>
                            <button id='contact-btn'onClick={() => this.contactButtonOnClick()}>Contact</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}