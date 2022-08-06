import React from 'react';
import './AboutPanel.css';
import TextPanel from './TextPanel/TextPanel'

export default class TechInfoPanels extends React.Component {

    componentDidMount() {
        // this.changeConnectInfoToDefault()
    }

    // typeGreetingText() {
    //     let greetingText = 'HI, I\'M BEN!'
    //     for(let i = 0; i < greetingText.length; ++i) {
    //         if(greetingText.charAt(i) === ' ') {
    //             setTimeout(() => {
    //                 document.getElementById('greeting-text').innerHTML = document.getElementById('greeting-text').innerHTML + greetingText.charAt(i)
    //             }, (i) * 150)
    //         }
    //         setTimeout(() => {
    //             document.getElementById('greeting-text').innerHTML = document.getElementById('greeting-text').innerHTML + greetingText.charAt(i)
    //         }, (i+1) * 150)
    //     }
    // }

    render() {
        return (
            <div className='section'>
                <div className='container'>
                    <TextPanel ></TextPanel>
                </div>
            </div>
        );
    }
}