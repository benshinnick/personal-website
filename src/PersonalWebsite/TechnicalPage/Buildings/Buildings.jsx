import React from 'react';
import './Buildings.css';

export default class Buildings extends React.Component {
    render() {
        return (
            <div>
                <div id='right-buildings'>
                    <div id='building-1' className='sprite'></div>
                    <div id='building-2' className='sprite'></div>
                    <div id='building-3' className='sprite'></div>
                </div>
                <div id='building-4' className='sprite'></div>
            </div>
        );
    }
}