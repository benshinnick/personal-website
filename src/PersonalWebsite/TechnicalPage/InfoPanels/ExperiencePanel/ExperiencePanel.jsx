import React from 'react';
import './ExperiencePanel.css';

var selectedCard = ''

export default class ExperiencePanel extends React.Component {

    componentDidMount() {
        this.selectCard('ihmc')
    }

    expCardOnClick(type) {
        this.selectCard(type)
    }

    expCardOnHover(type) {
        let card = document.getElementById(`${selectedCard}-card`)
        card.style.marginLeft = '4px'
        this.selectCard(type)
    }

    expCardOnLeave(type) {
        if(type !== selectedCard) {
            let card = document.getElementById(`${type}-card`)
            card.style.marginLeft = '4px'
            card = document.getElementById(`${selectedCard}-card`)
            card.style.marginLeft = '16px'
        }
    }

    selectCard(type) {
        let card = document.getElementById(`${type}-card`)
        card.style.marginLeft = '16px'
        selectedCard = type

        let title = ''
        let description = ''
        let container = document.getElementById('exp-info-section')
        if(type === 'uwf') {
            title = 'University of West Florida'
            description = 'Concentation in Software Engineering. More about my time at UWF and what I did. More text to fill space. I would like 3-5 sentences here explaining stuff. Maybe timelines or other stuff?'
            container.style.backgroundColor = 'rgba(21, 144, 206, 0.075)'
            container.style.borderColor = 'rgba(21, 144, 206, 0.75)'
        }
        if(type === 'ihmc') {
            title = 'Institute for Human and Machine Cognition'
            description = 'More about my time at IHMC and what I did, I have a lot to say, but just want placeholder text here now. I will do other stuff later.'
            container.style.backgroundColor = 'rgba(0, 0, 0, 0.05)'
            container.style.borderColor = 'rgb(0, 0, 0)'
        }

        document.getElementById('title-text').textContent = title
        document.getElementById('description-container').textContent = description
    }

    render() {
        return (
            <div className='info-panel-content' id='experience-panel-content'>
                {/* <hr></hr> */}
                <div id='exp-title-cards'>
                    <div
                        className='exp-container'
                        id='uwf-card' onClick={() => this.expCardOnClick('uwf')}
                        onMouseOver={() => this.expCardOnHover('uwf')}
                        onMouseLeave={() => this.expCardOnLeave('uwf')}
                    >
                        <div className='title-card-filler'></div>
                        <div className='left-border'></div>
                        <div id='uwf-logo'></div>
                        <div className='exp-summary'> 
                            <div className='exp-title long-title'>University of West Florida</div>
                            <div className='exp-subtitle long-description'>B.S. Computer Science<br></br>2020 - 2023</div>
                            <div className='exp-title short-title'>University of West Florida</div>
                            <div className='exp-subtitle short-description'>B.S. Computer Science<br></br>2020 - 2023</div>
                        </div>
                        <div className='right-border'></div>
                    </div>
                    <div 
                        className='exp-container'
                        id='ihmc-card' onClick={() => this.expCardOnClick('ihmc')}
                        onMouseOver={() => this.expCardOnHover('ihmc')}
                        onMouseLeave={() => this.expCardOnLeave('ihmc')}
                    >
                        <div className='title-card-filler'></div>
                        <div className='left-border'></div>
                        <div id='ihmc-logo'></div>
                        <div className='exp-summary'> 
                            <div className='exp-title long-title'>IHMC</div>
                            <div className='exp-subtitle long-description'>Software Engineer Intern<br></br>Summer 2022 - Present</div>
                            <div className='exp-title short-title'>IHMC Intern</div>
                            <div className='exp-subtitle short-description'>Software Engineering<br></br>May 2022 - Present</div>
                        </div>
                        <div className='right-border'></div>
                    </div>
                </div>
                <div id='divider'></div>
                <hr className='vert-divider'></hr>
                <div id='exp-info-section'>
                    <div id='title-text'/>
                    <div id='description-container'/>
                </div>
                <hr className='vert-divider' id='bottom-divider'></hr>
            </div>
        );
    }
}