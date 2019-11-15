import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import {
    Link
} from "react-router-dom";


function TopBar(props) {

    return(
        <Navbar className="green-bg shadow-lg h-8">

            <Navbar.Brand className="white-text">
                <FontAwesomeIcon className="mr-3" icon={faBars} id="collapse-nav" ref={props.collapseRef} onClick={props.collapseSideMenu.bind(props.that)}></FontAwesomeIcon>
                <Link to="/">Saugus pilietis</Link>
            </Navbar.Brand>
      </Navbar>
    )
}

export default TopBar;