import React from 'react';
import './Buildings.css';

var building1margin
var building2margin
var building3margin
var building4margin
var building5margin
var building7margin

export default class Buildings extends React.Component {

    componentDidMount() {
        this.onScroll()
    }

    onScroll() {
        const building1 = document.getElementById('building-1-top')
        building1margin = -window.scrollY/16 + 600
        building1.style.marginTop = `${building1margin}px`

        const building2 = document.getElementById('building-2-top')
        building2margin = -window.scrollY/8 + 650
        building2.style.marginTop = `${building2margin}px`

        const building3 = document.getElementById('building-3-top')
        building3margin = -window.scrollY/14 + 450
        building3.style.marginTop = `${building3margin}px`

        const building5 = document.getElementById('building-4-top')
        building5margin = -window.scrollY/12 + 550
        building5.style.marginTop = `${building5margin}px`

        const building7 = document.getElementById('right-border-building')
        building7margin = -window.scrollY/6 + 650
        building7.style.marginTop = `${building7margin}px`

        const building4 = document.getElementById('left-border-building')
        building4margin = -window.scrollY/6 + 400
        building4.style.top = `${building4margin}px`
    }

    render() {
        return (
            <div>
                <div id='right-buildings'>
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