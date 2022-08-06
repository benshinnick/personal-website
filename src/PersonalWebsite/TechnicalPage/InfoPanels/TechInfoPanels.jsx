import React from 'react';
import './AboutPanel.css';

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

                    <div className='tech-text-panel' id='projects-panel'>
                        <div className='corner' id='top-right-corner'></div>
                        <div className='corner' id='bottom-right-corner'></div>
                        <div className='corner' id='bottom-left-corner'></div>
                        <div className='corner' id='top-left-corner'></div>
                        <div className='sides'></div>
                        <hr></hr>
                            <div className='tech-info-text' id='intro-text'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id ornare velit. Donec mollis vitae turpis non laoreet. Maecenas ac mauris non ante egestas tempus. Donec nisl enim, elementum non mauris sed, cursus dictum nisl. Nunc sed tortor pellentesque, elementum nulla id, ullamcorper urna. Curabitur nisi sem, tristique sed velit porta, molestie vulputate sem. Cras non tincidunt sapien. Nunc rhoncus tempus risus, at ornare sem interdum at. Donec rhoncus tortor justo. Praesent dignissim turpis pretium, volutpat sapien vitae, dapibus velit.
                            </div>
                        <hr></hr>
                    </div>
                    
                </div>
            </div>
        );
    }
}