import React from 'react';
import './TechnicalPage.css';
import Buildings from './Buildings/Buildings';

export default class TechnicalPage extends React.Component {
    render() {
        return (
            <main className='technical-page'>
                <Buildings />
                <div id='filler' style={{height: window.innerHeight*3.3 + 'px'}} />
            </main>
        );
    }
}