import React from 'react';
import './ExperiencePanel.css';

export default class ExperiencePanel extends React.Component {

    render() {
        return (
            <div className='info-panel-content' id='experience-panel-content'>
                {/* <hr></hr> */}
                <div className='exp-container'>
                    <div className='left-border'></div>
                    <div id='uwf-logo'></div>
                    <div className='exp-summary'> 
                        <div className='exp-title'>University Of West Florida</div>
                        <div className='exp-subtitle'>B.S. Computer Science<br></br>2020 - 2023</div>
                    </div>
                    <div className='right-border'></div>
                </div>
                <div className='exp-container'>
                    <div className='left-border'></div>
                    <div id='ihmc-logo'></div>
                    <div className='exp-summary'> 
                        <div className='exp-title'>IHMC</div>
                        <div className='exp-subtitle'>Software Engineer Intern<br></br>Summer 2022 - Present</div>
                    </div>
                    <div className='right-border'></div>
                </div>
                {/* <hr></hr> */}
            </div>
        );
    }
}