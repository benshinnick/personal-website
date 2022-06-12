import React from 'react';
import './PersonalWebsite.css';
import Navbar from './Navbar/Navbar';
import HomePage from './HomePage/HomePage';

export default class PersonalWebsite extends React.Component {
    render() {
        return (
            <div>
                <Navbar></Navbar>
                <HomePage></HomePage>
            </div>
        );
    }
}