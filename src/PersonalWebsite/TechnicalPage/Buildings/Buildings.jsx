import React from 'react';
import './Buildings.css';

export default class Buildings extends React.Component {

    componentDidMount() {
        this.onScroll(700)
    }

    onScroll(scrollY) {
        const screenWidth = window.innerWidth
        const left1 = document.getElementById('left-border-building-1')
        if(screenWidth > 650) left1.style.top = `${Math.floor(-scrollY/14 + 400)}px`
        else left1.style.top = `${Math.floor(-scrollY/26 + 550)}px`

        const left2 = document.getElementById('left-border-building-2')
        if(screenWidth > 650) left2.style.top = `${Math.floor(-scrollY/20 + 570)}px`
        else left2.style.top = `${Math.floor(-scrollY/36 + 600)}px`

        const right1 = document.getElementById('right-border-building-1')
        if(screenWidth > 650) right1.style.top = `${Math.floor(-scrollY/14 + 650)}px`
        else right1.style.top = `${Math.floor(-scrollY/34 + 650)}px`

        const right2 = document.getElementById('right-border-building-2')
        if(screenWidth > 650) right2.style.top = `${Math.floor(-scrollY/8 + 650)}px`
        else right2.style.top = `${Math.floor(-scrollY/28 + 650)}px`

        const right3 = document.getElementById('right-border-building-3')
        if(screenWidth > 650) right3.style.top = `${Math.floor(-scrollY/18 + 500)}px`
        else right3.style.top = `${Math.floor(-scrollY/38 + 500)}px`

        // outer buildings
        const left3 = document.getElementById('left-border-building-3')
        left3.style.top = `${Math.floor(-scrollY/18 + 250)}px`
        const left4 = document.getElementById('left-border-building-4')
        left4.style.top = `${Math.floor(-scrollY/15 + 400)}px`
        const left5 = document.getElementById('left-border-building-5')
        left5.style.top = `${Math.floor(-scrollY/28 + 450)}px`

        const right4 = document.getElementById('right-border-building-4')
        right4.style.top = `${Math.floor(-scrollY/10 + 400)}px`
        const right5 = document.getElementById('right-border-building-5')
        right5.style.top = `${Math.floor(-scrollY/10 + 700)}px`
    }

    render() {
        return (
            <div id='buildings'>
                <div id='left-border-buildings'>
                    <div id='left-border-building-1'>
                        <div className='building-4-top sprite'></div>
                        <div className='building-4-floors sprite'></div>
                    </div>
                    <div id='left-border-building-2'>
                        <div className='building-2-top sprite'></div>
                        <div className='building-2-floors sprite'></div>
                    </div>
                    <div id='left-border-building-3'>
                        <div className='building-2-top sprite'></div>
                        <div className='building-2-floors sprite'></div>
                    </div>
                    <div id='left-border-building-4'>
                        <div className='building-2-top sprite'></div>
                        <div className='building-2-floors sprite'></div>
                    </div>
                    <div id='left-border-building-5'>
                        <div className='building-1-top sprite'></div>
                        <div className='building-1-floors sprite'></div>
                    </div>
                </div>
                <div id='right-border-buildings'>
                    <div id='right-border-building-1'>
                        <div className='building-1-top sprite'></div>
                        <div className='building-1-floors sprite'></div>
                    </div>
                    <div id='right-border-building-2'>
                        <div className='building-3-top sprite'></div>
                        <div className='building-3-floors sprite'></div>
                    </div>
                    <div id='right-border-building-3'>
                        <div className='building-1-top sprite'></div>
                        <div className='building-5-floors sprite'></div>
                    </div>
                    <div id='right-border-building-4'>
                        <div className='building-2-top sprite'></div>
                        <div className='building-2-floors sprite'></div>
                    </div>
                    <div id='right-border-building-5'>
                        <div className='building-2-top sprite'></div>
                        <div className='building-2-floors sprite'></div>
                    </div>
                </div>
            </div>
        );
    }
}