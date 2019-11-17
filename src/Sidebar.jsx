import React from 'react';

import ListGroup from 'react-bootstrap/ListGroup';
import Navbar from 'react-bootstrap/Navbar';
import Collapse from 'react-bootstrap/Collapse';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


import {
    Link
} from "react-router-dom";

function SideBar(props) {
    return(
            <Accordion className="h-100" id="sidebar">
                <Card className="h-100 w-100">
                    <Accordion.Collapse id="sidebar-collapse" eventKey="0" className="show w-13 color green-bg white-text list-item-text h-100">
                        <Card.Body id="sidebar-list" className="position-fixed">
                            <ListGroup variant="flush">
                                    <Accordion>
                                        <Card>
                                            <Card.Header>
                                              <Accordion.Toggle as={Button} variant="link" eventKey="0" className="white-text list-item-text pl-0">
                                                Oro tarša
                                              </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="0">
                                              <Card.Body>
                                                  <Link to="/air/map"><ListGroup.Item>Žemėlapis</ListGroup.Item></Link>
                                                  <Link to="/air/statistics"><ListGroup.Item>Statistika</ListGroup.Item></Link>
                                                  <Link to="/air/explanation"><ListGroup.Item>Taršos lygiai</ListGroup.Item></Link>
                                              </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                <ListGroup.Item>
                                    <DropdownButton
                                      variant="outline-light"
                                      title={props.currentCity}
                                      id="input-group-dropdown-1"
                                      className="my-auto"
                                      size="lg"
                                    >
                                        <Dropdown.Item onClick={props.updateLocation.bind(props.that, "Kaunas")}>Kaunas</Dropdown.Item>
                                        <Dropdown.Item onClick={props.updateLocation.bind(props.that, "Klaipėda")}>Klaipėda</Dropdown.Item>
                                        <Dropdown.Item onClick={props.updateLocation.bind(props.that, "Vilnius")}>Vilnius</Dropdown.Item>
                                        <Dropdown.Item onClick={props.updateLocation.bind(props.that, "Naujoji akmenė")}>Naujoji akmenė</Dropdown.Item>
                                    </DropdownButton>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
    )
}

export default SideBar;
