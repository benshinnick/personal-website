import React from 'react';
import './ProjectsPanel.css';

export default class ProjectsPanel extends React.Component {

    render() {
        return (
            <div className='info-panel-content' id='projects-panel-content'>
                <div id='project-icons'>
                    <div className='sprite project-icon' id='algo-contest-icon'/>
                    <div className='sprite project-icon' id='huddle-icon'/>
                    <div className='sprite project-icon' id='miscellaneous-icon'/>
                    <div className='sprite project-icon' id='personal-website-icon'/>
                    {/* <div className='sprite project-icon' id='mystery-icon'/> */}
                </div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id ornare velit. Donec mollis vitae turpis non laoreet. Maecenas ac mauris non ante egestas tempus. Donec nisl enim, elementum non mauris sed, cursus dictum nisl. Nunc sed tortor pellentesque, elementum nulla id, ullamcorper urna. Curabitur nisi sem, tristique sed velit porta, molestie vulputate sem. Cras non tincidunt sapien. Nunc rhoncus tempus risus, at ornare sem interdum at. Donec rhoncus tortor justo. Praesent dignissim turpis pretium, volutpat sapien vitae, dapibus velit.
            </div>
        );
    }
}