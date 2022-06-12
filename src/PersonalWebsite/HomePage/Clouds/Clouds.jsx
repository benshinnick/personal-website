import React from 'react';
import './Clouds.css';

export default class Clouds extends React.Component {
    render() {
        return (
            <div id='clouds'>
                <canvas className='sprite cloud large' id='large-1'></canvas>
                <canvas className='sprite cloud large' id='large-2'></canvas>
                <canvas className='sprite cloud large' id='large-3'></canvas>
                <canvas className='sprite cloud large' id='large-4'></canvas>
                <canvas className='sprite cloud large' id='large-5'></canvas>
                <canvas className='sprite cloud large' id='large-6'></canvas>

                <canvas className='sprite cloud medium' id='medium-1'></canvas>
                <canvas className='sprite cloud medium' id='medium-2'></canvas>
                <canvas className='sprite cloud medium' id='medium-3'></canvas>
                <canvas className='sprite cloud medium' id='medium-4'></canvas>
                <canvas className='sprite cloud medium' id='medium-5'></canvas>
                <canvas className='sprite cloud medium' id='medium-6'></canvas>
                <canvas className='sprite cloud medium' id='medium-7'></canvas>
                <canvas className='sprite cloud medium' id='medium-8'></canvas>

                <canvas className='sprite cloud small' id='small-1'></canvas>
                <canvas className='sprite cloud small' id='small-2'></canvas>
                <canvas className='sprite cloud small' id='small-3'></canvas>
                <canvas className='sprite cloud small' id='small-4'></canvas>
                <canvas className='sprite cloud small' id='small-5'></canvas>
                <canvas className='sprite cloud small' id='small-6'></canvas>
                <canvas className='sprite cloud small' id='small-7'></canvas>
                <canvas className='sprite cloud small' id='small-8'></canvas>
                <canvas className='sprite cloud small' id='small-9'></canvas>
                <canvas className='sprite cloud small' id='small-10'></canvas>
                <canvas className='sprite cloud small' id='small-11'></canvas>
            </div>
        );
    }
}