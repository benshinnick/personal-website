import React from 'react';
import './Buildings.css';

export default class Buildings extends React.Component {

    componentDidMount() {
        this.onScroll(700)
    }

    onScroll(scrollY) {

        // const building3 = document.getElementById('building-3-top')
        // building3.style.marginTop = `${Math.floor(-scrollY/14 + 450)}px`

        // const building5 = document.getElementById('building-4-top')
        // building5.style.marginTop = `${Math.floor(-scrollY/12 + 550)}px`

        const left1 = document.getElementById('left-border-building-1')
        left1.style.marginTop = `${Math.floor(-scrollY/6 + 550)}px`

        const left2 = document.getElementById('left-border-building-2')
        left2.style.marginTop = `${Math.floor(-scrollY/16 + 600)}px`
        
        const right1 = document.getElementById('right-border-building-1')
        right1.style.marginTop = `${Math.floor(-scrollY/10 + 600)}px`

        const right2 = document.getElementById('right-border-building-2')
        right2.style.marginTop = `${Math.floor(-scrollY/8 + 450)}px`

        // const building4 = document.getElementById('left-border-building')
        // building4.style.marginTop = `${Math.floor(-scrollY/6 + 400)}px`
    }

    render() {
        return (
            <div>
                <div id='center-buildings'>
                    {/* <div id='building-1'>
                        <div id='building-1-top' className='sprite'></div>
                        <div id='building-1-floors' className='sprite'></div>
                    </div>
                    <div id='building-2'>
                        <div id='building-2-top' className='sprite'></div>
                        <div id='building-2-floors' className='sprite'></div>
                    </div>
                    <div id='building-4'>
                        <div id='building-4-top' className='sprite'></div>
                        <div id='building-4-floors' className='sprite'></div>
                    </div> */}
                </div>
                <div id='left-border-buildings'>
                    <div id='left-border-building-1'>
                        <div className='building-4-top sprite'></div>
                        <div className='building-4-floors sprite'></div>
                    </div>
                    <div id='left-border-building-2'>
                            <div id='building-2-top' className='sprite'></div>
                            <div id='building-2-floors' className='sprite'></div>
                    </div>
                </div>
                <div id='right-border-buildings'>
                    <div id='right-border-building-1'>
                        <div id='building-1-top' className='sprite'></div>
                        <div id='building-1-floors' className='sprite'></div>
                    </div>
                    <div id='right-border-building-2'>
                            <div id='building-3-top' className='sprite'></div>
                            <div id='building-3-floors' className='sprite'></div>
                    </div>
                </div>

                {/* <div id='right-border-building'>
                    <div className='border-building-top sprite'></div>
                    <div className='border-building-floors sprite'></div>
                </div> */}
            </div>
        );
    }
}