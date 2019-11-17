import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';

import TopBar from './Topbar.jsx';
import SideBar from './Sidebar.jsx';
import Content from './Content.jsx';
import GoogleMap from './GoogleMap.jsx';
import AirQualityLevels from './AirQualityLevels.jsx'

import {
    Switch,
    Route,
    Link,
    Redirect,
    withRouter,
    observer,
} from "react-router-dom";

import {
    ComposableMap, 
    Geographies, 
    Geography, 
    geographyPaths,
} from "react-simple-maps";

import { geolocated } from "react-geolocated";
import Geocode from "react-geocode";
import { findNearest } from 'geolib';


let QRCode = require('qrcode.react');

function QRCodeModal (props){
    return (

        <Modal className="d-flex flex-column justify-content-center" show={props.showQRCode} onHide={props.handleQRCode.bind(props.that)}>
            <Modal.Header closeButton className="w-100 d-flex">
                <Modal.Title className="ml-auto">Atidaryti mobiliajame įrenginyje</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mx-auto">
                <QRCode value={window.location.href} />
            </Modal.Body>
            <Modal.Footer className="text-center">
                Nuskanuokite QR kodą, kad atidarytumėte svetainę mobiliajame įrenginyje
            </Modal.Footer>
        </Modal>
    )
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.that = this;
        this.state = {
            showQRCode : false,
            width : 0,
            latitude : 0,
            logtitude : 0,
            currentCity : "Vilnius",
            executedOnce : false,
            mapWidth :  0,
            currentMapState : 1,
            currentCoordsLa : 54.687157,
            currentCoordsLo : 25.279652

        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.updateWindowDimensions();
        }
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        if (window.innerWidth <= 768) {
            if (document.getElementById('sidebar-collapse') == null) {
                return;
            }
            document.getElementById("sidebar-collapse").classList.add("negative-margin");
            document.getElementById("showQRModal").classList.add("d-none");
            this.setState({
                mapWidth : window.innerWidth,
                currentMapState : 1,
            });
        } else {
            if (document.getElementById('sidebar-collapse') == null) {
                return;
            }
            document.getElementById("showQRModal").classList.remove("d-none");
            document.getElementById("sidebar-collapse").classList.remove("negative-margin"); 
            this.setState({
                mapWidth : window.innerWidth-document.getElementById('sidebar').offsetWidth,
                currentMapState : 0,
            });       
        }

        this.setState({ width: window.innerWidth});
    }

    collapseSideMenu() {
        var that = this;
        document.getElementById("sidebar-collapse").classList.toggle("negative-margin");
        setTimeout(function() {
            let newMapWidth = that.state.currentMapState == 0 ? that.state.width : that.state.width-document.getElementById('sidebar').offsetWidth;
            let newCurrentMapState = that.state.currentMapState == 0 ? 1 : 0;
            console.log(newMapWidth);
            
            that.setState({
                mapWidth : newMapWidth,
                currentMapState : newCurrentMapState,
            })
        },
            450
        );
        

    }

    handleQRCode() {
        const updatedShowQRCode = !this.state.showQRCode;

        this.setState({
            'showQRCode' : updatedShowQRCode,
        });
    }

    getLocation(longitude, latitude) {
        let cities = ['Vilnius', 'Kaunas', 'Klaipėda', 'Naujoji akmenė'];
        let coords = [{'latitude' : 54.687157, 'longitude' : 25.279652}, {'latitude' : 54.898521, 'longitude' : 23.903597}, {'latitude' : 55.703297, 'longitude' : 21.144279},  {'latitude' : 56.321990, 'longitude' : 22.880060}];

        let nearestCoords = findNearest({'latitude' : latitude, 'longitude' : longitude}, coords);
    
        let city = "";

        for (let i = 0; i < coords.length; i++) {
            if (coords[i]['latitude'] == nearestCoords['latitude'] && coords[i]['longitude'] == nearestCoords['longitude']) {
                city = cities[i];
                break;
            }
        }
        this.setState({
            currentCity : city,
            executedOnce : true,
            currentCoordsLa : nearestCoords['latitude'],
            currentCoordsLo : nearestCoords['longitude']
        });

    }

    updateLocation(city) {
        let cityCords = {'Vilnius' : [54.687157, 25.279652], 'Kaunas' : [54.898521, 23.903597], 'Klaipėda' : [55.703297, 21.144279], 'Naujoji akmenė' : [56.321990, 22.880060]};
        this.setState({
            currentCity : city,
            currentCoordsLa : cityCords[city][0],
            currentCoordsLo : cityCords[city][1],
        });
    }

    render() {

        if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled && this.props.coords && !this.state.executedOnce) {
            this.getLocation(this.props.coords.longitude, this.props.coords.latitude);
        }

        document.title = "Švari aplinka"

        return(

            <Container fluid={"true"} className="h-100 d-flex flex-column p-0" id="main-container">
                    <Switch>
                        <Route path="/air/map">
                            <TopBar that={this.that} collapseSideMenu={this.collapseSideMenu} handleQRCode={this.handleQRCode}></TopBar>
                            <div className="d-flex h-100 w-100 map-container">
                                <SideBar that={this.that} currentCity={this.state.currentCity} updateLocation={this.updateLocation}></SideBar>
                                <GoogleMap mapWidth={this.state.mapWidth} currentCoordsLo={this.state.currentCoordsLo} currentCoordsLa={this.state.currentCoordsLa}></GoogleMap>
                            </div>              
                            <QRCodeModal showQRCode={this.state.showQRCode} that={this.that} handleQRCode={this.handleQRCode}></QRCodeModal> 
                        </Route>
                        <Route path="/air/explanation">
                            <TopBar that={this.that} collapseSideMenu={this.collapseSideMenu} handleQRCode={this.handleQRCode}></TopBar>
                            <div className="d-flex h-100 w-100 map-container">
                                <SideBar that={this.that} currentCity={this.state.currentCity} updateLocation={this.updateLocation}></SideBar>
                                <AirQualityLevels/>
                            </div>
                            <QRCodeModal showQRCode={this.state.showQRCode} that={this.that} handleQRCode={this.handleQRCode}></QRCodeModal>
                        </Route>
                        <Route path="/air/statistics">
                            <TopBar that={this.that} collapseSideMenu={this.collapseSideMenu} handleQRCode={this.handleQRCode}></TopBar>
                            <SideBar that={this.that} currentCity={this.state.currentCity} updateLocation={this.updateLocation}></SideBar>           
                            <QRCodeModal showQRCode={this.state.showQRCode} that={this.that} handleQRCode={this.handleQRCode}></QRCodeModal> 
                        </Route>
                        <Route path="/">
                            <Redirect from="/" to="/air/map" />
                        </Route>
                    </Switch>
            </Container>
        )
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(withRouter(App));
