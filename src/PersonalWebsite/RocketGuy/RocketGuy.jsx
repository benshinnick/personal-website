import React from 'react';
import './RocketGuy.css';

export default class RocketGuy extends React.Component {
    componentDidMount() {
        this.switchAnimation('idle');
        // this.switchAnimation('fly-up-build');
        // this.switchAnimation('fly-up-sustain');
        // this.switchAnimation('fly-up-stop');
    }

    switchAnimation(name) {
        this.removeCurrentAnimation();
        document.querySelector('#rocket-guy').classList.add(name);
    }

    removeCurrentAnimation() {
        document.querySelector('#rocket-guy').className = 'sprite';
    }

    render() {
        return (
            <div className='sprite' id='rocket-guy'></div>
        );
    }
}