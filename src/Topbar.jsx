import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';

import {
    Link
} from "react-router-dom";


function TopBar(props) {

    return(
        <div className="h-8">
            <Navbar className="green-bg shadow-lg h-8 w-100">
                <Navbar.Brand className="white-text" id="hidden-top-bar">
                    <FontAwesomeIcon className="mr-3 title-text" icon={faBars} id="collapse-nav" onClick={props.collapseSideMenu.bind(props.that)}></FontAwesomeIcon>
                    <Link to="/" className="title-text">Švari aplinka</Link>
                </Navbar.Brand>
          </Navbar>            
          <Navbar className="green-bg shadow-lg h-8 position-fixed w-100" id="topbar">
                <Navbar.Brand className="white-text">
                    <FontAwesomeIcon className="mr-3 title-text" icon={faBars} id="collapse-nav" ref={props.collapseRef} onClick={props.collapseSideMenu.bind(props.that)}></FontAwesomeIcon>
                    <Link to="/" className="title-text">Švari aplinka</Link>
                </Navbar.Brand>
                <FontAwesomeIcon className="ml-0 white-text title-text mr-5" id="showQRModal" icon={faMobileAlt} onClick={props.handleQRCode.bind(props.that)}></FontAwesomeIcon>

          </Navbar>
        </div>
    )
}

export default TopBar;