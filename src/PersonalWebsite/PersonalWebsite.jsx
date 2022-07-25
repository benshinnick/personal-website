import React from 'react';
import { createRoot } from 'react-dom/client';

import './PersonalWebsite.css';
import Navbar from './Navbar/Navbar';
import Clouds from './Clouds/Clouds';
import RocketGuy from './RocketGuy/RocketGuy';
import HomePage from './HomePage/HomePage';
import TechnicalPage from './TechnicalPage/TechnicalPage';

var scrollPos = 'mid'
var root = null

export default class PersonalWebsite extends React.Component {
    constructor(props) {
        super(props)
        this.navBarRef = React.createRef()
        this.cloudsRef = React.createRef()
        this.homePageRef = React.createRef()
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
        this.rocketGuyRef.current.moveOnScroll()
        if ((window.innerHeight + window.scrollY + 1) >= document.body.offsetHeight) {
            scrollPos = 'bottom'
            if(this.state.currentPage === 'home') {
                this.changeToTechnicalPage()
            }
        }
        else if (window.scrollY <= 0) {
            scrollPos = 'top'
            if(this.state.currentPage === 'technical') {
                this.changeToHomePage()
            }
        }
        else {
            scrollPos = 'middle'
        }
    }

    switchToHomeOnStart() {
        const mainContent = document.getElementById('main-content')
        if(root === null) {
            root = createRoot(mainContent)
        }
        root.render(<HomePage ref={this.homePageRef} />)
        this.setState({ currentPage: 'home' })
    }

    changeToHomePage() {
        setTimeout(() => {
            if(scrollPos === 'top') {
                console.log('switching to home')
                this.setState({ currentPage: 'home' })
                this.cloudsRef.current.transitionCloudsToBottom()
                this.navBarRef.current.aboutButtonOnClick()
                const mainContent = document.getElementById('main-content')
                mainContent.style.animation = '750ms home-disappear forwards'
                this.navBarRef.current.transitionToHome()
                setTimeout(() => {
                    root.render(<HomePage />)
                    this.setState({ currentPage: 'home' })
                    mainContent.style.animationDelay = '500ms'
                    mainContent.style.animation = '1000ms home-appear forwards'
                }, 750)
                this.rocketGuyRef.current.flyInFromBottom()
            }
        }, 600)
    }

    changeToTechnicalPage() {
        setTimeout(() => {
            if(scrollPos === 'bottom') {
                this.setState({ currentPage: 'technical' })
                this.cloudsRef.current.transitionCloudsToTop()
                this.navBarRef.current.technicalButtonOnClick()
                const mainContent = document.getElementById('main-content')
                mainContent.style.animation = '750ms home-disappear forwards'
                setTimeout(() => {
                    this.navBarRef.current.transitionToOverCloud()
                    root.render(<TechnicalPage />)
                    this.setState({ currentPage: 'technical' })
                }, 750)
                this.rocketGuyRef.current.flyInFromTop()
            }
        }, 600)
    }

    // go() {
    //     var elements = document.getElementsByTagName("animate");
    //     for (var i = 0; i < elements.length; i++) {
    //         elements[i].beginElement();
    //     }
    // }

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
                            {/* <animate attributeName="stop-color" begin="indefinite" values="#04234f;orange;red;" dur="1s" repeatCount="1" fill="freeze"/> */}
                            <stop id='a' offset="5%" stopColor="#021b3d" />
                            <stop offset="60%" stopColor="#2d3879" />
                            <stop offset="95%" stopColor="#6a5aac" />
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