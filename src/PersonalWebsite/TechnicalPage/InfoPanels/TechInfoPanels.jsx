import React from 'react';
import './TechInfoPanels.css';
import ProjectsPanel from './ProjectsPanel/ProjectsPanel';
import ExperiencePanel from './ExperiencePanel/ExperiencePanel';
import ContactPanel from './ContactPanel/ContactPanel';

var IGNORE_END_Y_PX
var OFFSET_Y_PX = 700
const PANELS = ['about', 'experience', 'projects', 'contact']
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
            panelCoverHeights[i] = document.getElementById(`${PANELS[i]}-title`).clientHeight + 17
            document.getElementById(`tech-${PANELS[i]}-panel`).style.opacity = 1
            document.getElementById(`tech-${PANELS[i]}-panel`).style.marginTop = '0px'
            panelCurrHeights[i] = panelMaxHeights[i]
            panelCurrOpacities[i] = 1
            panelTopMargins[i] = 0
        }

        setTotalPanelsHeight()
        document.getElementById('filler-tech').style.height = `${getFillerSize()}px`
        if(calcFillerSize() < window.innerHeight + OFFSET_Y_PX) {
            document.getElementById('center-column-vert').style.height = `${totalPanelsHeight-13}px`
            document.getElementById('center-column-horiz').style.height = `${totalPanelsHeight-13}px`
        }
        else {
            document.getElementById('center-column-vert').style.height = ""
            document.getElementById('center-column-horiz').style.height = ""
        }
    }

    onPanelContentChange(panel) {
        const panelIdx = PANELS.indexOf(panel)
        panelMaxHeights[panelIdx] = document.getElementById(`${PANELS[panelIdx]}-panel-content`).offsetHeight + 6
        panelCoverHeights[panelIdx] = document.getElementById(`${PANELS[panelIdx]}-title`).clientHeight + 16
        document.getElementById(`tech-${PANELS[panelIdx]}-panel`).style.opacity = 1
        document.getElementById(`${PANELS[panelIdx]}-panel-content-container`).style.height = `${panelMaxHeights[panelIdx]}px`
        panelCurrHeights[panelIdx] = panelMaxHeights[panelIdx]

        setTotalPanelsHeight()
        document.getElementById('filler-tech').style.height = `${getFillerSize()}px`
        if(calcFillerSize() < window.innerHeight + OFFSET_Y_PX) {
            document.getElementById('center-column-vert').style.height = `${totalPanelsHeight-13}px`
            document.getElementById('center-column-horiz').style.height = `${totalPanelsHeight-13}px`
        }
        else {
            document.getElementById('center-column-vert').style.height = ""
            document.getElementById('center-column-horiz').style.height = ""
        }

        // wow, this is some of the worst code I've ever written
        if(calcFillerSize() <=  OFFSET_Y_PX) return
        let panelHeights = 0
        for(let i = 0; i < panelIdx; i++)
            panelHeights += panelMaxHeights[i] + panelCoverHeights[i]
        

        // const maxScrollY = document.getElementById('filler-tech').scrollHeight-window.innerHeight
        let scrollY = Math.ceil((panelHeights)*8 + OFFSET_Y_PX)
        if(scrollY > IGNORE_END_Y_PX) scrollY = IGNORE_END_Y_PX

        let scrollYStart = window.document.documentElement.scrollTop
        let goToPrevPosition = currPanelIdx < panelIdx
        updateOnScroll = false
        window.scrollTo({top:  OFFSET_Y_PX, behavior: 'instant'})
        lastScrollPos = 0
        
        currPanelIdx = 0
        for(let i = 0; i < PANELS.length; i++) {
            document.getElementById(`${PANELS[i]}-panel-content-container`).style.height = `${panelMaxHeights[i]}px`
            document.getElementById(`tech-${PANELS[i]}-panel`).style.opacity = 1
            document.getElementById(`tech-${PANELS[i]}-panel`).style.marginTop = '0px'
            panelCurrHeights[i] = panelMaxHeights[i]
            panelCurrOpacities[i] = 1
            panelTopMargins[i] = 0
        }

        if(goToPrevPosition) scrollY = scrollYStart
        let scrollPos = Math.floor((scrollY - OFFSET_Y_PX) / 8)
        if (scrollPos < 0) { scrollPos = 0 }
        let scrollDiff = Math.floor(scrollPos - lastScrollPos)
        const ignorePos = Math.floor((IGNORE_END_Y_PX - OFFSET_Y_PX) / 8)
        for(let i = 0; i < Math.abs(scrollDiff); i++) {
            if(scrollDiff < 0 && lastScrollPos - i <= ignorePos) updatePanelsOnScroll(lastScrollPos - i, -1)
            else if(lastScrollPos + i <= ignorePos) updatePanelsOnScroll(lastScrollPos + i, 1)
        }
        applyPanelUpdates();
        lastScrollPos = scrollPos

        window.scrollTo({top: scrollY, behavior: 'instant'})
        updateOnScroll = true
    }

    scrollToTopOfPanel(panel) {
        if(calcFillerSize() <= OFFSET_Y_PX) return

        const panelIdx = PANELS.indexOf(panel)

        let panelHeights = 0
        for(let i = 0; i < panelIdx; i++)
            panelHeights += panelMaxHeights[i] + panelCoverHeights[i]
        const scrollPos = Math.floor((panelHeights)*8 + OFFSET_Y_PX)
        // const maxScrollPos = document.getElementById('filler-tech').scrollHeight-window.innerHeight
        if(scrollPos <= IGNORE_END_Y_PX) {
            window.scrollTo({top: scrollPos, behavior: 'smooth'})
        } else {
            window.scrollTo({top: IGNORE_END_Y_PX, behavior: 'smooth'})
        }
    }

    getTotalPanelsHeight() {
        return totalPanelsHeight
    }

    onResize() {
        OFFSET_Y_PX = 700
        this.inititializePanelValues()
        getFillerSize()
    }

    onScroll(scrollY) {
        let scrollPos = Math.floor((scrollY - OFFSET_Y_PX) / 8)
        if (scrollPos < 0) { scrollPos = 0 }
        let scrollDiff = Math.floor(scrollPos - lastScrollPos)
        const ignorePos = Math.floor((IGNORE_END_Y_PX - OFFSET_Y_PX) / 8)

        if(updateOnScroll) {
            const scrollStart = lastScrollPos
            for(let i = 0; i < Math.abs(scrollDiff); i++) {
                if(scrollDiff < 0 && scrollStart - i <= ignorePos)
                    updatePanelsOnScroll(scrollStart - i, -1)
                else if(scrollStart + i <= ignorePos)
                    updatePanelsOnScroll(scrollStart + i, 1)
            }
            applyPanelUpdates();
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
                                I'm currently a senior majoring in Computer Science. I aim to use the tools and knowledge I have to work on meaningful projects that improve the lives of others.
                                </div>
                                <hr></hr>
                                </div>
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
                                <ExperiencePanel onPanelContentChange = {this.onPanelContentChange} />
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

function calcFillerSize() {
    return Math.floor(
        (totalPanelsHeight - (window.innerHeight - 134))*8 + window.innerHeight + 242
    )
}

// same formula defied in Technical page
function getFillerSize() {
    const fillerSize = calcFillerSize()
    if(fillerSize <= OFFSET_Y_PX) {
        OFFSET_Y_PX = 7000
        return window.innerHeight+OFFSET_Y_PX;
    } 
    OFFSET_Y_PX = 700
    IGNORE_END_Y_PX = fillerSize - window.innerHeight
    return fillerSize+OFFSET_Y_PX
}

function setTotalPanelsHeight() {
    totalPanelsHeight = 0
    for(let i = 0; i < PANELS.length; i++) {
        totalPanelsHeight += panelMaxHeights[i]
        totalPanelsHeight += panelCoverHeights[i]
        // totalPanelsHeight += panelTopMargins[i]
    }
    totalPanelsHeight += 4;
}

function updatePanelsOnScroll(scrollPos, scrollDiff) {
    panelCurrHeights[currPanelIdx] -= scrollDiff;

    const isScrollPosZero = scrollPos === 0;
    const isCurrPanelMaxHeightReached = panelCurrHeights[currPanelIdx] >= panelMaxHeights[currPanelIdx];

    if (isCurrPanelMaxHeightReached || isScrollPosZero) {
        panelCurrHeights[currPanelIdx] = panelMaxHeights[currPanelIdx];
        if (currPanelIdx > 0) {
            currPanelIdx -= 1;
        }
        return;
    }

    const isCurrPanelHeightZero = panelCurrHeights[currPanelIdx] <= 0;
    const isLastPanelIndex = currPanelIdx === PANELS.length - 1;

    if (isCurrPanelHeightZero && !isLastPanelIndex) {
        panelCurrHeights[currPanelIdx] = 0;
        panelTopMargins[currPanelIdx + 1] -= scrollDiff;
        panelCurrOpacities[currPanelIdx] -= scrollDiff / panelCoverHeights[currPanelIdx];

        const isPanelTopMarginsAbsGreaterThanOrEqualToCoverHeights = Math.abs(panelTopMargins[currPanelIdx + 1]) >= panelCoverHeights[currPanelIdx];

        if (isPanelTopMarginsAbsGreaterThanOrEqualToCoverHeights) {
            panelTopMargins[currPanelIdx + 1] = -1 * panelCoverHeights[currPanelIdx];

            if (isCurrPanelHeightZero) {
                panelCurrOpacities[currPanelIdx] = 0;
                if (!isLastPanelIndex) {
                    currPanelIdx += 1;
                    return;
                }
            }
        }

        if (panelCurrOpacities[currPanelIdx] <= 0) {
            panelCurrOpacities[currPanelIdx] = 0;
        }
    } else {
        const isPanelTopMarginsLessThanZero = panelTopMargins[currPanelIdx + 1] < 0;
        const isPanelCurrOpacitiesLessThanOne = panelCurrOpacities[currPanelIdx] < 1;

        if (isPanelTopMarginsLessThanZero || isPanelCurrOpacitiesLessThanOne) {
            if (!isLastPanelIndex) {
                panelTopMargins[currPanelIdx + 1] -= scrollDiff;
                panelCurrOpacities[currPanelIdx] -= scrollDiff / panelCoverHeights[currPanelIdx];

                if (panelTopMargins[currPanelIdx + 1] >= 0) {
                    panelTopMargins[currPanelIdx + 1] = 0;
                } else {
                    panelCurrHeights[currPanelIdx] = 0;
                }

                if (panelCurrOpacities[currPanelIdx] >= 1) {
                    panelCurrOpacities[currPanelIdx] = 1;
                } else {
                    panelCurrHeights[currPanelIdx] = 0;
                }
            }
        }
    }
}

function applyPanelUpdates() {
    for(let i = 0; i < PANELS.length; i++) {
        const currPanel = document.getElementById(`tech-${PANELS[i]}-panel`)
        const panelContentContainer = document.getElementById(`${PANELS[i]}-panel-content-container`)

        if(panelContentContainer.style.height !== `${panelCurrHeights[i]}px`)
            panelContentContainer.style.height = `${panelCurrHeights[i]}px`
        if(currPanel.style.marginTop !== `${panelTopMargins[i]}px`)
            currPanel.style.marginTop = `${panelTopMargins[i]}px`
        if(currPanel.style.opacity !== panelCurrOpacities[i])
            currPanel.style.opacity = panelCurrOpacities[i]
    }
}