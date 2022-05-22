import React from 'react';
import './Clouds.css';

export default class Clouds extends React.Component {
    render() {
        return (
            <div>
                <canvas className='sprite medium-cloud'></canvas>
                <canvas className='sprite medium-large-cloud'></canvas>
            </div>
        );
    }
}