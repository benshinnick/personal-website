import React from 'react';
import './AboutPanel.css';

export default class AboutPanel extends React.Component {
    render() {
        return (
            <div className='section'>
                <div className='container'>
                    <h2 id='greeting-text'>Hi, I'm Ben!</h2>
                    <h2 id='about-text'>
                    QUICK INTRODUCTION:<br></br>
                    - STUDENT<br></br>
                    - DEVELOPER<br></br>
                    - GOALS<br></br>
                    - INTERESTS<br></br>
                    <br></br>
                    EDUCATION:<br></br>
                    - University Of West Florida<br></br>
                    - B.S. in Computer Science<br></br>
                    - 2020 - 2023<br></br>
                    </h2>
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