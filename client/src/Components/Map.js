import React, { Component } from 'react'
import ElderList from './ElderList'
import BoxList from './BoxList';
import AppNavbar from './AppNavBar';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ActList from './ActList';
import InstList from './InstList';
import {iconBox,iconOldOne} from './Marker'
import { withAuthenticationRequired } from '@auth0/auth0-react';

class Mapa extends Component {
    constructor(props) {
        super(props)
        this.state = {
            boxes: [],
            elders: [],
            acts: [],
            insts:[],
            loading: true
        }

    }

    async componentDidMount() {
        const boxResponse = await fetch("http://localhost:6080/box")
        const boxBbody = await boxResponse.json();
        const elderResponse = await fetch("http://localhost:6080/utente")
        const elderBody = await elderResponse.json();
        const actResponse = await fetch("http://localhost:6080/activity")
        const actBody = await actResponse.json();
        const instResponse = await fetch("http://localhost:6080/institution")
        const instBody = await instResponse.json();
        this.setState({ boxes: boxBbody, elders: elderBody, acts: actBody,insts:instBody})
        this.setState({ loading: false })
    }

    render() {

        const { elders, boxes } = this.state;
        console.log(this.state.insts)

        if (this.state.loading === true) {

            return <h1>loading...</h1>
        }
        else {
            const ElderMapMarkers = elders.map(elder => {
                return (
                    <Marker position={[elder.latitude, elder.longitude]} icon={iconOldOne}>
                        <Popup>
                            {elder.ID}:{elder.name}
                            <br />
                            {elder.address},{elder.codPostal}
                        </Popup>
                    </Marker>
                )
            })
            const MapMarkers = boxes.map(box => {

                return (
                    <Marker position={[box.latitude, box.longitude]} icon={iconBox} >
                        <Popup>
                            {box.ID} : {box.status} , {box.oldOne}
                        </Popup>
                    </Marker>
                )
            })

            return (
                <div>
                    <AppNavbar />

                    <MapContainer center={[39.48126240111427, -8.538630427954901]} zoom={11} minZoom={2} scrollWheelZoom={true} style={{
                        height: 550}}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {MapMarkers}
                        {ElderMapMarkers}
                    </MapContainer>

                    <Tabs>
                        <TabList>
                            <Tab> Boxes</Tab>
                            <Tab> Elders</Tab>
                            <Tab> Institutions</Tab>
                            <Tab>Activities</Tab>
                        </TabList>

                        <TabPanel>
                            {<BoxList boxes={this.state.boxes} elders={this.state.elders} />}
                        </TabPanel>
                        <TabPanel>
                            {<ElderList elders={this.state.elders} insts={this.state.insts} />}
                        </TabPanel>
                        <TabPanel>
                            {<InstList insts={this.state.insts}/>}
                        </TabPanel>
                        <TabPanel>
                            {<ActList acts={this.state.acts} />}
                        </TabPanel>
                    </Tabs>
                </div>
            );
        }
    }
}

export default withAuthenticationRequired(Mapa)