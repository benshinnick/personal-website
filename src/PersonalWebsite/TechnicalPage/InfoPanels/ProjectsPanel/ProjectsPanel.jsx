import React from 'react';
import './ProjectsPanel.css';

export default class ProjectsPanel extends React.Component {

    projectDisplayOnClick(type, color) {
        let selectedElem = document.querySelector('.proj-selected')
        if(selectedElem === null) {
            document.getElementById(`${type}-display`).classList.add('proj-selected')
            document.getElementById('project-info-content').appendChild(this.getProjectInfoContentElememnt(type, color))
            this.props.onPanelContentChange('projects')
            return
        }
        selectedElem.className = 'project-display'
        removeAllChildNodes(document.getElementById('project-info-content'))
        if(selectedElem.id !== `${type}-display`) {
            document.getElementById(`${type}-display`).classList.add('proj-selected')
            document.getElementById('project-info-content').appendChild(this.getProjectInfoContentElememnt(type, color))
        }
        this.props.onPanelContentChange('projects')
    }

    getProjectInfoContentElememnt(type, color) {
        var content = document.createElement('div')
        content.className = 'project-info-content'
        var descriptionContainer = document.createElement('div')
        descriptionContainer.className = 'description-container'
        var headerText = document.createElement('div')
        headerText.className = 'project-info-header'
        var descriptionText = document.createElement('div')
        descriptionText.className = 'description-text'
        var githubContainer = document.createElement('div')
        githubContainer.className = 'github-container'
        var githubLinkIcon = document.createElement('a')
        githubLinkIcon.className = 'github-icon'
        // var githubBannerText = document.createElement('div')
        // githubBannerText.className = 'github-banner-text'

        content.style.borderColor = `rgba(${color}, 0.5)`
        content.style.backgroundColor = `rgba(${color}, 0.1)`
        githubContainer.style.backgroundColor = `rgba(${color}, 0.2)`

        if(type === 'algo-contest') {
            headerText.textContent = 'Algorithm Contest'
            descriptionText.textContent = 'React application for visualizing sorting and pathfinding algorithms competing agianst each other in real time. I built this project because all algorithm visualization tools I could find online made it difficult to compare different algorithms, especially for algorithms with similar time complexites. My goal with this project was to give people a good sense of which popular sorting and pathfinding algorithms perform better than other related algorithms.'
            githubLinkIcon.href = 'https://github.com/benshinnick'
        }
        else if(type === 'huddle') {
            headerText.textContent = 'Huddle (Twitter Clone)'
            descriptionText.textContent = 'A twitter clone written entirely in Java/JavaFX using WebSockets. It was created as a group project.'
            githubLinkIcon.href = 'https://github.com/benshinnick'
        }
        else if(type === 'miscellaneous') {
            headerText.textContent = 'Miscellaneous Projects'
            descriptionText.textContent = 'Here is just a few interesting school/smaller projects I have worked on in the past.'
            githubLinkIcon.href = 'https://github.com/benshinnick'
        }
        else if(type === 'personal-website') {
            headerText.textContent = 'Personal Site'
            descriptionText.textContent = 'You\'re looking at it! I\'ve had the idea for this site for a while, but only recently got around to making it. This website was a lot of work and I\'m really proud of some of the results I got.'
            githubLinkIcon.href = 'https://github.com/benshinnick'
        }
        if(type !== 'miscellaneous') {
            // githubBannerText.textContent = 'SOURCE\nCODE'
            // githubBannerText.style.color = `rgba(${color}, 1)`
            githubContainer.appendChild(githubLinkIcon)
            content.appendChild(githubContainer)
            // githubContainer.appendChild(githubBannerText)
        }

        descriptionContainer.appendChild(headerText)
        descriptionContainer.appendChild(descriptionText)
        content.prepend(descriptionContainer)
        return content
    }

    render() {
        return (
            <div className='info-panel-content' id='projects-panel-content'>
                <div id='project-icons'>
                    <div className='project-display' id='algo-contest-display' onClick={() => this.projectDisplayOnClick('algo-contest', '39, 219, 255')}>
                        <div id='algo-contest-icon' className='sprite project-icon' />
                        <div className='project-text'>AlgoContest</div>
                        <div className='arrow-icon'>&lt;</div>
                    </div>
                    <div className='project-display' id='huddle-display' onClick={() => this.projectDisplayOnClick('huddle', '209, 25, 4')}>
                        <div className='sprite project-icon' id='huddle-icon' />
                        <div className='project-text'>Huddle</div>
                        <div className='arrow-icon'>&lt;</div>
                    </div>
                    <div className='project-display' id='miscellaneous-display' onClick={() => this.projectDisplayOnClick('miscellaneous', '16, 148, 25')}>
                        <div className='sprite project-icon' id='miscellaneous-icon' />
                        <div className='project-text'>Miscellaneous</div>
                        <div className='arrow-icon'>&lt;</div>
                    </div>
                    <div className='project-display' id='personal-website-display' onClick={() => this.projectDisplayOnClick('personal-website', '52, 31, 140')}>
                        <div className='sprite project-icon' id='personal-website-icon' />
                        <div className='project-text'>Personal Site</div>
                        <div className='arrow-icon'>&lt;</div>
                    </div>
                </div>
                <div id='project-info-content'>
                </div>
            </div>
        );
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}