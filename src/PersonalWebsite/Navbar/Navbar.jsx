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
                        <button id='name-home-button'>BEN SHINNICK</button>
                        <div className='links-wrapper'>
                            <button id='about-btn' onClick={() => this.aboutButtonOnClick()}>ABOUT</button>
                            <button id='technical-btn' onClick={() => this.technicalButtonOnClick()}>TECHNICAL</button>
                            <button id='game-btn'onClick={() => this.contactButtonOnClick()}>GAME</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}