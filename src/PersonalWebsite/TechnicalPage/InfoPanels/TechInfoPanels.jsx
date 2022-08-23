import React from 'react';
import './TechInfoPanels.css';
import ProjectsPanel from './ProjectsPanel/ProjectsPanel';
import ExperiencePanel from './ExperiencePanel/ExperiencePanel';

const OFFSET_Y_PX = 700
const PANELS = ['about', 'projects', 'experience']
var updateOnScroll = true
var currPanelIdx = 0
var lastScrollPos = 0

var panelMaxHeights = []
var panelCoverHeights = []
var panelCurrHeights = []
var panelCurrOpacities = []
var panelTopMargins = []

export default class TechInfoPanels extends React.Component {

    componentDidMount() {
        this.inititializePanelValues()
    }

    inititializePanelValues() {
        currPanelIdx = 0
        for(var i = 0; i < PANELS.length; i++) {
            panelMaxHeights[i] = document.getElementById(`${PANELS[i]}-panel-content`).offsetHeight + 6
            document.getElementById(`${PANELS[i]}-panel-content-container`).style.height = `${panelMaxHeights[i]}px`
            panelCoverHeights[i] = document.getElementById(`${PANELS[i]}-title`).clientHeight + 28
            document.getElementById(`tech-${PANELS[i]}-panel`).style.opacity = 1
            document.getElementById(`tech-${PANELS[i]}-panel`).style.marginTop = '0px'
            panelCurrHeights[i] = panelMaxHeights[i]
            panelCurrOpacities[i] = 1
            panelTopMargins[i] = 0
        }
    }

    onPanelContentChange(panel) {
        const panelIdx = PANELS.indexOf(panel)
        panelMaxHeights[panelIdx] = document.getElementById(`${PANELS[panelIdx]}-panel-content`).offsetHeight + 6
        panelCoverHeights[panelIdx] = document.getElementById(`${PANELS[panelIdx]}-title`).clientHeight + 28
        document.getElementById(`tech-${PANELS[panelIdx]}-panel`).style.opacity = 1
        document.getElementById(`${PANELS[panelIdx]}-panel-content-container`).style.height = `${panelMaxHeights[panelIdx]}px`
        panelCurrHeights[panelIdx] = panelMaxHeights[panelIdx]
        if(panelIdx === currPanelIdx) {
            updateOnScroll = false
            let panelHeights = 0
            for(let i = 0; i < panelIdx; i++)
                panelHeights += panelMaxHeights[i] + panelCoverHeights[i]
            window.scrollTo(0, Math.floor((panelHeights)*6 + OFFSET_Y_PX))
            setTimeout(() => { updateOnScroll = true }, 20)
        }
    }

    onResize() {
        this.inititializePanelValues()
    }

    onScroll() {
        var scrollPos = Math.floor((window.scrollY - OFFSET_Y_PX) / 6)
        if (scrollPos < 0) { scrollPos = 0 }
        const scrollDiff = Math.floor(scrollPos - lastScrollPos)

        if(updateOnScroll) {
            updatePanelsOnScroll(scrollPos, scrollDiff)
        }
        lastScrollPos = scrollPos
    }

