import React from 'react';
import './ProjectsPanel.css';

export default class ProjectsPanel extends React.Component {

    render() {
        return (
            <div className='info-panel-content' id='projects-panel-content'>
                <div id='project-icons'>
                    <div className='project-display selected' id='algo-contest-display' onClick={() => console.log('Algo Contest')}>
                        <div id='algo-contest-icon' className='sprite project-icon' />
                        <div className='project-text'>AlgoContest</div>
                    </div>
                    <div className='project-display' id='huddle-display' onClick={() => console.log('Huddle')}>
                        <div className='sprite project-icon' id='huddle-icon' />
                        <div className='project-text'>Huddle</div>
                    </div>
                    <div className='project-display' id='miscellaneous-display' onClick={() => console.log('Misc.')}>
                        <div className='sprite project-icon' id='miscellaneous-icon' />
                        <div className='project-text'>Miscellaneous</div>
                    </div>
                    <div className='project-display' id='personal-website-display' onClick={() => console.log('Personal')}>
                        <div className='sprite project-icon' id='personal-website-icon' />
                        <div className='project-text'>Personal Site</div>
                    </div>
                    {/* <div className='sprite project-icon' id='mystery-icon'/> */}
                </div>
                <div id='project-info-content'>
                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id ornare velit. Donec mollis vitae turpis non laoreet. Maecenas ac mauris non ante egestas tempus. Donec nisl enim, elementum non mauris sed, cursus dictum nisl. Nunc sed tortor pellentesque, elementum nulla id, ullamcorper urna. Curabitur nisi sem, tristique sed velit porta, molestie vulputate sem. Cras non tincidunt sapien. Nunc rhoncus tempus risus, at ornare sem interdum at. Donec rhoncus tortor justo. Praesent dignissim turpis pretium, volutpat sapien vitae, dapibus velit. */}
                </div>
            </div>
        );
    }
}