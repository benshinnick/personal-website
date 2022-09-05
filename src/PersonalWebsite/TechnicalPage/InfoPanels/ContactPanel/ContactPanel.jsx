import React from 'react';
import './ContactPanel.css';
import ConnectPanel from '../../../HomePage/InfoPanels/ConnectPanel/ConnectPanel';

export default class ContactPanel extends React.Component {

    render() {
        return (
            <div className='info-panel-content' id='contact-panel-content'>
                <hr></hr>
                <div id='panel-text'>
                    I would be happy to further discuss my experiences with you, simply shoot me an email or message me on LinkedIn!
                </div>
                <hr></hr>
                <div id='email-line'>
                    <div className='email-icons' id='left-icons'>E F N</div>
                    <div id='email-text'>Email: shinnickbenjamin@gmail</div>
                    <div className='email-icons' id='right-icons'>a s W</div>
                </div>
                <hr></hr>
                <ConnectPanel />
                <hr></hr>
            </div>
        );
    }
}