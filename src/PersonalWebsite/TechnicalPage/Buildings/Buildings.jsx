import React from 'react';
import './Buildings.css';

export default class Buildings extends React.Component {

    componentDidMount() {
        this.onScroll(700)
    }

    onScroll(scrollY) {
        const building1 = document.getElementById('building-1-top')
        building1.style.marginTop = `${Math.floor(-scrollY/16 + 600)}px`

        const building2 = document.getElementById('building-2-top')
        building2.style.marginTop = `${Math.floor(-scrollY/8 + 650)}px`

        const building3 = document.getElementById('building-3-top')
        building3.style.marginTop = `${Math.floor(-scrollY/14 + 450)}px`

        const building5 = document.getElementById('building-4-top')
        building5.style.marginTop = `${Math.floor(-scrollY/12 + 550)}px`

        const building7 = document.getElementById('right-border-building')
        building7.style.marginTop = `${Math.floor(-scrollY/6 + 650)}px`

        const building4 = document.getElementById('left-border-building')
        building4.style.marginTop = `${Math.floor(-scrollY/6 + 400)}px`
    }

    render() {
        return (
            <div>
                <div id='center-buildings'>
                    <div id='building-1'>
                        <div id='building-1-top' className='sprite'></div>
                        <div id='building-1-floors' className='sprite'></div>
                    </div>
                    <div id='building-2'>
                        <div id='building-2-top' className='sprite'></div>
                        <div id='building-2-floors' className='sprite'></div>
                    </div>
                    <div id='building-3'>
                        <div id='building-3-top' className='sprite'></div>
                        <div id='building-3-floors' className='sprite'></div>
                    </div>
                    <div id='building-4'>
                        <div id='building-4-top' className='sprite'></div>
                        <div id='building-4-floors' className='sprite'></div>
                    </div>
                </div>
                <div id='left-border-building'>
                    <div className='border-building-top sprite'></div>
                    <div className='border-building-floors sprite'></div>
                </div>
                <div id='right-border-building'>
                    <div className='border-building-top sprite'></div>
                    <div className='border-building-floors sprite'></div>
                </div>
            </div>
        );
    }
}