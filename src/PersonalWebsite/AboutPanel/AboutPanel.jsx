import React from 'react';
import './AboutPanel.css';

export default class AboutPanel extends React.Component {
    render() {
        return (
            <div className='section'>
                <div className='container'>
                    <h2 id='greeting-text'>Hi, I'm Ben!</h2>
                    <div class='about-panel'>
                        <div className='corner' id='top-right-corner'></div>
                        <div className='corner' id='bottom-right-corner'></div>
                        <div className='corner' id='bottom-left-corner'></div>
                        <div className='corner' id='top-left-corner'></div>
                        <div id='right-side'></div>
                        <div id='left-side'></div>
                        <div id='info-panel'></div>
                        <h2 id='about-text'>
                        QUICK INTRODUCTION:<br></br>
                        - STUDENT<br></br>
                        - DEVELOPER<br></br>
                        - GOALS<br></br>
                        - INTERESTS<br></br>
                        <br></br>
                        EDUCATION:<br></br>
                        - CS @ UWF
                    </h2>
                    </div>
                    <div class='connect-panel'>
                        <div className='corner' id='top-right-corner'></div>
                        <div className='corner' id='bottom-right-corner'></div>
                        <div className='corner' id='bottom-left-corner'></div>
                        <div className='corner' id='top-left-corner'></div>
                        <div id='right-side'></div>
                        <div id='left-side'></div>
                        <div id='info-panel'></div>
                    </div>
                </div>
            </div>
        );
    }
}