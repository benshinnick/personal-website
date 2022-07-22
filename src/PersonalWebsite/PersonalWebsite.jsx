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
                <div id="background-gradient" className='home-sky'/>
                <div id='main-content' />
            </div>
        )
    }
}