import React from 'react';
import './Buildings.css';

export default class Buildings extends React.Component {
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
                </div>
                <div id='building-4'>
                    <div id='building-4-top' className='sprite'></div>
                    <div id='building-4-floors' className='sprite'></div>
                </div>
            </div>
        );
    }
}