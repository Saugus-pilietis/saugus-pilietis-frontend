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
        let cities = ['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panėvežys'];
        let coords = [{'latitude' : '54.687157', 'longitude' : '25.279652'}, {'latitude' : '54.898521', 'longitude' : '23.903597'}, {'latitude' : '55.703297', 'longitude' : '21.144279'},  {'latitude' : '55.932079', 'longitude' : '23.314220'}, {'latitude' : '55.737440', 'longitude' : '24.370330'}];

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
        });

    }

    updateLocation(city) {
        this.setState({
            currentCity : city, 
        });
    }

    render() {
        let radiationDisasterText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget mi vehicula, auctor purus sed, fermentum justo. Nullam pretium fringilla massa, nec porta mauris congue sed. Vivamus dictum leo sit amet ex bibendum, vel imperdiet sem commodo. Integer sodales dapibus ante id placerat. Nunc eleifend justo mi, non congue nibh varius interdum. Donec eu augue libero. Praesent vehicula egestas elit. Nam rutrum mollis orci, sit amet molestie enim iaculis id. Mauris interdum neque eget maximus pretium. Suspendisse potenti.

Ut congue lacinia aliquam. Ut sed justo quis ex posuere blandit. Aliquam arcu dui, varius et ligula ac, dignissim egestas nibh. Nunc quis odio in neque egestas vestibulum quis non nisi. Morbi sed libero ut velit pellentesque ultrices. Pellentesque tempus risus ligula, tristique consequat risus dictum vel. Proin et eros nec purus ornare finibus.

Phasellus facilisis cursus nunc, convallis pulvinar turpis vehicula sit amet. Integer sit amet velit nec ipsum hendrerit euismod eget sit amet enim. Ut eget suscipit augue. Donec blandit a ex at consectetur. Maecenas dictum vitae metus sit amet efficitur. Aliquam in urna semper, mollis neque eget, faucibus diam. Phasellus porta neque rhoncus ipsum eleifend dictum. Suspendisse a velit consectetur, ullamcorper quam nec, maximus justo. Nullam pellentesque tristique eros vel suscipit. Phasellus vel ultrices ex. Aenean faucibus in orci nec gravida.

Donec tincidunt libero nec suscipit luctus. Integer finibus luctus elit sed pellentesque. Ut quis turpis ipsum. Quisque eget vehicula elit. In vel laoreet velit. Vivamus vehicula, lorem a sagittis dignissim, lorem leo fringilla ante, ut consectetur sem nunc vitae orci. Proin id lacus diam. Donec volutpat tellus quis magna pellentesque eleifend. Morbi molestie vel odio vitae varius. Phasellus dui lectus, hendrerit at nisi nec, faucibus maximus risus. Duis semper, felis et suscipit ornare, augue dolor euismod eros, sit amet feugiat orci neque vel orci. Integer posuere, libero ac maximus ultricies, nunc sapien rhoncus lorem, lacinia efficitur ipsum turpis quis magna. Curabitur pellentesque quam nibh, lacinia hendrerit elit condimentum facilisis.

Ut non tincidunt nulla. Nulla tempor nisi ac dolor lobortis gravida. Suspendisse quis consequat lacus. Donec lacinia erat eros, non efficitur erat tristique quis. Aenean eu mi vel lorem euismod vestibulum. Nullam eu nulla tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;
        
        const geoUrl = '/map_data/eu.topojson';

        if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled && this.props.coords && !this.state.executedOnce) {
            this.getLocation(this.props.coords.longitude, this.props.coords.latitude);
        }
        return(

            <Container fluid={"true"} className="h-100 d-flex flex-column p-0" id="main-container">
                    <Switch>
                        <Route path="/air/map">
                            <TopBar that={this.that} collapseSideMenu={this.collapseSideMenu} handleQRCode={this.handleQRCode}></TopBar>
                            <div className="d-flex h-100 w-100 map-container">
                                <SideBar that={this.that} currentCity={this.state.currentCity} updateLocation={this.updateLocation}></SideBar>
                                <GoogleMap mapWidth={this.state.mapWidth}></GoogleMap>
                            </div>              
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
