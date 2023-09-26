import React from 'react';
import './ConnectPanel.css';

export default class ConnectPanel extends React.Component {

    componentDidMount() {
        this.changeConnectInfoToDefault()
    }

    changeConnectInfoToDefault() {
        let applied = document.getElementById('connect-info').className
        if(applied === 'github') { document.getElementById('connect-info').className = 'default-github' }
        else if(applied === 'linked-in') { document.getElementById('connect-info').className = 'default-linked-in' }
        else if(applied === 'email') { document.getElementById('connect-info').className = 'default-email' }
        else { document.getElementById('connect-info').className = 'default' }
        document.getElementById('connect-text').className = 'black-text'
        document.getElementById('underline').className = 'down'
        document.getElementById('underline').style.bottom = '12px'
        document.getElementById('underline').style.transform = 'scale(0, 1)';
    }

    changeConnectInfoToGithub() {
        document.getElementById('connect-info').className = 'github'
        document.getElementById('connect-text').className = 'white-text'
        document.getElementById('underline').style.bottom = '15px'
        document.getElementById('underline').style.transform = 'scale(1, 1)';
    }

    changeConnectInfoToLinkedIn() {
        document.getElementById('connect-info').className = 'linked-in'
        document.getElementById('connect-text').className = 'white-text'
        document.getElementById('underline').style.bottom = '15px'
        document.getElementById('underline').style.transform = 'scale(1, 1)';
    }

    changeConnectInfoToEmail() {
        document.getElementById('connect-info').className = 'email'
        document.getElementById('connect-text').className = 'white-text'
        document.getElementById('underline').style.bottom = '15px'
        document.getElementById('underline').style.transform = 'scale(1, 1)';
    }

    render() {
        return (
            <div className='connect-panel'>
                <div className='corner' id='top-right-corner'></div>
                <div className='corner' id='bottom-right-corner'></div>
                <div className='corner' id='bottom-left-corner'></div>
                <div className='corner' id='top-left-corner'></div>
                <div className='sides'></div>
                <div id='divider'></div>
                <div id='connect-info' className='default'>
                    <p id='connect-text' className='black-text'>CONNECT WITH ME</p>
                    <div id='underline'></div>
                </div>
                <div id='info-panel'></div>
                <div id='link-icons'>
                    <a id='github-icon' className='icon'
                        onMouseOver={this.changeConnectInfoToGithub}
                        onMouseLeave={this.changeConnectInfoToDefault}
                        href='https://github.com/benshinnick'>
                        <span>Personal GitHub Page</span>
                    </a>
                    <a id='linked-in-icon' className='icon'
                        onMouseOver={this.changeConnectInfoToLinkedIn}
                        onMouseLeave={this.changeConnectInfoToDefault}
                        href='https://www.linkedin.com/in/benshinnick'>
                        <span>Personal LinkedIn Page</span>
                    </a>
                    <a id='email-icon' className='icon'
                        onMouseOver={this.changeConnectInfoToEmail}
                        onMouseLeave={this.changeConnectInfoToDefault}
                        href="mailto:shinnickbenjamin@gmail.com">
                        <span>Personal Email Link</span>
                    </a>
                </div>
            </div>
        );
    }
}