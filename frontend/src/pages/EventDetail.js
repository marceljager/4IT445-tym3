import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Rating from '../components/Rating';
import Map from '../components/Map';
import Calendar from '../components/Calendar';

import { MAPS_URL } from '../constants';
import Comments from "../components/Comments";

const dateFrom = '2017-12-16T20:15:00+0100';
const dateTo = '2017-12-16T21:45:00+0100';

const event = {
    title: 'Slavnostní otevření restaurace Marjánka',
    description: 'Lorem Ipsum je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu.\n' +
    'Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století, kdy dnes neznámý\n' +
    'tiskař vzal kusy textu a na jejich základě vytvořil speciální vzorovou knihu. Jeho odkaz nevydržel\n' +
    'pouze pět století, on přežil i nástup elektronické sazby v podstatě beze změny.',
    location: 'Plážová 33, Praha 5',
    startTime: dateFrom,
    endTime: dateTo
};

const comments = [
    {
        author: 'Roman F.',
        avatar: '1702981537',
        text: 'Registrace je na Roman Fausek. Přijďte prosím včas',
        date: '2017-11-05T12:45:06+0100'
    },{
        author: 'Mirek H.',
        avatar: '1422340757',
        text: 'Bere někdo trumpetu?',
        date: '2017-11-05T11:36:45+0100'
    },
];

class EventDetail extends Component {
    render() {
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
                                        <Calendar dateFrom={dateFrom} dateTo={dateTo} addToCalendar={event} />
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
                                    <h2 className="EventDetail-title mb-2">Slavnostní otevření restaurace Marjánka</h2>
                                    <div className="EventDetail-about">
                                        Lorem Ipsum je demonstrativní výplňový text používaný v tiskařském a knihařském průmyslu.
                                        Lorem Ipsum je považováno za standard v této oblasti už od začátku 16. století.
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
                                                    <Rating rating={4.5} number={12} />
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
