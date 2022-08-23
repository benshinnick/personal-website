import React from 'react';
import './ExperiencePanel.css';

export default class ExperiencePanel extends React.Component {

    render() {
        return (
            <div className='info-panel-content' id='experience-panel-content'>
                <hr></hr>
                <div id='uwf-logo'></div>
                <div id='ihmc-logo'></div>
                <div id='panel-text'>
                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id ornare velit. Donec mollis vitae turpis non laoreet. Maecenas ac mauris non ante egestas tempus. Okay */}
                </div>
                <hr></hr>
            </div>
        );
    }
}