    render() {
        return (
            <div className='section'>
                <div className='container'>
                    <div id='technical-panels'>
                        <div className='tech-info-panel' id='tech-about-panel'>
                            <div className='corner' id='top-right-corner'></div>
                            <div className='corner' id='bottom-right-corner'></div>
                            <div className='corner' id='bottom-left-corner'></div>
                            <div className='corner' id='top-left-corner'></div>
                            <div className='sides'></div>
                            <div className='title' id='about-title'>ABOUT ME</div>
                            <div className='info-panel-content-container' id='about-panel-content-container'>
                                <div className='info-panel-content' id='about-panel-content'>
                                <hr></hr>
                                <div id='panel-text'>
                                    I'm currently a senior majoring in Computer Science. I am passionate about using the tools and knowledge I have to create and work on products that will improve the lives of others.
                                </div>
                                <hr></hr>
                                </div>
                            </div>
                        </div>
                        <div className='tech-info-panel' id='tech-projects-panel'>
                            <div className='corner' id='top-right-corner'></div>
                            <div className='corner' id='bottom-right-corner'></div>
                            <div className='corner' id='bottom-left-corner'></div>
                            <div className='corner' id='top-left-corner'></div>
                            <div className='sides'></div>
                            <div className='title' id='projects-title'>PROJECTS</div>
                            <div className='info-panel-content-container' id='projects-panel-content-container'>
                                    <ProjectsPanel onPanelContentChange = {this.onPanelContentChange} />
                            </div>
                        </div>
                        <div className='tech-info-panel' id='tech-experience-panel'>
                            <div className='corner' id='top-right-corner'></div>
                            <div className='corner' id='bottom-right-corner'></div>
                            <div className='corner' id='bottom-left-corner'></div>
                            <div className='corner' id='top-left-corner'></div>
                            <div className='sides'></div>
                            <div className='title' id='experience-title'>EDUCATION AND EXPERIENCE</div>
                            <div className='info-panel-content-container' id='experience-panel-content-container'>
                                <ExperiencePanel />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// Handles the tech panels scrolling with sticky header and disappear effect
// Works for a variable number of panels
// It's an absolute mess that I'm hopping to clean up later
function updatePanelsOnScroll(scrollPos, scrollDiff) {
    panelCurrHeights[currPanelIdx] -= scrollDiff
    if (panelCurrHeights[currPanelIdx] >= panelMaxHeights[currPanelIdx] || scrollPos === 0) {
        panelCurrHeights[currPanelIdx] = panelMaxHeights[currPanelIdx]
        if(currPanelIdx > 0) {
            document.getElementById(`${PANELS[currPanelIdx]}-panel-content-container`).style.height = `${panelCurrHeights[currPanelIdx]}px`
            currPanelIdx -= 1
        }
    }
    if (panelCurrHeights[currPanelIdx] <= 0 && currPanelIdx < PANELS.length - 1) {
        panelCurrHeights[currPanelIdx] = 0
        panelTopMargins[currPanelIdx+1] -= scrollDiff
        panelCurrOpacities[currPanelIdx] -= scrollDiff / (panelCoverHeights[currPanelIdx])
        if (Math.abs(panelTopMargins[currPanelIdx+1]) >= panelCoverHeights[currPanelIdx]) {
            panelTopMargins[currPanelIdx+1] = -1 * panelCoverHeights[currPanelIdx]
            if(panelCurrHeights[currPanelIdx] === 0) {
                panelCurrOpacities[currPanelIdx] = 0
                document.getElementById(`tech-${PANELS[currPanelIdx+1]}-panel`).style.marginTop = `${panelTopMargins[currPanelIdx+1]}px`
                document.getElementById(`${PANELS[currPanelIdx]}-panel-content-container`).style.height = `${panelCurrHeights[currPanelIdx]}px`
                document.getElementById(`tech-${PANELS[currPanelIdx]}-panel`).style.opacity = panelCurrOpacities[currPanelIdx]
                if(currPanelIdx < PANELS.length - 1) { currPanelIdx += 1; return }
            }
        }
        if (panelCurrOpacities[currPanelIdx] <= 0) { panelCurrOpacities[currPanelIdx] = 0 }
        document.getElementById(`tech-${PANELS[currPanelIdx+1]}-panel`).style.marginTop = `${panelTopMargins[currPanelIdx+1]}px`
        document.getElementById(`tech-${PANELS[currPanelIdx]}-panel`).style.opacity = panelCurrOpacities[currPanelIdx]
    }
    else {
        if (panelTopMargins[currPanelIdx+1] < 0 || panelCurrOpacities[currPanelIdx] < 1) {
            if(currPanelIdx < PANELS.length - 1) {
                panelTopMargins[currPanelIdx+1] -= scrollDiff
                panelCurrOpacities[currPanelIdx] -= scrollDiff / (panelCoverHeights[currPanelIdx])
                if (panelTopMargins[currPanelIdx+1] >= 0)
                    panelTopMargins[currPanelIdx+1] = 0
                else
                    panelCurrHeights[currPanelIdx] = 0
                if (panelCurrOpacities[currPanelIdx] >= 1)
                    panelCurrOpacities[currPanelIdx] = 1
                else
                    panelCurrHeights[currPanelIdx] = 0
                document.getElementById(`tech-${PANELS[currPanelIdx+1]}-panel`).style.marginTop = `${panelTopMargins[currPanelIdx+1]}px`
                document.getElementById(`tech-${PANELS[currPanelIdx]}-panel`).style.opacity = panelCurrOpacities[currPanelIdx]
            }
        }
}
    document.getElementById(`${PANELS[currPanelIdx]}-panel-content-container`).style.height = `${panelCurrHeights[currPanelIdx]}px`
}