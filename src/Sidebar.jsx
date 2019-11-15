import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import Navbar from 'react-bootstrap/Navbar';
import Collapse from 'react-bootstrap/Collapse';


import {
    Link
} from "react-router-dom";

function SideBar(props) {
    return(
        <div className="sidebar-wrapper w-13 color green-bg white-text">
        <Collapse in={props.open}>
                <ListGroup variant="flush">
                    <Link to="/air"><ListGroup.Item>Oras</ListGroup.Item></Link>
                    <Link to="/water"><ListGroup.Item>Vanduo</ListGroup.Item></Link>
                    <Link to="/radiation"><ListGroup.Item>Radiacija</ListGroup.Item></Link>
                    <Link to="/emergency"><ListGroup.Item>Ką daryti pavojaus atveju?</ListGroup.Item></Link>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                    <ListGroup.Item></ListGroup.Item>
                </ListGroup>
        </Collapse>
        </div>
    )
}

export default SideBar;
