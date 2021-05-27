import { MDBContainer } from 'mdbreact';
import React, { useContext, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { AppContext } from '../services/AppContext';

const Leaflet = () => {
    const { schools } = useContext(AppContext);
    const ref = useRef();

    useEffect(() => {

        if (schools.selectedSchool.id != null && ref.current != null) {
            const lat = schools.selectedSchool.latitude;
            const lng = schools.selectedSchool.longitude;
            console.log('selected school has changed');

            ref.current.setView([lng, lat], 20);
        }

    }, [schools.selectedSchool])

    const viewLoader = () => {

        if (schools.selectedSchool.id != null) {
            const lat = schools.selectedSchool.latitude;
            const lng = schools.selectedSchool.longitude;

            return (
                <MDBContainer>
                    <MapContainer whenCreated={mapInstance => { ref.current = mapInstance }} center={[lng, lat]} zoom={13} scrollWheelZoom={false} style={{ height: '180px' }}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[lng, lat]}>
                            <Popup>
                                {schools.selectedSchool.name}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </MDBContainer>

            );
        } else {
            return <div></div>
        }

    }

    return viewLoader();
}

export default Leaflet;