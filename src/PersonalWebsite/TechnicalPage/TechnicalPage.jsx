import React from 'react';
import './TechnicalPage.css';
import Moon from './Moon/Moon';
import Buildings from './Buildings/Buildings';
import TechInfoPanels from './InfoPanels/TechInfoPanels';
import Stars from './Stars/Stars'
import ShootingStars from './Stars/ShootingStars'

export default class TechnicalPage extends React.Component {
    constructor(props) {
        super(props)
        this.buildingsRef = React.createRef()
        this.infoPanelsRef = React.createRef()
    }

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize)
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleResize = () => {
        window.scrollTo({top: 700, behavior: 'instant'})
        this.infoPanelsRef.current.onResize()

        if(window.innerWidth <= 400)
            document.getElementById('name-home-button').textContent = "B_E_N"
        else
            document.getElementById('name-home-button').textContent = "BEN SHINNICK"


        if(window.innerWidth <= 650) {
            document.getElementById('left-email-icons').textContent = "E"
            document.getElementById('right-email-icons').textContent = "N"
        }
        else {
            document.getElementById('left-email-icons').textContent = "E F N"
            document.getElementById('right-email-icons').textContent = "a s 5"
        }
    }

    handleScroll = () => {
        const scrollY = window.scrollY
        this.infoPanelsRef.current.onScroll(scrollY)
        this.buildingsRef.current.onScroll(scrollY)
    }

    render() {
        return (
            <main className='technical-page'>
                <Moon />
                <Stars />
                <ShootingStars />
                <Buildings ref={this.buildingsRef} />
                <TechInfoPanels ref={this.infoPanelsRef} />
                <div id='center-column-vert'></div>
                <div id='center-column-horiz'></div>
                <div id='filler-tech' style={{height: window.innerHeight*8.5 + 'px'}} />
            </main>
        );
    }
}