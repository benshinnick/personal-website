import React from 'react';
import './HomePage.css';
import InfoPanels from './InfoPanels/InfoPanels';
import RocketGuy from './RocketGuy/RocketGuy';
import Clouds from './Clouds/Clouds';
import Moon from './Moon/Moon';
// import Saturn from './Saturn/Saturn';
// import City from './City/City'
import Stars from './Stars/Stars';
import UFO from './UFO/UFO';

export default class HomePage extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 700);
    }

    render() {
        return (
            <main className='home-page'>
                <div id="background-gradient"></div>
                <InfoPanels></InfoPanels>
                <RocketGuy></RocketGuy>
                <Clouds></Clouds>
                <Stars></Stars>
                <Moon></Moon>
                {/* <City></City> */}
                {/* <Saturn></Saturn> */}
                <UFO></UFO>
                <div id='filler' style={{height: window.innerHeight*4 + 'px'}}></div>
            </main>
        );
    }
}

window.onresize = adjust_filler_size;

function adjust_filler_size() {
    document.getElementById('filler').style.height = `${window.innerHeight*3.3}px`
}