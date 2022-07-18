import React from 'react';
import './InfoPanels.css';
import './AboutPanel.css';
import './ConnectPanel.css';

export default class InfoPanels extends React.Component {

    componentDidMount() {
        this.changeConnectInfoToDefault()
        this.typeGreetingText()
    }

    typeGreetingText() {
        let greetingText = 'HI, I\'M BEN!'
        for(let i = 0; i < greetingText.length; ++i) {
            if(greetingText.charAt(i) === ' ') {
                setTimeout(() => {
                    document.getElementById('greeting-text').innerHTML = document.getElementById('greeting-text').innerHTML + greetingText.charAt(i)
                }, (i) * 150)
            }
            setTimeout(() => {
                document.getElementById('greeting-text').innerHTML = document.getElementById('greeting-text').innerHTML + greetingText.charAt(i)
            }, (i+1) * 150)
        }
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
                    <div id='info-panels'>

                        <p id='greeting-text'></p>

                        <div className='text-panel' id='about-panel'>
                            <div className='corner' id='top-right-corner'></div>
                            <div className='corner' id='bottom-right-corner'></div>
                            <div className='corner' id='bottom-left-corner'></div>
                            <div className='corner' id='top-left-corner'></div>
                            <div className='sides'></div>
                            <hr></hr>
                                <div className='info-text' id='intro-text'>
                                I WILL ADD A ONE SENTENCE INTRODUCTION HERE LATER
                                </div>
                            <hr></hr>
                        </div>

                        <div className='text-panel' id='reach-out-panel'>
                            <div className='corner' id='top-right-corner'></div>
                            <div className='corner' id='bottom-right-corner'></div>
                            <div className='corner' id='bottom-left-corner'></div>
                            <div className='corner' id='top-left-corner'></div>
                            <div className='sides'></div>
                            <div className='info-text' id='reach-out-text'>
                                IF YOU WANT TO CHAT, DON'T HESITATE TO REACH OUT!<br></br>
                            </div>
                        </div>

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
                                    href='https://www.linkedin.com/'>
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
                    </div>
                </div>
            </div>
        );
    }
}