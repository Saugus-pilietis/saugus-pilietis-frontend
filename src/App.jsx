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

import {
    Switch,
    Route,
    Link,
    Redirect,
    withRouter,
} from "react-router-dom";

import { 
    ComposableMap, 
    Geographies, 
    Geography, 
    geographyPaths,
} from "react-simple-maps";

import { geolocated } from "react-geolocated";
import Geocode from "react-geocode";

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
            document.getElementById("sidebar-collapse").classList.add("negative-margin");
            document.getElementById("showQRModal").classList.add("d-none");
        } else {
            document.getElementById("showQRModal").classList.remove("d-none");        
        }

        this.setState({ width: window.innerWidth});
    }

    collapseSideMenu() {
        document.getElementById("sidebar-collapse").classList.toggle("negative-margin");

    }

    handleQRCode() {
        const updatedShowQRCode = !this.state.showQRCode;

        this.setState({
            'showQRCode' : updatedShowQRCode,
        });
    }

    getLocation(longitude, latitude) {
        Geocode.setApiKey("AIzaSyAC20XccXucy_E6zn6BaQ71n4N5HPAti8g");
 
        // set response language. Defaults to english.
        Geocode.setLanguage("en");
         
        // set response region. Its optional.
        // A Geocoding request with region=es (Spain) will return the Spanish city.
        Geocode.setRegion("lt");
         
         
        // Get address from latitude & longitude.
        Geocode.fromLatLng(latitude, longitude).then(
          response => {
            const address = response.results[0].formatted_address;
            console.log(address);
          },
          error => {
            console.error(error);
          }
        );

    }

    render() {
        let radiationDisasterText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget mi vehicula, auctor purus sed, fermentum justo. Nullam pretium fringilla massa, nec porta mauris congue sed. Vivamus dictum leo sit amet ex bibendum, vel imperdiet sem commodo. Integer sodales dapibus ante id placerat. Nunc eleifend justo mi, non congue nibh varius interdum. Donec eu augue libero. Praesent vehicula egestas elit. Nam rutrum mollis orci, sit amet molestie enim iaculis id. Mauris interdum neque eget maximus pretium. Suspendisse potenti.

Ut congue lacinia aliquam. Ut sed justo quis ex posuere blandit. Aliquam arcu dui, varius et ligula ac, dignissim egestas nibh. Nunc quis odio in neque egestas vestibulum quis non nisi. Morbi sed libero ut velit pellentesque ultrices. Pellentesque tempus risus ligula, tristique consequat risus dictum vel. Proin et eros nec purus ornare finibus.

Phasellus facilisis cursus nunc, convallis pulvinar turpis vehicula sit amet. Integer sit amet velit nec ipsum hendrerit euismod eget sit amet enim. Ut eget suscipit augue. Donec blandit a ex at consectetur. Maecenas dictum vitae metus sit amet efficitur. Aliquam in urna semper, mollis neque eget, faucibus diam. Phasellus porta neque rhoncus ipsum eleifend dictum. Suspendisse a velit consectetur, ullamcorper quam nec, maximus justo. Nullam pellentesque tristique eros vel suscipit. Phasellus vel ultrices ex. Aenean faucibus in orci nec gravida.

Donec tincidunt libero nec suscipit luctus. Integer finibus luctus elit sed pellentesque. Ut quis turpis ipsum. Quisque eget vehicula elit. In vel laoreet velit. Vivamus vehicula, lorem a sagittis dignissim, lorem leo fringilla ante, ut consectetur sem nunc vitae orci. Proin id lacus diam. Donec volutpat tellus quis magna pellentesque eleifend. Morbi molestie vel odio vitae varius. Phasellus dui lectus, hendrerit at nisi nec, faucibus maximus risus. Duis semper, felis et suscipit ornare, augue dolor euismod eros, sit amet feugiat orci neque vel orci. Integer posuere, libero ac maximus ultricies, nunc sapien rhoncus lorem, lacinia efficitur ipsum turpis quis magna. Curabitur pellentesque quam nibh, lacinia hendrerit elit condimentum facilisis.

Ut non tincidunt nulla. Nulla tempor nisi ac dolor lobortis gravida. Suspendisse quis consequat lacus. Donec lacinia erat eros, non efficitur erat tristique quis. Aenean eu mi vel lorem euismod vestibulum. Nullam eu nulla tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;
        
        const geoUrl = '/map_data/eu.topojson';

        if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled && this.props.coords) {
            this.getLocation(this.props.coords.longitude, this.props.coords.latitude);
        }
        return(
            <Container fluid={"true"} className="h-100 d-flex flex-column p-0" id="main-container">
                    <Switch>
                        <Route path="/air/map">
                            <TopBar that={this.that} collapseSideMenu={this.collapseSideMenu} handleQRCode={this.handleQRCode}></TopBar>
                            <div className="d-flex">
                                <SideBar></SideBar>
                            </div>
                            <QRCodeModal showQRCode={this.state.showQRCode} that={this.that} handleQRCode={this.handleQRCode}></QRCodeModal>
                            <ComposableMap className="mx-auto my-auto">
                                  <Geographies geography={geoUrl}>
                                    {({ geographies }) =>
                                      geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
                                    }
                                  </Geographies>
                                </ComposableMap>                             
                            </Route>
                        <Route path="/disaster/radiation">
                            <TopBar that={this.that} collapseSideMenu={this.collapseSideMenu} handleQRCode={this.handleQRCode}></TopBar>
                            <div className="d-flex">
                                <SideBar></SideBar>
                                <Content title={"Ką daryti, kai radiacija viršija normas?"} text={radiationDisasterText}></Content>
                            </div>
                            <QRCodeModal showQRCode={this.state.showQRCode} that={this.that} handleQRCode={this.handleQRCode}></QRCodeModal>
                            

                            
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
