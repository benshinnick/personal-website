import React from 'react';
import './InfoPanels.css';
import ConnectPanel from './ConnectPanel/ConnectPanel';

export default class InfoPanels extends React.Component {

    componentDidMount() {
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
                                I WILL ADD A ONE SENTENCE<br></br>INTRODUCTION HERE LATER
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
                                IF YOU WANT TO CHAT, DON'T<br></br>HESITATE TO REACH OUT!<br></br>
                            </div>
                        </div>
                        <div id='home-connect-panel'>
                            <ConnectPanel />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}