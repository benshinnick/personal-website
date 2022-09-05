import React from 'react';
import './ContactPanel.css';

export default class ContactPanel extends React.Component {

    render() {
        return (
            <div className='info-panel-content' id='contact-panel-content'>
                <hr></hr>
                <div id='panel-text'>
                    I would be happy to further discuss my experiences with you, simply shoot me an email or message me on LinkedIn!
                </div>
                <hr></hr>
            </div>
        );
    }
}