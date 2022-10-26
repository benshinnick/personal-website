import React from 'react';
import './TechInfoPanels.css';
import ProjectsPanel from './ProjectsPanel/ProjectsPanel';
import ExperiencePanel from './ExperiencePanel/ExperiencePanel';
import ContactPanel from './ContactPanel/ContactPanel';

const OFFSET_Y_PX = 700
const PANELS = ['about', 'projects', 'experience', 'contact']
var updateOnScroll = true
var currPanelIdx = 0
var lastScrollPos = 0
var totalPanelsHeight = 0

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
        for(let i = 0; i < PANELS.length; i++) {
            panelMaxHeights[i] = document.getElementById(`${PANELS[i]}-panel-content`).offsetHeight + 6
            document.getElementById(`${PANELS[i]}-panel-content-container`).style.height = `${panelMaxHeights[i]}px`
            panelCoverHeights[i] = document.getElementById(`${PANELS[i]}-title`).clientHeight + 16
            document.getElementById(`tech-${PANELS[i]}-panel`).style.opacity = 1
            document.getElementById(`tech-${PANELS[i]}-panel`).style.marginTop = '0px'
            panelCurrHeights[i] = panelMaxHeights[i]
            panelCurrOpacities[i] = 1
            panelTopMargins[i] = 0
        }

        setTotalPanelsHeight()
    }

    onPanelContentChange(panel) {
        const panelIdx = PANELS.indexOf(panel)
        panelMaxHeights[panelIdx] = document.getElementById(`${PANELS[panelIdx]}-panel-content`).offsetHeight + 6
        panelCoverHeights[panelIdx] = document.getElementById(`${PANELS[panelIdx]}-title`).clientHeight + 16
        document.getElementById(`tech-${PANELS[panelIdx]}-panel`).style.opacity = 1
        document.getElementById(`${PANELS[panelIdx]}-panel-content-container`).style.height = `${panelMaxHeights[panelIdx]}px`
        panelCurrHeights[panelIdx] = panelMaxHeights[panelIdx]
        if(panelIdx === currPanelIdx) {
            // this.scrollToTopOfPanel(panel)
            updateOnScroll = false
            panelTopMargins[panelIdx] = -1 * panelCoverHeights[currPanelIdx]
            let panelHeights = 0
            for(let i = 0; i < panelIdx; i++)
                panelHeights += panelMaxHeights[i] + panelCoverHeights[i]
            window.scrollTo({top: Math.floor((panelHeights)*8 + OFFSET_Y_PX), behavior: 'instant'})
            setTimeout(() => { updateOnScroll = true }, 20)
        }

        setTotalPanelsHeight()
        document.getElementById('filler-tech').style.height = `${getFillerSize()}px`
    }

    scrollToTopOfPanel(panel) {
        const panelIdx = PANELS.indexOf(panel)

        let panelHeights = 0
        for(let i = 0; i < panelIdx; i++)
            panelHeights += panelMaxHeights[i] + panelCoverHeights[i]
        const scrollPos = Math.floor((panelHeights)*8 + OFFSET_Y_PX)
        const maxScrollPos = document.getElementById('filler-tech').scrollHeight-window.innerHeight
        if(scrollPos <= maxScrollPos) {
            window.scrollTo({top: scrollPos, behavior: 'smooth'})
        } else {
            window.scrollTo({top: maxScrollPos, behavior: 'smooth'})
        }
    }

    getTotalPanelsHeight() {
        return totalPanelsHeight
    }

    onResize() {
        this.inititializePanelValues()
    }

    onScroll(scrollY) {
        let scrollPos = Math.floor((scrollY - OFFSET_Y_PX) / 8)
        if (scrollPos < 0) { scrollPos = 0 }
        let scrollDiff = Math.floor(scrollPos - lastScrollPos)

        if(updateOnScroll) {
            for(let i = 0; i < Math.abs(scrollDiff); i++) {
                if(scrollDiff < 0) {
                    updatePanelsOnScroll(lastScrollPos - i, -1)
                } else {
                    updatePanelsOnScroll(lastScrollPos + i, 1)
                }
            }
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
                            <div className='title' id='about-title' onClick={() => { this.scrollToTopOfPanel('about') }}>ABOUT ME</div>
                            <div className='info-panel-content-container' id='about-panel-content-container'>
                                <div className='info-panel-content' id='about-panel-content'>
                                <hr></hr>
                                <div id='panel-text'>
                                    I'm currently a senior majoring in Computer Science. I'm hoping to add another senternce or two here to lengthen this to paragraph length. I am passionate about using the tools and knowledge I have to create and work on products that will improve the lives of others.
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
                            <div className='title' id='projects-title' onClick={() => { this.scrollToTopOfPanel('projects') }}>PROJECTS</div>
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
                            <div className='title' id='experience-title' onClick={() => { this.scrollToTopOfPanel('experience') }}>EDUCATION AND EXPERIENCE</div>
                            <div className='info-panel-content-container' id='experience-panel-content-container'>
                                <ExperiencePanel />
                            </div>
                        </div>
                        <div className='tech-info-panel' id='tech-contact-panel'>
                            <div className='corner' id='top-right-corner'></div>
                            <div className='corner' id='bottom-right-corner'></div>
                            <div className='corner' id='bottom-left-corner'></div>
                            <div className='corner' id='top-left-corner'></div>
                            <div className='sides'></div>
                            <div className='title' id='contact-title' onClick={() => { this.scrollToTopOfPanel('contact') }}>CONTACT</div>
                            <div className='info-panel-content-container' id='contact-panel-content-container'>
                                <ContactPanel />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// same formula defied in Technical page. I'm too lazy to get that function right now
function getFillerSize() {
    return Math.floor(
        (totalPanelsHeight - (window.innerHeight - 150))*8 + window.innerHeight + 300
    )
}

function setTotalPanelsHeight() {
    totalPanelsHeight = 0
    for(let i = 0; i < PANELS.length; i++) {
        totalPanelsHeight += panelMaxHeights[i]
        totalPanelsHeight += panelCoverHeights[i]
        // totalPanelsHeight += panelTopMargins[i]
    }
}

// Handles the tech panels scrolling with sticky header and disappear effect
// Works for a variable number of panels
// It's an absolute mess that I'm hopping to clean up later
function updatePanelsOnScroll(scrollPos, scrollDiff) {
    panelCurrHeights[currPanelIdx] -= scrollDiff
    // Transition to previous panel
    if (panelCurrHeights[currPanelIdx] >= panelMaxHeights[currPanelIdx] || scrollPos === 0) {
        panelCurrHeights[currPanelIdx] = panelMaxHeights[currPanelIdx]
        if(currPanelIdx > 0) {
            document.getElementById(`${PANELS[currPanelIdx]}-panel-content-container`).style.height = `${panelCurrHeights[currPanelIdx]}px`
            currPanelIdx -= 1
        }
    }
    // Transition to next panel
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
    // In between transitions
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