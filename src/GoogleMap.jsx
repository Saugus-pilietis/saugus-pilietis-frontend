import React from 'react';

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class GoogleMap extends React.Component {

  render() {
    return (
      <Map google={this.props.google} zoom={7.5} class="map" initialCenter={{ lat: 55.287899, lng: 23.974739}} style={{'width' : this.props.mapWidth, 'height' : '92%'}}>
 
        <InfoWindow>
            <div>
              <h1>hi</h1>
            </div>
        </InfoWindow>
      </Map>

    );
  }
}

async function fetchKey() {
      const response = await fetch("http://35.205.233.201:5000/api/keys/map_key");
      return response.json()["api_key"];
}


export default GoogleApiWrapper({
  //apiKey: (fetchKey())
   apiKey: ""
})(GoogleMap)
 
