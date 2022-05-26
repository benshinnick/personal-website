import React from 'react';
import './Stars.css';

export default class Stars extends React.Component {

    componentDidMount() {

    }

    render() {
        return (
            <div id='stars'>
                <div className='sprite star' id='star-1'></div>
                <div className='sprite star' id='star-2'></div>
                <div className='sprite star' id='star-3'></div>
            </div>
        );
    }
}