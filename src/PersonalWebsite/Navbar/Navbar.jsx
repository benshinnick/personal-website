import React from 'react';
import './Navbar.css';

var numTiles = 10

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
        if(this.state.currentPage === 'home') return;
        this.disableNavbar()
        document.querySelector('.selected').className = ''
        document.querySelector('#home-btn').className = 'selected'
        if(this.state.currentPage === 'technical') {
            window.scrollTo({top: 0, behavior: 'smooth'})
            this.setState({ currentPage: 'home' })
            this.props.changeToHomePage(true)
        }
        if(window.scrollY === 0) {
            window.scrollTo({top: 100, behavior: 'instant'})
            window.scrollTo({top: 0, behavior: 'instant'})
            this.setState({ currentPage: 'home' })
        }
        if(this.state.currentPage === 'extra') {
            this.removeExtraPageTiles()
            this.props.changeToHomePage(true)
        }
    }

    switchToHome() {
        document.querySelector('.selected').className = ''
        document.querySelector('#home-btn').className = 'selected'
        this.setState({ currentPage: 'home' })
    }

    technicalButtonOnClick() {
        if(this.state.currentPage === 'technical') return;
        this.disableNavbar()
        document.querySelector('.selected').className = ''
        document.querySelector('#technical-btn').className= 'selected'
        if(this.state.currentPage === 'home') {
            const scrollHeight = getMaxScrollYPos()
            window.scrollTo({top: scrollHeight, behavior: 'smooth'})
            this.setState({ currentPage: 'technical' })
            this.props.changeToTechnicalPage(true)
        }
        if(this.state.currentPage === 'extra') {
            this.removeExtraPageTiles()
            this.props.changeToTechnicalPage(true)
        }
    }

    switchToTechnical() {
        document.querySelector('.selected').className = ''
        document.querySelector('#technical-btn').className= 'selected'
        this.setState({ currentPage: 'technical' })
    }

    extraButtonOnClick() {
        if(this.state.currentPage === 'extra') return;
        this.disableNavbar()
        document.querySelector('.selected').className = ''
        document.querySelector('#extra-btn').className= 'selected'
        this.setState({ currentPage: 'extra' })
        this.playExtraPageTransitionAnimation()
        this.props.changeToExtraPage()
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
            document.getElementById(`tile-${i+1}`).style.animation = `1s ease-in-out ${i*125}ms tile-slide-in forwards`
        }
    }

    removeExtraPageTiles() {
        let counter = 0
        for(let i = numTiles-1; i >= 0; i--) {
            document.getElementById(`tile-${i+1}`).style.animation = `1s ease-in-out ${counter++*100}ms tile-slide-out backwards`
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

    disableNavbar() {
        document.getElementById("name-home-button").disabled = true
        document.getElementById("home-btn").disabled = true
        document.getElementById("technical-btn").disabled = true
        document.getElementById("extra-btn").disabled = true
    }

    enableNavbar() {
        document.getElementById("name-home-button").disabled = false
        document.getElementById("home-btn").disabled = false
        document.getElementById("technical-btn").disabled = false
        document.getElementById("extra-btn").disabled = false
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