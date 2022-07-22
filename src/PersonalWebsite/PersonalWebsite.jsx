import React from 'react';
import { createRoot } from 'react-dom/client';

import './PersonalWebsite.css';
import Navbar from './Navbar/Navbar';
import Clouds from './Clouds/Clouds';
import HomePage from './HomePage/HomePage';
import RocketGuy from './RocketGuy/RocketGuy';

export default class PersonalWebsite extends React.Component {
    constructor(props) {
        super(props)
        this.navBarRef = React.createRef()
        this.cloudsRef = React.createRef()
        this.rocketGuyRef = React.createRef()
   
        this.state = {
            currentPage: ''
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)  
        this.changeToHomePage()
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll = () => {
        this.rocketGuyRef.current.moveOnScroll()

        if ((window.innerHeight + window.scrollY + 1) >= document.body.offsetHeight) {
            console.log('arrived at bottom')
            if(this.state.currentPage === 'home') {
                this.changeToTechnicalPage()
            }
        }

        if (window.scrollY <= 0) {
            console.log('arrived at top')
        }
    }

    changeToHomePage() {
        const mainContent = document.getElementById('main-content')
        const root = createRoot(mainContent)
        root.render(<HomePage />)
        this.setState({ currentPage: 'home' })
    }

    changeToTechnicalPage() {
        this.cloudsRef.current.transitionCloudsToTop()
        this.setState({ currentPage: 'technical' })
        const mainContent = document.getElementById('main-content')
        mainContent.style.animation = '750ms disappear forwards'
    }

    render() {
        return (
            <div>
                <Navbar ref={this.navBarRef} />
                <Clouds ref={this.cloudsRef} />
                <RocketGuy ref={this.rocketGuyRef} />
                <div id="background-gradient" className='home-sky'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
                        {/* linear-gradient(180deg, #04234f, #2d3879,#6a5aac); */}
                        <defs>
                            <linearGradient id="myGradient" gradientTransform="rotate(90)">
                            <stop offset="5%" stop-color="#04234f">
                                <animate attributeName="stop-color" values="#04234f;#041b3b;#04234f" dur="10s" repeatCount="indefinite" />
                            </stop>
                            <stop offset="50%"  stop-color="#2d3879">
                                <animate attributeName="stop-color" values="#2d3879;#1f285c;#2d3879" dur="10s" repeatCount="indefinite" />
                            </stop>
                            <stop offset="95%" stop-color="#6a5aac">
                                <animate attributeName="stop-color" values="#6a5aac;#4a3c85;#6a5aac" dur="10s" repeatCount="indefinite" />
                            </stop>
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