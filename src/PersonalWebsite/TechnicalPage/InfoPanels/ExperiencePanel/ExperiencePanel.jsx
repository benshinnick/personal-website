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

        document.getElementById('exp-info-section').textContent = type
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
                            <div className='exp-title'>University Of West Florida</div>
                            <div className='exp-subtitle'>B.S. Computer Science<br></br>2020 - 2023</div>
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
                            <div className='exp-title'>IHMC</div>
                            <div className='exp-subtitle'>Software Engineer Intern<br></br>Summer 2022 - Present</div>
                        </div>
                        <div className='right-border'></div>
                    </div>
                    {/* <div
                        className='exp-container'
                        id='other-card' onClick={() => this.expCardOnClick('other')}
                        onMouseOver={() => this.expCardOnHover('other')}
                        onMouseLeave={() => this.expCardOnLeave('other')}
                    >
                        <div className='title-card-filler'></div>
                        <div className='left-border'></div>
                        <div id='uwf-logo'></div>
                        <div className='exp-summary'> 
                            <div className='exp-title'>University Of West Florida</div>
                            <div className='exp-subtitle'>B.S. Computer Science<br></br>2020 - 2023</div>
                        </div>
                        <div className='right-border'></div>
                    </div> */}
                </div>
                <div id='divider'></div>
                <div id='exp-info-section'></div>
                {/* <hr></hr> */}
            </div>
        );
    }
}