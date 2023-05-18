import React from 'react';
import './Navbar.css';

var numTiles = 15

export default class Navbar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currentPage: 'home'
        }
    }

    componentDidMount() {
        document.querySelector('#home-btn').className = 'selected'
        this.initializeExtraTransitionTiles()
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

    extraButtonOnClick() {
        document.querySelector('.selected').className = ''
        document.querySelector('#extra-btn').className= 'selected'
        this.playExtraPageTransitionAnimation()
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

    playExtraPageTransitionAnimation() {
        for(let i = 0; i < numTiles; i++) {
            setTimeout(() => {
                document.getElementById(`tile-${i+1}`).style.top = '0'
            }, i * 125)
        }
    }

    initializeExtraTransitionTiles() {
        const tileContainer = document.getElementById('extra-transition-tiles')
        for(let i = 0; i < numTiles; i++) {
            const tile = document.createElement('div')
            tile.className = 'extra-transition-tile'
            tile.setAttribute("id", `tile-${i+1}`)
            tile.style.height = '100vh'
            tile.style.width = `${100/numTiles}vw`
            tile.style.top = '100vh'
            tile.style.left = `${(100/numTiles)*i}vw`
            tileContainer.appendChild(tile);
        }
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
                            <button id='extra-btn'onClick={() => this.extraButtonOnClick()}>EXTRA</button>
                        </div>
                    </div>
                </div>
                <div id='extra-transition-tiles'></div>
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