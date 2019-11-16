import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import {
    Link
} from "react-router-dom";


function Content(props) {

    return(
        <div className="green-bg shadow-lg rounded responsive-margin responsive-padding position-sticky">
            <h1 className="white-text text-center mb-3">{props.title}</h1>
            <p className="white-text">{props.text}</p>
        </div>
    )
}

export default Content;