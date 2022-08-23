import React from 'react';
import './ExperiencePanel.css';

export default class ExperiencePanel extends React.Component {

    render() {
        return (
            <div className='info-panel-content' id='experience-panel-content'>
                {/* <hr></hr> */}
                <div className='exp-container'>
                    <div id='uwf-logo'></div>
                    <div className='exp-summary'> 
                        <div className='exp-title'>University Of West Florida</div>
                        <div className='exp-suptitle'>This that 2101-1293</div>
                    </div>
                </div>
                <div className='exp-container'>
                    <div id='ihmc-logo'></div>
                    <div className='exp-summary'> 
                        <div className='exp-title'>IHMC</div>
                        <div className='exp-suptitle'>This that 2101-1293</div>
                    </div>
                </div>
                {/* <hr></hr> */}
            </div>
        );
    }
}