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
        window.addEventListener('resize', this.handleResize)
        window.addEventListener('scroll', this.handleScroll)
        setTimeout(() => {document.getElementById('filler-tech').style.height = `${this.calcFillerSize()}px`}, 50)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleResize = () => {
        window.scrollTo({top: 700, behavior: 'instant'})
        this.infoPanelsRef.current.onResize()
        setTimeout(() => {document.getElementById('filler-tech').style.height = `${this.calcFillerSize()}px`}, 50)
    }

    calcFillerSize() {
        return Math.floor(
            (this.infoPanelsRef.current.getTotalPanelsHeight()-(window.innerHeight - 150))*8
            + window.innerHeight + 240
        )
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