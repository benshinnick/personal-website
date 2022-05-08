import React from 'react';
import './RocketGuy.css';

export default class RocketGuy extends React.Component {
    componentDidMount() {
        this.switchToIdleAnimation();
        // this.swtichToFlyUpBuildAnimation();
        // this.swtichToFlyUpSustainAnimation();
        // this.swtichToFlyUpStopAnimation();
    }

    switchToIdleAnimation() {
        document.querySelector('#rocket-guy').classList.add('idle');
    }

    swtichToFlyUpBuildAnimation() {
        document.querySelector('#rocket-guy').classList.add('fly-up-build');
    }

    swtichToFlyUpSustainAnimation() {
        document.querySelector('#rocket-guy').classList.add('fly-up-sustain');
    }

    swtichToFlyUpStopAnimation() {
        document.querySelector('#rocket-guy').classList.add('fly-up-stop');
    }

    render() {
        return (
            <div className='sprite' id='rocket-guy'></div>
        );
    }
}