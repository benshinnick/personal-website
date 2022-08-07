import React from 'react';
import './TechInfoPanels.css';

const OFFSET_Y_PX = 700
var lastScrollPos = 0
var currentPanelFocus

var aboutPanelMaxHeight
var aboutPanelHeight
var projectsPanelMaxHeight
var projectsPanelHeight

export default class TechInfoPanels extends React.Component {

    componentDidMount() {
        currentPanelFocus = 'about'
        aboutPanelHeight = document.getElementById('about-panel-content').offsetHeight + 6
        aboutPanelMaxHeight = aboutPanelHeight
        document.getElementById('about-panel-content-container').style.height = `${aboutPanelHeight}px`

        projectsPanelHeight = document.getElementById('projects-panel-content').offsetHeight + 6
        projectsPanelMaxHeight = projectsPanelHeight
        document.getElementById('projects-panel-content-container').style.height = `${projectsPanelHeight}px`
    }

    onScroll() {
        var scrollPos = Math.floor((window.scrollY - OFFSET_Y_PX) / 6)
        if (scrollPos < 0) { scrollPos = 0 }
        const scrollDiff = Math.floor(scrollPos - lastScrollPos)

        if (currentPanelFocus === 'about') {
            aboutPanelHeight -= scrollDiff
            if (aboutPanelHeight >= aboutPanelMaxHeight || scrollPos === 0) {
                aboutPanelHeight = aboutPanelMaxHeight
            }
            else if (aboutPanelHeight < 0) {
                aboutPanelHeight = 0
                currentPanelFocus = 'projects'
            }
            document.getElementById('about-panel-content-container').style.height = `${aboutPanelHeight}px`
        }
        else if (currentPanelFocus === 'projects') {
            projectsPanelHeight -= scrollDiff
            if (projectsPanelHeight >= projectsPanelMaxHeight) {
                projectsPanelHeight = projectsPanelMaxHeight
                currentPanelFocus = 'about'
            }
            else if (projectsPanelHeight < 0) {
                projectsPanelHeight = 0
                currentPanelFocus = 'none'
            }
            document.getElementById('projects-panel-content-container').style.height = `${projectsPanelHeight}px`
        }
        lastScrollPos = scrollPos
    }

    render() {
        return (
            <div className='section'>
                <div className='container'>
                    <div id='technical-panels'>
                        <div className='tech-text-panel'>
                            <div className='corner' id='top-right-corner'></div>
                            <div className='corner' id='bottom-right-corner'></div>
                            <div className='corner' id='bottom-left-corner'></div>
                            <div className='corner' id='top-left-corner'></div>
                            <div className='sides'></div>
                            <div className='title'>ABOUT</div>
                            <div className='info-panel-content-container' id='about-panel-content-container'>
                                <div className='info-panel-content' id='about-panel-content'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id ornare velit. Donec mollis vitae turpis non laoreet. Maecenas ac mauris non ante egestas tempus. Donec nisl enim, elementum non mauris sed, cursus dictum nisl. Nunc sed tortor pellentesque, elementum nulla id, ullamcorper urna. Curabitur nisi sem.
                                </div>
                            </div>
                        </div>
                        <div className='tech-text-panel'>
                            <div className='corner' id='top-right-corner'></div>
                            <div className='corner' id='bottom-right-corner'></div>
                            <div className='corner' id='bottom-left-corner'></div>
                            <div className='corner' id='top-left-corner'></div>
                            <div className='sides'></div>
                            <div className='title'>PROJECTS</div>
                            <div className='info-panel-content-container' id='projects-panel-content-container'>
                                <div className='info-panel-content' id='projects-panel-content'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id ornare velit. Donec mollis vitae turpis non laoreet. Maecenas ac mauris non ante egestas tempus. Donec nisl enim, elementum non mauris sed, cursus dictum nisl. Nunc sed tortor pellentesque, elementum nulla id, ullamcorper urna. Curabitur nisi sem, tristique sed velit porta, molestie vulputate sem. Cras non tincidunt sapien. Nunc rhoncus tempus risus, at ornare sem interdum at. Donec rhoncus tortor justo. Praesent dignissim turpis pretium, volutpat sapien vitae, dapibus velit.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}