import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { API_URL, MAPS_URL } from '../constants';
import Rating from '../components/Rating';
import OpeningHours from '../components/OpeningHours';
import Map from '../components/Map';

class UserProfileRaw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurantInfo: {}
        };
    }

    componentDidMount() {
        this.loadPlaceData(this.props);
    }

    loadPlaceData = (props) => {
        const { placeId } = props.match.params;
        axios.get(`${API_URL}/restaurants/${placeId}`)
            .then((response) => {
                console.log('--->', response);
                this.setState({ restaurantInfo: response.data });
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    };

    render() {
        const { picture, adress, GPS, name, rating, numberOfRatings, openHours } = this.state.restaurantInfo;
        let coordinates = { lat: 0, lng: 0 };
        if (GPS) {
            const coordinate = GPS.split(', ');
            coordinates = { lat: parseFloat(coordinate[0]), lng: parseFloat(coordinate[1]) };
        }

        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="RestaurantProfile-map">
                            <Map
                                lat={coordinates.lat}
                                lng={coordinates.lng}
                                zoom={15}
                                googleMapURL={MAPS_URL}
                                containerElement={<div style={{ minHeight: '200px', width: '100%' }} />}
                                mapElement={<div style={{ height: '100%', width: '100%' }} />}
                                loadingElement={<div style={{ height: '100%', width: '100%' }} />}
                                marker
                            />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-12">
                            { this.state.restaurantInfo &&
                                <div className="RestaurantProfile">
                                    <div className="RestaurantProfile-photoContainer">
                                        <img src={picture} alt={name} />
                                    </div>
                                    <div className="RestaurantProfile-content">
                                        <div className="RestaurantProfile-name">
                                            {name}
                                        </div>
                                        <Rating rating={rating} number={numberOfRatings} />
                                        <div>
                                            {adress}
                                        </div>
                                        <div className="my-3">
                                            <OpeningHours data={openHours} />
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { userData } = state;

    return {
        user: userData.user,
    };
};

const UserProfile = connect(mapStateToProps)(withRouter(UserProfileRaw));
export default UserProfile;
