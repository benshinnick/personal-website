import React from 'react';
import './AboutPanel.css';

export default class AboutPanel extends React.Component {
    render() {
        return (
            <div className='section'>
                <div className='container'>
                    <div id='about-panel'>
                        <div className='corner' id='top-right-corner'></div>
                        <div className='corner' id='bottom-right-corner'></div>
                        <div className='corner' id='bottom-left-corner'></div>
                        <div className='corner' id='top-left-corner'></div>
                        <div id='right-side'></div>
                        <div id='left-side'></div>
                        <div id="info-panel"></div>
                    </div>
                </div>
            </div>
        );
    }
}