import React from 'react';
import { createRoot } from 'react-dom/client';

import './PersonalWebsite.css';
import Navbar from './Navbar/Navbar';
import Clouds from './Clouds/Clouds';
import RocketGuy from './RocketGuy/RocketGuy';
import HomePage from './HomePage/HomePage';
import TechnicalPage from './TechnicalPage/TechnicalPage';
import ExtraPage from './ExtraPage/ExtraPage';

var scrollPos = 'mid'
var root = null

export default class PersonalWebsite extends React.Component {
    constructor(props) {
        super(props)
        this.navBarRef = React.createRef()
        this.cloudsRef = React.createRef()
        this.rocketGuyRef = React.createRef()
   
        this.state = {
            currentPage: '',
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
        this.switchToHomeOnStart()
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll = () => {
        const scrollY = window.scrollY
        this.rocketGuyRef.current.moveOnScroll(scrollY)
        if ((window.innerHeight + scrollY + 50) >= document.body.offsetHeight) {
            scrollPos = 'bottom'
            if(this.state.currentPage === 'home')
                this.changeToTechnicalPage()
        }
        else if (scrollY <= 100) {
            scrollPos = 'top'
            if(this.state.currentPage === 'technical')
                this.changeToHomePage()
        }
        else
            scrollPos = 'middle'
    }

    switchToHomeOnStart() {
        const mainContent = document.getElementById('main-content')
        if(root === null)
            root = createRoot(mainContent)
        root.render(<HomePage />)
        this.setState({ currentPage: 'home' })
    }

    changeToHomePage = () => {
        setTimeout(() => {
            if(scrollPos === 'top' || this.state.currentPage !== 'extra') {
                var id = setTimeout(function() {}, 0)
                while (id--) clearTimeout(id)
                this.rocketGuyRef.current.startAnimating()
                this.setState({ currentPage: 'home' })
                this.cloudsRef.current.transitionCloudsToBottom()
                this.navBarRef.current.switchToHome()
                const mainContent = document.getElementById('main-content')
                mainContent.style.animation = '500ms home-disappear forwards'
                this.navBarRef.current.transitionToHome()
                this.rocketGuyRef.current.setPage('home')
                setTimeout(() => {
                    root.render(<HomePage />)
                    this.setState({ currentPage: 'home' })
                    setTimeout(() => {
                        mainContent.style.animation = '1000ms home-appear forwards'
                    }, 100)
                }, 700)
                this.rocketGuyRef.current.flyInFromBottom()
            }
        }, 600)
        if(this.state.currentPage === 'extra') {
            var id = setTimeout(function() {}, 0)
            while (id--) clearTimeout(id)
            this.setState({ currentPage: 'home' })
            this.cloudsRef.current.instantMoveCloudsToBottom()
            this.navBarRef.current.switchToHome()
            this.navBarRef.current.transitionToHome()
            this.rocketGuyRef.current.setPage('home')
            this.rocketGuyRef.current.startAnimating()
            root.render(<HomePage />)
            setTimeout(() => {
                this.setState({ currentPage: 'home' })
                window.scrollTo(0, 450)
            }, 100)
        }
    }

    changeToTechnicalPage = () => {
        setTimeout(() => {
            if(scrollPos === 'bottom' || this.state.currentPage !== 'extra') {
                var id = setTimeout(function() {}, 0)
                while (id--) clearTimeout(id)
                this.rocketGuyRef.current.startAnimating()
                this.setState({ currentPage: 'technical' })
                this.cloudsRef.current.transitionCloudsToTop()
                this.navBarRef.current.switchToTechnical()
                const mainContent = document.getElementById('main-content')
                mainContent.style.animation = '500ms home-disappear forwards'
                setTimeout(() => {
                    this.rocketGuyRef.current.setPage('technical')
                    this.navBarRef.current.transitionToOverCloud()
                    root.render(<TechnicalPage />)
                    this.setState({ currentPage: 'technical' })
                    setTimeout(() => {
                        mainContent.style.animation = '1000ms home-appear forwards'
                    }, 100)
                }, 700)
                this.rocketGuyRef.current.flyInFromTop()
            }
        }, 600)
        if(this.state.currentPage === 'extra') {
            var id = setTimeout(function() {}, 0)
            while (id--) clearTimeout(id)
            this.cloudsRef.current.instantMoveCloudsToTop()
            this.navBarRef.current.switchToTechnical()
            this.navBarRef.current.transitionToOverCloud()

            this.setState({ currentPage: 'technical' })
            this.navBarRef.current.switchToTechnical()
            this.rocketGuyRef.current.setPage('technical')
            this.rocketGuyRef.current.startAnimating()
            root.render(<TechnicalPage />)
            setTimeout(() => {
                this.rocketGuyRef.current.setPage('technical')
                window.scrollTo(0, 700)
            }, 100)
        }
    }

    changeToExtraPage = () => {
        var id = setTimeout(function() {}, 0)
        while (id--) clearTimeout(id)
        this.setState({ currentPage: 'extra' })
        this.rocketGuyRef.current.setPage('extra')
        setTimeout(() => {
            root.render(<ExtraPage />)
        }, 2125)
    }

    render() {
        return (
            <div>
                <Navbar ref={this.navBarRef}
                    changeToHomePage = {this.changeToHomePage}
                    changeToTechnicalPage = {this.changeToTechnicalPage}
                    changeToExtraPage = {this.changeToExtraPage}
                />
                <Clouds ref={this.cloudsRef} />
                <RocketGuy ref={this.rocketGuyRef} />
                <div id="background-gradient" className='home-sky'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
                        <defs>
                            <linearGradient id="myGradient" gradientTransform="rotate(90)">
                            <stop offset="5%" stopColor="#021b3d" />
                            <stop offset="30%" stopColor="#102a52" />
                            <stop offset="50%" stopColor="#1e4075" />
                            <stop offset="80%" stopColor="#278AB0" />
                            <stop offset="100%" stopColor="#22e6a7" />
                            </linearGradient>
                        </defs>
                        <rect fill="url('#myGradient')" width='100%' height='100%'/>
                    </svg>
                </div>
                <div id='main-content' />
            </div>
        )
    }
}