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


window.onresize = adjust_filler_size;

function adjust_filler_size() {
    document.getElementById('filler').style.height = `${Math.floor(window.innerHeight*3.3)}px`
    var ufo = document.getElementById('ufo');
    ufo.style.animation = 'none';
    setTimeout(() => {
        ufo.style.animation = '25s linear 1s infinite alternate shift'
    }, 25)
}