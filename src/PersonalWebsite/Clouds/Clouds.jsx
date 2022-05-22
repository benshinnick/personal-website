import React from 'react';
import './Clouds.css';

export default class Clouds extends React.Component {
    render() {
        return (
            <div id='clouds'>
                <canvas className='sprite cloud large' id='large-1'></canvas>
                <canvas className='sprite cloud large' id='large-2'></canvas>
                <canvas className='sprite cloud medium' id='medium-1'></canvas>
                <canvas className='sprite cloud medium' id='medium-2'></canvas>
                <canvas className='sprite cloud small' id='small-1'></canvas>
                <canvas className='sprite cloud small' id='small-2'></canvas>
                <canvas className='sprite cloud small' id='small-3'></canvas>
            </div>
        );
    }
}