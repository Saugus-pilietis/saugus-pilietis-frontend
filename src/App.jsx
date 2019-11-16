import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import TopBar from './Topbar.jsx';
import SideBar from './Sidebar.jsx';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


class App extends React.Component {

    constructor(props) {
        super(props);
        this.that = this;
    }

    collapseSideMenu() {
        document.getElementById("sidebar-collapse").classList.toggle("negative-margin");
    }

    render() {
        return(
            <Container fluid={"true"} className="h-100 d-flex flex-column p-0">
                <Router>
                    <Switch>
                        <Route path="/air">
                            <TopBar that={this.that} collapseSideMenu={this.collapseSideMenu}></TopBar>
                            <SideBar></SideBar>
                        </Route>
                    </Switch>
                </Router>
            </Container>
        )
    }
}

export default App;
