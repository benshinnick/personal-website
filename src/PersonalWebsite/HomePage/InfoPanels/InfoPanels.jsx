import React from 'react';
import './AboutPanel.css';
import './ConnectPanel.css';

export default class InfoPanels extends React.Component {

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
        document.getElementById('underline').style.bottom = '17px'
        document.getElementById('underline').style.transform = 'scale(0, 1)';
    }

    changeConnectInfoToGithub() {
        document.getElementById('connect-info').className = 'github'
        document.getElementById('connect-text').className = 'white-text'
        document.getElementById('underline').style.bottom = '20px'
        document.getElementById('underline').style.transform = 'scale(1, 1)';
    }

    changeConnectInfoToLinkedIn() {
        document.getElementById('connect-info').className = 'linked-in'
        document.getElementById('connect-text').className = 'white-text'
        document.getElementById('underline').style.bottom = '20px'
        document.getElementById('underline').style.transform = 'scale(1, 1)';
    }

    changeConnectInfoToEmail() {
        document.getElementById('connect-info').className = 'email'
        document.getElementById('connect-text').className = 'white-text'
        document.getElementById('underline').style.bottom = '20px'
        document.getElementById('underline').style.transform = 'scale(1, 1)';
    }

    render() {
        return (
            <div className='section'>
                <div className='container'>
                    <p id='greeting-text'>HI, I'M BEN!</p>
                    <div className='about-panel'>
                        <div className='corner-scroll' id='top-right-corner'></div>
                        <div className='corner-scroll' id='bottom-right-corner'></div>
                        <div className='corner' id='bottom-left-corner'></div>
                        <div className='corner' id='top-left-corner'></div>
                        <div id='right-side'></div>
                        <div id='left-side'></div>
                        <div id='info-panel'></div>
                        <div id='content'>
                            <p id='about-text'>
                            {/* I like to work on projects that will improve the lives of others<br></br> */}
                            <hr></hr>
                            SOMETIMES I WORK ON COOL PROJECTS.<br></br>
                            {/* SOMETIMES I TRY TO WORK ON COOL PROJECTS.<br></br> */}
                            {/* I LIKE TO WORK ON COOL PROJECTS.<br></br> */}
                            <hr></hr>
                            <br></br>
                            {/* If you want to chat, don't hesitate to reach out!<br></br> */}
                            <hr></hr>
                            IF YOU WANT TO CHAT, DON'T HESITATE TO REACH OUT!<br></br>
                            <hr></hr>
                            <br></br>
                            EDUCATION<br></br>
                            CS - UWF<br></br>
                            </p>
                        </div>
                    </div>
                    <div className='connect-panel'>
                        <div className='corner' id='top-right-corner'></div>
                        <div className='corner' id='bottom-right-corner'></div>
                        <div className='corner' id='bottom-left-corner'></div>
                        <div className='corner' id='top-left-corner'></div>
                        <div id='right-side'></div>
                        <div id='left-side'></div>
                        <div id='divider'></div>
                        <div id='connect-info' className='default'>
                            <p id='connect-text' className='black-text'>CONNECT WITH ME</p>
                            <div id='underline'></div>
                        </div>
                        <div id='info-panel'></div>
                        <div id='link-icons'>
                            <a id='github-icon' className='icon' onMouseOver={this.changeConnectInfoToGithub} onMouseLeave={this.changeConnectInfoToDefault} href='https://github.com/benshinnick'>
                                <span>Personal GitHub Page</span>
                            </a>
                            <a id='linked-in-icon' className='icon' onMouseOver={this.changeConnectInfoToLinkedIn} onMouseLeave={this.changeConnectInfoToDefault} href='https://www.linkedin.com/'>
                                <span>Personal LinkedIn Page</span>
                            </a>
                            <a id='email-icon' className='icon' onMouseOver={this.changeConnectInfoToEmail} onMouseLeave={this.changeConnectInfoToDefault} href="mailto:shinnickbenjamin@gmail.com">
                                <span>Personal Email Link</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}