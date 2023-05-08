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

        content.style.borderColor = `rgba(${color}, 0.5)`
        content.style.backgroundColor = `rgba(${color}, 0.1)`
        githubContainer.style.backgroundColor = `rgba(${color}, 0.3)`

        if(type === 'algo-contest') {
            headerText.textContent = 'Algorithm Contest'
            var linkContainer = document.createElement('div')
            linkContainer.textContent = 'Check Out The Deployed Site '
            linkContainer.className = 'link-container'
            var deployedSiteLink = document.createElement('a')
            deployedSiteLink.className = 'link'
            deployedSiteLink.textContent = 'Here'
            deployedSiteLink.href = 'https://benshinnick.github.io/algorithm-contest'
            linkContainer.appendChild(deployedSiteLink)
            descriptionContainer.appendChild(linkContainer)

            descriptionText.textContent = 'Web Application built with React for visualizing sorting and pathfinding algorithms competing agianst each other in real time.'
            githubLinkIcon.href = 'https://github.com/benshinnick'
        }
        else if(type === 'huddle') {
            headerText.textContent = 'Huddle (Twitter Clone)'
            descriptionText.textContent = 'A twitter clone written entirely in Java/JavaFX using WebSockets. It was created as a group project where I worked on everything from designing the Client/Server communication to styling the various different pages of the app.'
            githubLinkIcon.href = 'https://github.com/benshinnick'
        }
        else if(type === 'miscellaneous') {
            // list of [project_title, github_link, language]
            var projects = [
                ['Restaurant Recommender', 'https://github.com/benshinnick', 'Kotlin'],
                ['Traveling Salesperson Genetic Algorithm Solution', 'https://github.com/benshinnick', 'C++'],
                ['Longest Common Subsequence Solver', 'https://github.com/benshinnick', 'C++'],
                ['FSA Drawer And Checker', 'https://github.com/benshinnick', 'Python'],
                ['Semantic Checker And Code Generator', 'https://github.com/benshinnick', 'C'],
                ['Internet Tic-Tac-Toe', 'https://github.com/benshinnick', 'Java']
            ]
            // var projectContainer = document.createElement('div')
            for(let i = 0; i < projects.length; ++i) {
                var container = document.createElement('div')
                container.textContent = '- '
                container.className = 'misc-project-container'
                var title = document.createElement('a')
                title.className = 'misc-project-text'
                title.textContent = projects[i][0]
                title.href = projects[i][1]
                var description = document.createElement('div')
                description.className = 'misc-project-text'
                description.textContent = '(' + projects[i][2] + ')'

                container.appendChild(title)
                container.appendChild(description)
                descriptionContainer.appendChild(container)
            }
            headerText.textContent = 'Miscellaneous Projects'
            descriptionText.textContent = 'Here is just a few school/smaller projects I have worked on in the past.'
            githubLinkIcon.href = 'https://github.com/benshinnick'
        }
        else if(type === 'personal-website') {
            headerText.textContent = 'Personal Site'
            descriptionText.textContent = 'You\'re looking at it! I\'ve had the idea for this site for a while, but only recently got around to making it. This website was a lot of work and I\'m really proud of the result.'
            githubLinkIcon.href = 'https://github.com/benshinnick'
        }
        githubContainer.appendChild(githubLinkIcon)
        content.appendChild(githubContainer)

        descriptionContainer.prepend(descriptionText)
        descriptionContainer.prepend(headerText)
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
                    <div className='project-display' id='miscellaneous-display' onClick={() => this.projectDisplayOnClick('miscellaneous', '52, 31, 140')}>
                        <div className='sprite project-icon' id='miscellaneous-icon' />
                        <div className='project-text'>Miscellaneous</div>
                        <div className='arrow-icon'>&lt;</div>
                    </div>
                    <div className='project-display' id='personal-website-display' onClick={() => this.projectDisplayOnClick('personal-website', '16, 148, 25')}>
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