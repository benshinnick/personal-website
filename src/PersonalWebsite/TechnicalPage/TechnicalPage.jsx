import React from 'react';
import './TechnicalPage.css';
import Buildings from './Buildings/Buildings';

export default class TechnicalPage extends React.Component {
    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    handleResize() {
        document.getElementById('filler-tech').style.height = `${Math.floor(window.innerHeight*8.5)}px`
    }

    render() {
        return (
            <main className='technical-page'>
                <Buildings />
                <div id='filler-tech' style={{height: window.innerHeight*8.5 + 'px'}} />
            </main>
        );
    }
}