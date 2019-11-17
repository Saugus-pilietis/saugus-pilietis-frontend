import React from 'react';

import {key} from './api_key.js';

import GoogleMapReact from 'google-map-react';

import ReactSpeedometer from "react-d3-speedometer"


const Station = ({ text, value, refToPass, toggleStations }) => <div><div className="circle" onClick={() => toggleStations(refToPass)}></div><div ref={refToPass} className="bg-white p-3 d-none"><ReactSpeedometer segmentColors={["green", "yellow", "orange", "red", "purple", "black"]} customSegmentStops={[0, 50, 100, 150, 200, 300, 400]} segments={6} maxValue={400}  value={value} height={100} width={150}/><h6 className="d-table-row">{text}</h6></div></div>;


class GoogleMap extends React.Component {

    async updateStations(){
        await fetch('http://35.205.233.201:5000/api/airQuality/measurements').then(response => response.json()).then(data => this.setState({newData : data}));
        let data = this.state.newData;
        let newStations = {};
        for (let station in data) {
            newStations[station] = (data[station]['last_aqi']);
        }

        this.setState({
            stations : newStations,
        });

        console.log(newStations);
        let that = this
        setTimeout(function() { that.updateStations() }, 300000);
    }

    constructor(props) {
        super(props);

        this.state = {
            stations : {'3320' : 0, '3321' : 0, '3322' : 0, '3323' : 0, '3324' : 0, '3325' : 0},
            newData : null,
        }

        this.updateStations();
    }

    toggleStations(element) {
        element.current.classList.toggle('d-none');
        element.current.classList.toggle('d-table');


    }
    render() {
        return (
          // Important! Always set the container height explicitly
          <div style={{ height: '100%', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: key }}
              defaultCenter={{lat : this.props.currentCoordsLa, lng : this.props.currentCoordsLo}}
              center={{lat : this.props.currentCoordsLa, lng : this.props.currentCoordsLo}}
              defaultZoom={12}
            >
              <Station
                lat={55.7296619}
                lng={21.9292986}
                text="Žemaitija"
                value={this.state.stations['3320']}
                refToPass = {React.createRef()}
                toggleStations = {this.toggleStations}
              />
              <Station
                lat={55.6848552}
                lng={21.1840107}
                text="Klaipėda - Šilutės pl."
                value={this.state.stations['3321']}
                refToPass = {React.createRef()}
                toggleStations = {this.toggleStations}
              />
              <Station
                lat={54.9142482}
                lng={24.0221896}
                text="Kaunas - Petrašiūnai"
                value={this.state.stations['3322']}
                refToPass = {React.createRef()}
                toggleStations = {this.toggleStations}
              />
              <Station
                lat={54.8878169}
                lng={23.845993}
                text="Kaunas - Noreikiškės"
                value={this.state.stations['3323']}
                refToPass = {React.createRef()}
                toggleStations = {this.toggleStations}
              />
              <Station
                lat={54.7117424}
                lng={25.2974345}
                text="Vilnius - Žirmūnai"
                value={this.state.stations['3324']}
                refToPass = {React.createRef()}
                toggleStations = {this.toggleStations}
              />
              <Station
                lat={56.316814}
                lng={22.903861}
                text="Naujoji akmenė"
                value={this.state.stations['3325']}
                refToPass = {React.createRef()}
                toggleStations = {this.toggleStations}
              />
            </GoogleMapReact>
          </div>
        );
  }
}
 
export default GoogleMap;
