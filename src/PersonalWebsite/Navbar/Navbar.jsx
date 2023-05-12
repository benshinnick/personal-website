import React from 'react';
import './Navbar.css';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentPage: 'home'
        }
    }

    componentDidMount() {
        document.querySelector('#home-btn').className = 'selected'
    }

    homeButtonOnClick() {
        document.querySelector('.selected').className = ''
        document.querySelector('#home-btn').className = 'selected'
        if(this.state.currentPage === 'technical') {
            window.scrollTo({top: 0, behavior: 'smooth'})
            this.setState({ currentPage: 'home' })
        }
        if(window.scrollY === 0) {
            window.scrollTo({top: 100, behavior: 'instant'})
            window.scrollTo({top: 0, behavior: 'instant'})
            this.setState({ currentPage: 'home' })
        }
    }

    switchToHome() {
        document.querySelector('.selected').className = ''
        document.querySelector('#home-btn').className = 'selected'
        this.setState({ currentPage: 'home' })
    }

    technicalButtonOnClick() {
        document.querySelector('.selected').className = ''
        document.querySelector('#technical-btn').className= 'selected'
        if(this.state.currentPage === 'home') {
            const scrollHeight = getMaxScrollYPos()
            window.scrollTo({top: scrollHeight, behavior: 'smooth'})
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
                            <button id='home-btn' onClick={() => this.homeButtonOnClick()}>HOME</button>
                            <button id='technical-btn' onClick={() => this.technicalButtonOnClick()}>TECHNICAL</button>
                            <button id='game-btn'onClick={() => this.gameButtonOnClick()}>GAMES</button>
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