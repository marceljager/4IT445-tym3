import React, { Component } from 'react';
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

const comments = [
    {
        author: 'Roman F.',
        avatar: '1702981537',
        text: 'Registrace je na Roman Fausek. Přijďte prosím včas',
        date: new Date('2017-11-06T12:45:06+01:00')
    }, {
        author: 'Mirek H.',
        avatar: '1422340757',
        text: 'Bere někdo trumpetu?',
        date: new Date('2017-11-06T11:36:45+01:00')
    },
];

class EventDetailRaw extends Component {
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
            signedIn: {}
        };
    }

    componentDidMount() {
        const { eventId } = this.props.match.params;
        this.loadData(eventId);
    }

    loadData(eventId) {
        axios.get(`${API_URL}/events/${eventId}?filter[include]=guests`)
            .then((response) => {
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
                    signedIn: this.props.user
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
                    signedIn: {},
                    participationBar: false
                });
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    };

    render() {
        const { eventInfo } = this.state;

        const calendarEvent = {
            title: eventInfo.name,
            description: eventInfo.description,
            location: eventInfo.place,
            startTime: eventInfo.dateFrom,
            endTime: eventInfo.dateTo
        };

        return (
            <div className="EventDetail">
                {!eventInfo.name &&
                    <div className="Loading">
                        <ReactSVG path={Loading} className="Loading-spinner" />
                    </div>
                }
                <div className={`container ${!eventInfo.name ? ' Loading-content' : ''}`}>
                    <div className="row justify-content-center">
                        <div className="col-9">
                            <div className="row">
                                <div className="col-3 position-static">
                                    <div className="EventDetail-calendar">
                                        <Calendar dateFrom={eventInfo.dateFrom} dateTo={eventInfo.dateTo} addToCalendar={calendarEvent} />
                                    </div>
                                    <div className="EventDetail-mainImageContainer">
                                        <Map
                                            lat={50.0842787}
                                            lng={14.3748887}
                                            zoom={15}
                                            googleMapURL={MAPS_URL}
                                            containerElement={<div style={{ height: '100%', width: '100%' }} />}
                                            mapElement={<div style={{ height: '100%', width: '100%' }} />}
                                            loadingElement={<div style={{ height: '100%', width: '100%' }} />}
                                            marker
                                        />
                                    </div>
                                </div>
                                <div className="col-9 EventDetail-textSide p-5">
                                    <h2 className="EventDetail-title mb-2">{eventInfo.name}</h2>
                                    <div className="EventDetail-about">
                                        {eventInfo.description}
                                    </div>
                                    {this.props.user.id &&
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
                                            <EventParticipants signedIn={this.state.signedIn ? this.props.user : {}} guests={eventInfo.guests} />
                                        </div>
                                    </div>
                                    <div className="Separator" />
                                    <div className="row">
                                        <div className="col">
                                            <h6 className="mb-3">Kde to bude?</h6>
                                            <Link to="/" className="RestaurantInfo">
                                                <span className="RestaurantInfo-imageContainer">
                                                    <img src="./upload/userUpload/na-marjance.jpg" alt="Restaurace Marjánka" className="RestaurantInfo-image" />
                                                </span>
                                                <span className="RestaurantInfo-text">
                                                    <span className="RestaurantInfo-name">Restaurace Marjánka</span>
                                                    <span className="RestaurantInfo-address">Plážová 33, Praha 5</span>
                                                    <Rating rating={eventInfo.rating} number={eventInfo.numberOfRatings} />
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="Separator" />
                                    <div className="row">
                                        <div className="col">
                                            <h6 className="mb-3">Komentáře</h6>
                                            <Comments data={comments} />
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
