import React from 'react';
import './TechnicalPage.css';
import Moon from './Moon/Moon';
import Buildings from './Buildings/Buildings';
import TechInfoPanels from './InfoPanels/TechInfoPanels';
import Stars from './Stars/Stars'

export default class TechnicalPage extends React.Component {
    constructor(props) {
        super(props)
        this.buildingsRef = React.createRef()
        this.infoPanelsRef = React.createRef()
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
        window.addEventListener('scroll', this.handleScroll)
        setTimeout(() => {document.getElementById('filler-tech').style.height = `${Math.floor((this.infoPanelsRef.current.getTotalPanelsHeight()-(window.innerHeight - 150))*6 + 1250)}px`}, 50)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleResize = () => {
        document.getElementById('filler-tech').style.height = `${Math.floor((this.infoPanelsRef.current.getTotalPanelsHeight()-(window.innerHeight - 150))*6 + 1250)}px`
        this.infoPanelsRef.current.onResize()
        window.scroll(0, 700)
    }

    handleScroll = () => {
        this.buildingsRef.current.onScroll()
        this.infoPanelsRef.current.onScroll()
    }

    render() {
        return (
            <main className='technical-page'>
                <Moon />
                <Stars />
                <Buildings ref={this.buildingsRef} />
                <TechInfoPanels ref={this.infoPanelsRef} />
                <div id='filler-tech' style={{height: window.innerHeight*8.5 + 'px'}} />
            </main>
        );
    }
}