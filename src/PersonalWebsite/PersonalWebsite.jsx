import React from 'react';
import { createRoot } from 'react-dom/client';

import './PersonalWebsite.css';
import Navbar from './Navbar/Navbar';
import Clouds from './Clouds/Clouds';
import RocketGuy from './RocketGuy/RocketGuy';
import HomePage from './HomePage/HomePage';
import TechnicalPage from './TechnicalPage/TechnicalPage';
import Buildings from './TechnicalPage/Buildings/Buildings';

var scrollPos = 'mid'
var root = null

var stop1Down = false
var stop1Percent = 5
var stop2Down = true
var stop2Percent = 60
var stop3Down = false
var stop3Percent = 95

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
        setInterval(() => {this.updateSvg()}, 150);
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

    changeToHomePage() {
        setTimeout(() => {
            if(scrollPos === 'top') {
                var id = setTimeout(function() {}, 0)
                while (id--) clearTimeout(id)
                this.rocketGuyRef.current.startAnimating()
                this.setState({ currentPage: 'home' })
                this.cloudsRef.current.transitionCloudsToBottom()
                this.navBarRef.current.switchToHome()
                const mainContent = document.getElementById('main-content')
                mainContent.style.animation = '500ms home-disappear forwards'
                this.navBarRef.current.transitionToHome()
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
    }

    updateSvg() {
        if (!stop1Down) {
            stop1Percent += 0.5;
            if(stop1Percent > 15) {
                stop1Percent -= 0.5;
                stop1Down = true;
            }
        }
        else {
            stop1Percent -= 0.5;
            if(stop1Percent < 2.5) {
                stop1Percent += 0.5;
                stop1Down = false;
            }
        }

        if (!stop2Down) {
            stop2Percent += 0.25;
            if(stop2Percent > 70) {
                stop2Percent -= 0.25;
                stop2Down = true
            }
        }
        else {
            stop2Percent -= 0.25;
            if(stop2Percent < 65) {
                stop2Percent += 0.25;
                stop2Down = false;
            }
        }

        if (!stop3Down) {
            stop3Percent += 0.25;
            if(stop3Percent > 95) {
                stop3Percent -= 0.25;
                stop3Down = true;
            }
        }
        else {
            stop3Percent -= 0.25;
            if(stop3Percent < 87.5) {
                stop3Percent += 0.25;
                stop3Down = false;
            }
        }

        document.getElementById('stop1').attributes['offset'].value = `${stop1Percent}%`;
        document.getElementById('stop2').attributes['offset'].value = `${stop2Percent}%`;
        document.getElementById('stop3').attributes['offset'].value = `${stop3Percent}%`;
    }

    changeToTechnicalPage() {
        setTimeout(() => {
            if(scrollPos === 'bottom') {
                var id = setTimeout(function() {}, 0)
                while (id--) clearTimeout(id)
                this.rocketGuyRef.current.startAnimating()
                this.setState({ currentPage: 'technical' })
                this.cloudsRef.current.transitionCloudsToTop()
                this.navBarRef.current.switchToTechnical()
                const mainContent = document.getElementById('main-content')
                mainContent.style.animation = '500ms home-disappear forwards'
                setTimeout(() => {
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
    }

    render() {
        return (
            <div>
                <Navbar ref={this.navBarRef} />
                <Clouds ref={this.cloudsRef} />
                <RocketGuy ref={this.rocketGuyRef} />
                <div id="background-gradient" className='home-sky'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
                        <defs>
                            <linearGradient id="myGradient" gradientTransform="rotate(90)">
                            <stop id='stop1' offset="5%" stopColor="#021b3d" />
                            <stop id='stop2' offset="60%" stopColor="#2d3879" />
                            <stop id='stop3' offset="95%" stopColor="#6a5aac" />
                            {/* <stop id='stop4' offset="90" stopColor="#5aac8a" /> */}
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