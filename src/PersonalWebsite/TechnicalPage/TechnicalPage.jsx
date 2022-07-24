import React from 'react';
import './TechnicalPage.css';

export default class TechnicalPage extends React.Component {
    render() {
        return (
            <main className='technical-page'>
                <div id='filler' style={{height: window.innerHeight*3.3 + 'px'}} />
            </main>
        );
    }
}