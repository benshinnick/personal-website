import React from 'react';
import './TechnicalPage.css';
import Moon from './Moon/Moon';
import Buildings from './Buildings/Buildings';
// import Stars from './Stars/Stars'

export default class TechnicalPage extends React.Component {
    constructor(props) {
        super(props)
        this.buildingsRef = React.createRef()
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleResize() {
        document.getElementById('filler-tech').style.height = `${Math.floor(window.innerHeight*8.5)}px`
    }

    handleScroll = () => {
        this.buildingsRef.current.onScroll()
    }

    render() {
        return (
            <main className='technical-page'>
                <Buildings ref={this.buildingsRef} />
                <Moon />
                {/* <Stars /> */}
                <div id='filler-tech' style={{height: window.innerHeight*8.5 + 'px'}} />
            </main>
        );
    }
}