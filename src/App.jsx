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

function SelectLocation() {
    return (
        <div className="text-center center-vertically">
            <h1 className="text-center">Ar jūs esate čia?</h1>
            <DropdownButton
              variant="outline-success"
              title="Pasirinkite miestą"
              id="input-group-dropdown-1"
              className="mx-auto mt-4"
              size="lg"
            >
              <Dropdown.Item href="#">Kaunas</Dropdown.Item>
              <Dropdown.Item href="#">Klaipėda</Dropdown.Item>
              <Dropdown.Item href="#">Vilnius</Dropdown.Item>
            </DropdownButton>
            <Button className="mt-4" variant="outline-success" size="lg">Patvirtinti</Button>
        </div>
    );
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open : true,
        };
        this.that = this;
    }

    collapseSideMenu() {
        const oppositeOpen = !this.state.open;
        this.setState({
            open : oppositeOpen,
        });
        console.log('hi');
    }

    render() {
        return(
            <Container fluid={"true"} className="h-100 d-flex flex-column p-0">
                <Router>
                    <Switch>
                        <Route exact path="/select-location">
                            <SelectLocation></SelectLocation>
                        </Route>
                        <Route path="/">
                            <TopBar open={this.state.open} that={this.that} collapseSideMenu={this.collapseSideMenu}></TopBar>
                            <SideBar open={this.state.open}></SideBar>
                        </Route>
                    </Switch>
                </Router>
            </Container>
        )
    }
}

export default App;
