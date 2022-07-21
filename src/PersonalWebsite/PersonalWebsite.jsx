import React from 'react';
import { createRoot } from 'react-dom/client';

import './PersonalWebsite.css';
import Navbar from './Navbar/Navbar';
import Clouds from './Clouds/Clouds';
import HomePage from './HomePage/HomePage';

export default class PersonalWebsite extends React.Component {
    constructor(props) {
        super(props);
        this.navBarRef = React.createRef();
        this.cloudsRef = React.createRef();
        this.mainContentRef = React.createRef();
        this.state = {
            currentPage: ''
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
        this.changeToHomePage();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            console.log('arrived at bottom')
        }

        if (window.scrollY <= 0) {
            console.log('arrived at top')
        }
    }

    changeToHomePage() {
        const mainContent = document.getElementById('main-content');
        const root = createRoot(mainContent);
        root.render(<HomePage />);
        this.setState({ currentPage: 'home' });
    }

    changeToTechnicalPage() {
        this.setState({ currentPage: 'technical' });
    }

    render() {
        return (
            <div>
                <Navbar ref={this.navBarRef} />
                <Clouds ref={this.cloudsRef} />
                <div ref={this.mainContentRef} id='main-content'></div>
            </div>
        );
    }
}