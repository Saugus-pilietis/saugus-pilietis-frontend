import React from 'react';

import {key} from './api_key.js';

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


export default (GoogleApiWrapper({'apiKey' : key})(GoogleMap));

