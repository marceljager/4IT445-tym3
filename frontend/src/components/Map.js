import React from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';

const Map = withScriptjs(withGoogleMap((props) => {
    if (props.hideButtons) {
        return (
            <GoogleMap
                defaultZoom={props.zoom ? props.zoom : 8}
                center={{ lat: props.lat, lng: props.lng }}
                defaultOptions={{
                    streetViewControl: false,
                    scaleControl: false,
                    mapTypeControl: false,
                    panControl: false,
                    zoomControl: false,
                    rotateControl: false,
                    fullscreenControl: false
                }}
            >
                {props.marker && <Marker position={{ lat: props.lat, lng: props.lng }} />}
            </GoogleMap>
        );
    }

    return (
        <GoogleMap
            defaultZoom={props.zoom ? props.zoom : 8}
            center={{ lat: props.lat, lng: props.lng }}
        >
            {props.marker && <Marker position={{ lat: props.lat, lng: props.lng }} />}
        </GoogleMap>
    );
}));

export default Map;
