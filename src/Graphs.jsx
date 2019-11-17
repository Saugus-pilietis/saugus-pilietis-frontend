import React from 'react';

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import { Line } from 'react-chartjs-2';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Graphs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            station : "Žemaitija",
            stationId : {"Žemaitija" : '3320', "Klaipėda - Šilutės pl." : '3321', "Kaunas - Petrašiūnai" : '3322', "Kaunas - Noreikiškės" : '3323', "Vilnius - Žirmūnai" : '3324', "Naujoji akmenė" : '3325'},
            data : "Ozonas",
            dataId : {"Ozonas" : 'o3', "Sieros dioksidas" : 'so2', "Kietosios dalelės > 10μm" : 'pm10', "Kietosios dalelės > 2.5μm" : 'pm25', "Drėgmė" : 'h', "Slėgis" : 'p', 'Kirtulių kiekis' : 'r', "Temperatūra" : 't', 'Vėjo greitis' : 'w'},
            dataTitle : {"o3" : 'Ozonas', "so2" : 'Sieros dioksidas', "pm10" : 'Kietosios dalelės > 10μm', "pm25" : 'Kietosios dalelės > 2.5μm', "h" : 'Drėgmė', "p" : 'Slėgis', 'r' : 'Kirtulių kiekis', "t" : 'Temperatūra', 'w' : 'Vėjo greitis'},
            graphData : {datasets : [{
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data : [], 
                label: ""
            }], labels : []},
            itemsInDropdown : []
        }

        this.handleDropdown("Žemaitija", 0);
    }

    updateDropdown(allData) {
        let itemsInDropdown = [];
        for (let key in allData[this.state.stationId[this.state.station]][0]) {
            if(this.state.dataTitle[key] != undefined && allData[this.state.stationId[this.state.station]][0][key] != null && allData[this.state.stationId[this.state.station]][0][key] > 0) {
                itemsInDropdown.push(this.state.dataTitle[key]);
            }
        }
        this.setState({
            itemsInDropdown : itemsInDropdown,
            data : itemsInDropdown[0],
        });
    }

    setUpGraphData(allData, label) {
        let graphData = this.state.graphData;
        let data = [];
        let dates = [];
        for (let i = 0; i < allData[this.state.stationId[this.state.station]].length; i++) {
            data.push(allData[this.state.stationId[this.state.station]][i][this.state.dataId[this.state.data]]);
            dates.push(allData[this.state.stationId[this.state.station]][i]['time'].split('T')[1].split('.')[0].substring(0, 5))
            
        }
        graphData['datasets'][0]['data'] = data;
        graphData['datasets'][0]['label'] = this.state.data;
        graphData['labels'] = dates;
        return graphData;

    }
    async handleDropdown(name, target) {
        if (target) {
            await this.setState({
                data : name,
            });
        } else {
            await this.setState({
                station : name,
            });
        }
        let allData = await fetch('http://35.205.233.201:5000/api/airQuality/historical_measurements/'+this.state.stationId[this.state.station]).then(response => response.json());
        if (!target) {
            await this.updateDropdown(allData);            
        }
        let graphData = this.setUpGraphData(allData);
        this.setState({
            graphData : graphData
        });

    }

    render() {
        return (
            <div className="h-100 w-100">
                <Row className="m-3">
                    <Col className="mr-5" md={1}>
                        <DropdownButton
                          variant="outline-success"
                          title={this.state.station}
                          id="input-group-dropdown-1"
                          className="mb-3"
                          size="lg"
                        >
                            <Dropdown.Item onClick={() => this.handleDropdown("Žemaitija", 0)}>Žemaitija</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.handleDropdown("Klaipėda - Šilutės pl.", 0)}>Klaipėda - Šilutės pl.</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.handleDropdown("Kaunas - Petrašiūnai", 0)}>Kaunas - Petrašiūnai</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.handleDropdown("Kaunas - Noreikiškės", 0)}>Kaunas - Noreikiškės</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.handleDropdown("Vilnius - Žirmūnai", 0)}>Vilnius - Žirmūnai</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.handleDropdown("Naujoji akmenė", 0)}>Naujoji akmenė</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                    <Col>
                        <DropdownButton
                          variant="outline-success"
                          title={this.state.data}
                          id="input-group-dropdown-1"
                          className="T"
                          size="lg"
                        >{this.state.itemsInDropdown.map(item => <Dropdown.Item onClick={() => this.handleDropdown(item, 1)}>{item}</Dropdown.Item>)}
                        </DropdownButton>
                    </Col>
                </Row>

                <Line options={{ maintainAspectRatio: false }} data={this.state.graphData}></Line>
            </div>



        )
    }

}

export default Graphs;