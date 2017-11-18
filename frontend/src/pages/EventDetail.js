import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Rating from '../components/Rating';
import Map from '../components/Map';
import Calendar from '../components/Calendar';

import { API_URL, MAPS_URL } from '../constants';
import Comments from '../components/Comments';

const comments = [
    {
        author: 'Roman F.',
        avatar: '1702981537',
        text: 'Registrace je na Roman Fausek. Přijďte prosím včas',
        date: new Date('2017-11-06T12:45:06+01:00')
    },{
        author: 'Mirek H.',
        avatar: '1422340757',
        text: 'Bere někdo trumpetu?',
        date: new Date('2017-11-06T11:36:45+01:00')
    },
];

class EventDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eventInfo: {
                eventName: '',
                description: '',
                place: '',
                dateFrom: '2000-01-01T00:00:00+01:00',
                dateTo: '2000-01-01T00:00:00+01:00'
            }
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
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    }

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
                <div className="container">
                    <div className="ParticipationBar">
                        <span className="ParticipationBar-text">Přijdeš na akci?</span>
                        <div className="ParticipationBar-buttonsContainer">
                            <button className="Button">Ano, přijdu</button>
                            <button className="Button Button-deny">Ne, nepřijdu</button>
                        </div>
                    </div>

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
                                    <div className="Separator" />
                                    <div className="row">
                                        <div className="col">
                                            <h6 className="mb-3">Kdo přijde?</h6>
                                            <div className="EventDetail-avatarsContainer">
                                                <div className="Avatar">
                                                    <img src="https://graph.facebook.com/100001023439070/picture" alt="Marcel Jäger" />
                                                </div>
                                                <div className="Avatar">
                                                    <img src="https://graph.facebook.com/1702981537/picture" alt="Roman Fausek" />
                                                </div>
                                                <div className="Avatar">
                                                    <img src="https://graph.facebook.com/1422340757/picture" alt="Miroslav Horňák" />
                                                </div>
                                                <div className="Avatar">
                                                    +5
                                                </div>
                                                <button className="ml-2 Button Button--secondary Button--small">Pozvat přítele</button>
                                            </div>
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

export default EventDetail;
