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
            <Accordion className="h-100">
                <Card className="h-100 w-100">
                <Accordion.Collapse id="sidebar-collapse" eventKey="0" className="h-100 show">
                <Card.Body className="w-13 color green-bg white-text list-item-text h-100">
                    <ListGroup variant="flush">
                            <Accordion>
                                <Card>
                                    <Card.Header>
                                      <Accordion.Toggle as={Button} variant="link" eventKey="0" className="white-text list-item-text">
                                        Oro tarša
                                      </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                      <Card.Body>
                                          <Link to="/air/map"><ListGroup.Item>Žemėlapis</ListGroup.Item></Link>
                                          <Link to="/air/statistics"><ListGroup.Item>Statistika</ListGroup.Item></Link>
                                      </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                      <Accordion.Toggle as={Button} variant="link" eventKey="1" className="white-text list-item-text">
                                        Vandens tarša
                                      </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="1">
                                      <Card.Body>
                                          <Link to="/water/map"><ListGroup.Item>Žemėlapis</ListGroup.Item></Link>
                                          <Link to="/water/statistics"><ListGroup.Item>Statistika</ListGroup.Item></Link>
                                      </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                      <Accordion.Toggle as={Button} variant="link" eventKey="2" className="white-text list-item-text">
                                        Radiacijos lygis
                                      </Accordion.Toggle>
                                    </Card.Header>
                                </Card>
                                <Card>
                                    <Accordion.Collapse eventKey="2">
                                      <Card.Body>
                                          <Link to="/radiation/map"><ListGroup.Item>Žemėlapis</ListGroup.Item></Link>
                                          <Link to="/radiation/statistics"><ListGroup.Item>Statistika</ListGroup.Item></Link>
                                      </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                      <Accordion.Toggle as={Button} variant="link" eventKey="3" className="white-text list-item-text">
                                        Įvykus nelaimei
                                      </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="3">
                                      <Card.Body>
                                          <Link to="/disaster/radiation"><ListGroup.Item>Radiacijos pavojus</ListGroup.Item></Link>
                                          <Link to="/disaster/air"><ListGroup.Item>Oro taršos pavojus</ListGroup.Item></Link>
                                          <Link to="/disaster/water"><ListGroup.Item>Vandens taršos pavojus</ListGroup.Item></Link>
                                      </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                      <Accordion.Toggle as={Button} variant="link" eventKey="4" className="white-text list-item-text">
                                        Evakuacija
                                      </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="4">
                                      <Card.Body>
                                          <Link to="/evacuation/meeting-points"><ListGroup.Item>Susitikimo taškai</ListGroup.Item></Link>
                                          <Link to="/evacuation/bunkers"><ListGroup.Item>Bunkeriai</ListGroup.Item></Link>
                                          <Link to="/evacuation/plans"><ListGroup.Item>Planai</ListGroup.Item></Link>
                                      </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        <ListGroup.Item>
                            <DropdownButton
                              variant="outline-light"
                              title="Pasirinkite miestą"
                              id="input-group-dropdown-1"
                              className="my-auto"
                              size="lg"
                            >
                                <Dropdown.Item href="#">Kaunas</Dropdown.Item>
                                <Dropdown.Item href="#">Klaipėda</Dropdown.Item>
                                <Dropdown.Item href="#">Vilnius</Dropdown.Item>
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
