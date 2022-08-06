import React from 'react';
import './Navbar.css';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentPage: 'about',
        }
    }

    componentDidMount() {
        document.querySelector('#about-btn').className = 'selected'
    }

    aboutButtonOnClick() {
        document.querySelector('.selected').className = ''
        document.querySelector('#about-btn').className = 'selected'
        if(this.state.currentPage === 'technical') {
            window.scrollTo(0, 0)
            this.setState({ currentPage: 'about' })
        }
    }

    switchToAbout() {
        document.querySelector('.selected').className = ''
        document.querySelector('#about-btn').className = 'selected'
        this.setState({ currentPage: 'about' })
    }

    technicalButtonOnClick() {
        document.querySelector('.selected').className = ''
        document.querySelector('#technical-btn').className= 'selected'
        if(this.state.currentPage === 'about') {
            const scrollHeight = getMaxScrollYPos()
            window.scrollTo(0, scrollHeight)
            this.setState({ currentPage: 'technical' })
        }
    }

    switchToTechnical() {
        document.querySelector('.selected').className = ''
        document.querySelector('#technical-btn').className= 'selected'
        this.setState({ currentPage: 'technical' })
    }

    gameButtonOnClick() {
        document.querySelector('.selected').className = ''
        document.querySelector('#game-btn').className= 'selected'
    }

    transitionToOverCloud() {
        const navbar = document.getElementById('navbar')
        navbar.className = 'navbar-wrapper-cloud'
        navbar.style.animation = '500ms nav-appear forwards'
        setTimeout(() => { navbar.style.animation = 'none'}, 500)
    }

    transitionToHome() {
        const navbar = document.getElementById('navbar')
        navbar.className = 'navbar-wrapper-home'
        navbar.style.animation = '500ms nav-appear forwards'
        setTimeout(() => { navbar.style.animation = 'none'}, 500)
    }

    render() {
        return (
            <div className='section'>
                <div className='container'>
                    <div id='navbar' className='navbar-wrapper-home'>
                        <button id='name-home-button'>BEN SHINNICK</button>
                        <div className='links-wrapper'>
                            <button id='about-btn' onClick={() => this.aboutButtonOnClick()}>HOME</button>
                            <button id='technical-btn' onClick={() => this.technicalButtonOnClick()}>TECHNICAL</button>
                            <button id='game-btn'onClick={() => this.gameButtonOnClick()}>GAME</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function getMaxScrollYPos() {
    return Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight, 
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
    ) - window.innerHeight
}