import React from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';

const Map = withScriptjs(withGoogleMap(props => (
    <GoogleMap defaultZoom={props.zoom ? props.zoom : 8} center={{ lat: props.lat, lng: props.lng }}>
        {props.marker && <Marker position={{ lat: props.lat, lng: props.lng }} />}
    </GoogleMap>
)));

export default Map;
