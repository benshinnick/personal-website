import React from 'react';
import './AboutPanel.css';
import './ConnectPanel.css';

export default class InfoPanels extends React.Component {
    render() {
        return (
            <div className='section'>
                <div className='container'>
                    <h2 id='greeting-text'>HI, I'M BEN!</h2>
                    <div className='about-panel'>
                        <div className='corner' id='top-right-corner'></div>
                        <div className='corner' id='bottom-right-corner'></div>
                        <div className='corner' id='bottom-left-corner'></div>
                        <div className='corner' id='top-left-corner'></div>
                        <div id='right-side'></div>
                        <div id='left-side'></div>
                        <div id='info-panel'></div>
                        {/* <h2 id='about-text'>
                        QUICK INTRODUCTION:<br></br>
                        - STUDENT<br></br>
                        - DEVELOPER<br></br>
                        - GOALS<br></br>
                        - INTERESTS<br></br>
                        <br></br>
                        EDUCATION:<br></br>
                        - CS @ UWF
                        </h2> */}
                    </div>
                    <div className='connect-panel'>
                        <div className='corner' id='top-right-corner'></div>
                        <div className='corner' id='bottom-right-corner'></div>
                        <div className='corner' id='bottom-left-corner'></div>
                        <div className='corner' id='top-left-corner'></div>
                        <div id='right-side'></div>
                        <div id='left-side'></div>
                        <div id='connect-info'></div>
                        <div id='info-panel'></div>
                        <a id='github-link' href='https://github.com/benshinnick'>
                            <div id='github-icon-base' className='icon-base'></div>
                            <svg id='github-icon' className='icon'></svg>
                        </a>
                        <a id='linked-in-link' href='https://www.linkedin.com/'>
                            <div id='linked-in-icon-base' className='icon-base'></div>
                            <svg id='linked-in-icon' className='icon'></svg>
                        </a>
                        <a id='email-link' href="mailto:shinnickbenjamin@gmail.com">
                            <div id='email-icon-base' className='icon-base'></div>
                            <svg id='email-icon' className='icon'></svg>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}