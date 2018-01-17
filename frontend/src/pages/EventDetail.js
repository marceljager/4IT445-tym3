import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import axios from 'axios';

import ReactSVG from 'react-svg';

import Rating from '../components/Rating';
import Map from '../components/Map';
import Calendar from '../components/Calendar';
import Comments from '../components/Comments';

import { API_URL, MAPS_URL } from '../constants';
import { isInObject } from '../functions';


import Loading from '../img/loading.svg';
import EventParticipants from '../components/EventParticipants';

class EventDetailRaw extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            eventInfo: {
                eventName: '',
                description: '',
                place: '',
                dateFrom: '2000-01-01T00:00:00+01:00',
                dateTo: '2000-01-01T00:00:00+01:00',
                guests: []
            },
            participationBar: false,
            signedIn: false
        };
    }

    componentDidMount() {
        const { eventId } = this.props.match.params;
        this.loadData(eventId);
    }

    loadData(eventId) {
        axios.get(`${API_URL}/events/${eventId}?filter[include]=guests&filter[include]=hostedIn&filter[include]=comments`)
            .then((response) => {
                console.log('-->', response);
                this.setState({
                    eventInfo: response.data
                });

                this.showBar(500);
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    }

    showBar = (timeout) => {
        setTimeout(() => {
            if (!isInObject(this.props.user, this.state.eventInfo.guests)) {
                this.setState({
                    participationBar: true
                });
            } else {
                this.setState({
                    signedIn: true
                });
            }
        }, timeout);
    };

    hideBar = () => {
        this.setState({
            participationBar: false
        });
    };

    participate = () => {
        const { eventId } = this.props.match.params;
        const { id, accessToken } = this.props.user;
        axios.put(`${API_URL}/events/${eventId}/guests/rel/${id}?access_token=${accessToken}`)
            .then(() => {
                this.setState({
                    signedIn: true,
                    participationBar: false
                });
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    };

    render() {
        const { eventInfo } = this.state;

        let calendarEvent = null;
        let coordinates = null;
        let address = null;
        if (eventInfo && eventInfo.hostedIn) {
            calendarEvent = {
                title: eventInfo.name,
                description: eventInfo.description,
                location: eventInfo.hostedIn.adress,
                startTime: eventInfo.dateFrom,
                endTime: eventInfo.dateTo
            };

            const coordinate = eventInfo.hostedIn.GPS.split(', ');
            coordinates = { lat: parseFloat(coordinate[0]), lng: parseFloat(coordinate[1]) };
            address = eventInfo.hostedIn.adress.split(', ');
            address = `${address[0]}, ${address[1]}`;
        }

        const varDate = new Date(eventInfo.dateFrom);
        const today = new Date();

        return (
            <div className="EventDetail">
                {!eventInfo.name &&
                    <div className="Loading">
                        <ReactSVG path={Loading} className="Loading-spinner" />
                    </div>
                }
                <div className={`container position-relative ${!eventInfo.name ? ' Loading-content' : ''}`}>
                    {this.props.user.id === 2 &&
                    <div className="EventDetail-admin">
                        <button className="Button Button--small Button--deny">Smazat</button>
                    </div>
                    }
                    <div className="row justify-content-center">
                        <div className="col-12 col-xl-3">
                            <div className="EventDetail-calendar">
                                <Calendar dateFrom={eventInfo.dateFrom} dateTo={eventInfo.dateTo} addToCalendar={calendarEvent} />
                            </div>
                        </div>
                        <div className="col-12 col-xl-9">
                            <div className="row">
                                <div className="col-12 position-static px-0 px-md-3">
                                    {coordinates &&
                                        <div className="EventDetail-mainImageContainer">
                                            <Map
                                                lat={coordinates.lat}
                                                lng={coordinates.lng}
                                                zoom={15}
                                                googleMapURL={MAPS_URL}
                                                containerElement={<div style={{ height: '100%', width: '100%' }} />}
                                                mapElement={<div style={{ height: '100%', width: '100%' }} />}
                                                loadingElement={<div style={{ height: '100%', width: '100%' }} />}
                                                marker
                                                hideButtons
                                            />
                                        </div>
                                    }
                                </div>
                                <div className="col-12 col-xl-9 EventDetail-textSide pb-5 p-md-5 mt-5 mt-md-0">
                                    <h2 className="EventDetail-title mb-2">{eventInfo.name}</h2>
                                    <div className="EventDetail-about">
                                        {eventInfo.dateText}
                                    </div>
                                    {this.props.user.id && varDate > today &&
                                        <div className={`${this.state.participationBar ? 'isVisible ' : ''}ParticipationBar d-flex align-items-center`}>
                                            <div className="container d-flex justify-content-center align-items-center">
                                                <span className="ParticipationBar-text">Přijdeš na akci?</span>
                                                <div className="ParticipationBar-buttonsContainer">
                                                    <button className="Button Button--small Button--accept mr-2" onClick={this.participate}>
                                                        Ano, přijdu
                                                    </button>
                                                    <button className="Button Button--small Button--deny" onClick={this.hideBar}>
                                                        Ještě nevím
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    <div className="Separator" />
                                    <div className="row">
                                        <div className="col">
                                            <h6 className="mb-3">Kdo přijde?</h6>
                                            <EventParticipants signedIn={this.state.signedIn} guests={eventInfo.guests} />
                                        </div>
                                    </div>
                                    {eventInfo && eventInfo.hostedIn &&
                                        <div className="row">
                                            <div className="Separator" />
                                            <div className="col">
                                                <h6 className="mb-3">Kde to bude?</h6>
                                                <Link to={`/misto/${eventInfo.hostedIn.id}`} className="RestaurantInfo">
                                                    {eventInfo.hostedIn.picture &&
                                                        <span className="RestaurantInfo-imageContainer">
                                                            <img src={eventInfo.hostedIn.picture} alt="Restaurace Marjánka" className="RestaurantInfo-image" />
                                                        </span>
                                                    }
                                                    <span className="RestaurantInfo-text">
                                                        <span className="RestaurantInfo-name">{eventInfo.hostedIn.name}</span>
                                                        <span className="RestaurantInfo-address">{address}</span>
                                                        <Rating rating={eventInfo.hostedIn.rating} number={eventInfo.hostedIn.numberOfRatings} />
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    }
                                    <div className="Separator" />
                                    <div className="row">
                                        <div className="col">
                                            <h6 className="mb-3">Komentáře</h6>
                                            <Comments />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
EventDetailRaw.propTypes = {
    match: propTypes.shape({
        params: propTypes.shape({
            eventId: propTypes.string
        })
    }),
    user: propTypes.shape({
        id: propTypes.number,
        accessToken: propTypes.string
    })
};

EventDetailRaw.defaultProps = {
    match: {
        params: {
            eventId: 0
        }
    },
    user: {}
};

const mapStateToProps = (state) => {
    const { userData } = state;

    return {
        user: userData.user,
    };
};

const EventDetail = connect(mapStateToProps)(withRouter(EventDetailRaw));
export default EventDetail;
