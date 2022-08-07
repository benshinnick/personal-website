import React from 'react';
import './TechInfoPanels.css';

const OFFSET_Y_PX = 700
const PANELS = ['about', 'projects']
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

    updatePanelsOnScroll(scrollPos, scrollDiff) {
        panelCurrHeights[currPanelIdx] -= scrollDiff

        if (panelCurrHeights[currPanelIdx] >= panelMaxHeights[currPanelIdx] || scrollPos === 0) {
            panelCurrHeights[currPanelIdx] = panelMaxHeights[currPanelIdx]
            document.getElementById(`${PANELS[currPanelIdx]}-panel-content-container`).style.height = `${panelCurrHeights[currPanelIdx]}px`
            if(currPanelIdx > 0) {currPanelIdx -= 1 }
        }
        else if (panelCurrHeights[currPanelIdx] < 0) {
            panelCurrHeights[currPanelIdx] = 0
            panelTopMargins[currPanelIdx+1] -= scrollDiff
            panelCurrOpacities[currPanelIdx] -= scrollDiff / 50
            if (Math.abs(panelTopMargins[currPanelIdx+1]) >= panelCoverHeights[currPanelIdx]) {
                panelTopMargins[currPanelIdx+1] = -1 * panelCoverHeights[currPanelIdx]
                document.getElementById(`tech-${PANELS[currPanelIdx+1]}-panel`).style.marginTop = `${panelTopMargins[currPanelIdx+1]}px`
                document.getElementById(`tech-${PANELS[currPanelIdx]}-panel`).style.opacity = panelCurrOpacities[currPanelIdx]
                if(currPanelIdx < PANELS.length - 1) { currPanelIdx += 1 }
            }
            if (panelCurrOpacities[currPanelIdx] <= 0) { panelCurrOpacities[currPanelIdx] = 0 }
            document.getElementById(`tech-${PANELS[currPanelIdx+1]}-panel`).style.marginTop = `${panelTopMargins[currPanelIdx+1]}px`
            document.getElementById(`tech-${PANELS[currPanelIdx]}-panel`).style.opacity = panelCurrOpacities[currPanelIdx]
        }
        else if (panelTopMargins[currPanelIdx+1] < 0 || panelCurrOpacities[currPanelIdx] < 1) {
            panelTopMargins[currPanelIdx+1] -= scrollDiff
            panelCurrOpacities[currPanelIdx] -= scrollDiff / 50
            if (panelTopMargins[currPanelIdx+1] >= 0) {
                panelTopMargins[currPanelIdx+1] = 0
            }
            if (panelCurrOpacities[currPanelIdx] >= 1) { panelCurrOpacities[currPanelIdx] = 1 }
            document.getElementById(`tech-${PANELS[currPanelIdx+1]}-panel`).style.marginTop = `${panelTopMargins[currPanelIdx+1]}px`
            document.getElementById(`tech-${PANELS[currPanelIdx]}-panel`).style.opacity = panelCurrOpacities[currPanelIdx]
        }
        document.getElementById(`${PANELS[currPanelIdx]}-panel-content-container`).style.height = `${panelCurrHeights[currPanelIdx]}px`
    }

    onResize() {
        this.inititializePanelValues()
    }

    onScroll() {
        var scrollPos = Math.floor((window.scrollY - OFFSET_Y_PX) / 6)
        if (scrollPos < 0) { scrollPos = 0 }
        const scrollDiff = Math.floor(scrollPos - lastScrollPos)

        this.updatePanelsOnScroll(scrollPos, scrollDiff)
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
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id ornare velit. Donec mollis vitae turpis non laoreet. Maecenas ac mauris non ante egestas tempus. Donec nisl enim, elementum non mauris sed, cursus dictum nisl. Nunc sed tortor pellentesque, elementum nulla id, ullamcorper urna. Curabitur nisi sem.
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