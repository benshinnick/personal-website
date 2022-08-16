import React from 'react';
import './ProjectsPanel.css';

export default class ProjectsPanel extends React.Component {

    projectDisplayOnClick(type) {
        let selectedElem = document.querySelector('.proj-selected')
        if(selectedElem === null) {
            document.getElementById(`${type}-display`).classList.add('proj-selected')
            document.getElementById('project-info-content').appendChild(this.getProjectInfoContentElememnt(type))
            this.props.onPanelContentChange('projects')
            return
        }
        selectedElem.className = 'project-display'
        removeAllChildNodes(document.getElementById('project-info-content'))
        if(selectedElem.id !== `${type}-display`) {
            document.getElementById(`${type}-display`).classList.add('proj-selected')
            document.getElementById('project-info-content').appendChild(this.getProjectInfoContentElememnt(type))
        }
        this.props.onPanelContentChange('projects')
    }

    getProjectInfoContentElememnt(type) {
        var content = document.createElement('div')
        content.className = 'project-info-content'
        if(type === 'algo-contest') {
            content.style.borderColor = 'rgba(39, 219, 255, 0.5)'
            content.style.backgroundColor = 'rgba(39, 219, 255, 0.1)'
        }
        if(type === 'huddle') {
            content.style.borderColor = 'rgba(209, 25, 4, 0.5)'
            content.style.backgroundColor = 'rgba(209, 25, 4, 0.1)'
        }
        if(type === 'miscellaneous') {
            content.style.borderColor = 'rgba(16, 148, 25, 0.5)'
            content.style.backgroundColor = 'rgba(16, 148, 25, 0.1)'
        }
        if(type === 'personal-website') {
            content.style.borderColor = 'rgba(52, 31, 140, 0.5)'
            content.style.backgroundColor = 'rgba(52, 31, 140, 0.1)'
        }
        content.textContent =  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id ornare velit. Donec mollis vitae turpis non laoreet. Maecenas ac mauris non ante egestas tempus. Donec nisl enim, elementum non mauris sed, cursus dictum nisl. Nunc sed tortor pellentesque, elementum nulla id, ullamcorper urna. Curabitur nisi sem, tristique sed velit porta, molestie vulputate sem. Cras non tincidunt sapien. Nunc rhoncus tempus risus, at ornare sem interdum at. Donec rhoncus tortor justo. Praesent dignissim turpis pretium, volutpat sapien vitae, dapibus velit.'
        return content
    }

    render() {
        return (
            <div className='info-panel-content' id='projects-panel-content'>
                <div id='project-icons'>
                    <div className='project-display' id='algo-contest-display' onClick={() => this.projectDisplayOnClick('algo-contest')}>
                        <div id='algo-contest-icon' className='sprite project-icon' />
                        <div className='project-text'>AlgoContest</div>
                        <div className='arrow-icon'>&lt;</div>
                    </div>
                    <div className='project-display' id='huddle-display' onClick={() => this.projectDisplayOnClick('huddle')}>
                        <div className='sprite project-icon' id='huddle-icon' />
                        <div className='project-text'>Huddle</div>
                        <div className='arrow-icon'>&lt;</div>
                    </div>
                    <div className='project-display' id='miscellaneous-display' onClick={() => this.projectDisplayOnClick('miscellaneous')}>
                        <div className='sprite project-icon' id='miscellaneous-icon' />
                        <div className='project-text'>Miscellaneous</div>
                        <div className='arrow-icon'>&lt;</div>
                    </div>
                    <div className='project-display' id='personal-website-display' onClick={() => this.projectDisplayOnClick('personal-website')}>
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