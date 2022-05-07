import React from 'react';
import './PersonalWebsite.css';

export default class PersonalWebsite extends React.Component {
    render() {
        return (
            <div id='personal-website'>
                <div id='website-header'>
                    <p id="header-text">Hello World</p>
                </div>
                <div id='main-content'></div>
            </div>
        );
    }
}