import React from "react";
import { geolocated } from "react-geolocated";
 
class Geolocation extends React.Component {


    render() {
        

        return;
    }
}
 
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Geolocation);