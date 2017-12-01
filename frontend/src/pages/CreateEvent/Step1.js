import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Geosuggest from 'react-geosuggest';
// import { PlaceSearch, PlaceDetailsRequest } from 'googleplaces';

import Rating from '../../components/Rating';
import Input from '../../components/Input';
import { MAPS_KEY } from '../../constants';

const PlaceSearch = require('googleplaces/lib/PlaceSearch.js');
const PlaceDetailsRequest = require('googleplaces/lib/PlaceDetailsRequest.js');

let map;
let service;
const { google } = window;

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i += 1) {
            const place = results[i];
            // console.log(place);
        }
    }
}

function initialize() {
    const autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
        console.log(autocomplete.getPlace());
    });
    // const pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);
    //
    // map = new google.maps.Map(document.getElementById('map'), {
    //     center: pyrmont,
    //     zoom: 15
    // });
    //
    // const request = {
    //     location: pyrmont,
    //     query: 'restaurant'
    // };
    //
    // service = new google.maps.places.PlacesService(map);
    // service.textSearch(request, callback);
}

export class Step1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: '',
            lng: ''
        };
    }

    getLocation = () => {
        const promise = new Promise(function(resolve, reject) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve(position.coords.latitude + ',' + position.coords.longitude);
                    }
                );
            } else {
                reject('Unknown');
            }
        });

        return promise;
    };
    componentDidMount() {
        initialize();

        const locationPromise = this.getLocation();

        locationPromise
            .then((loc) => {
                const geo = loc.split(',');
                this.setState({
                    lat: geo[0],
                    lng: geo[1]
                });
            })
            .catch((err) => { console.log('No location', err); });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.history.push('/nova-udalost/krok-2');
    };

    getPlaceInfo = (placeId) => {
        // console.log(placeId);

        const placeSearch = new PlaceSearch(MAPS_KEY, 'json');
        const placeDetailsRequest = new PlaceDetailsRequest(MAPS_KEY, 'json');

        let center;
        if (this.state.lat === '') {
            center = '-33.8670522, 151.1957362';
        } else {
            center = `${this.state.lat}, ${this.state.lng}`;
        }

        const parameters = {
            location: [center],
            types: 'restaurant'
        };

        placeSearch(parameters, (error, response) => {
            // console.log(response);
            if (error) throw error;
            placeDetailsRequest({ reference: response.results[0].reference }, (error, response) => {
                if (error) throw error;
                // console.log(response);
            });
        });
    };

    onSuggestSelect = (suggest) => {
        // initialize();
        this.getPlaceInfo(suggest.placeId);
    };

    onPlaceSearch = () => {
        // initialize();
        // this.getPlaceInfo(suggest.placeId);
    };

    render() {
        const geo = this.state;

        return (
            <section>
                <div id="map" />
                <div className="SubHead">
                    <div className="SubHead-head">
                        <div className="SubHead-overlay"></div>
                        <div className="SubHead-content">
                            <div className="container">
                                <div className="text-center">
                                    <h1 className="SubHead-title">Vytvoř novou akci</h1>
                                    <p className="SubHead-text">a my ti ji pomůžeme zrealizovat</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={this.handleSubmit} className="NewEvent">
                    <div className="NewEvent-box">
                        <div className="NewEvent-step">
                            <strong>Krok 1</strong> ze 3
                        </div>

                        <div className="Input mb-5">
                            <label htmlFor="place" className="Input-label--big">Kam půjdeme?</label>

                            <input
                                type="text"
                                id="place"
                                className="Input-input"
                                onChange={this.onPlaceSearch}
                                disabled={geo.lat === ''}
                            />
                            {/*<Geosuggest*/}
                                {/*inputClassName="Input-input"*/}
                                {/*onSuggestSelect={this.onSuggestSelect}*/}
                                {/*disabled={geo.lat === ''}*/}
                            {/*/>*/}
                        </div>

                        <div id="autocomplete"></div>

                        <div className="Separator">
                            <span className="Separator-text">Doporučené restaurace v okolí</span>
                        </div>

                        <div className="NewEvent-restaurants">
                            <div className="RestOverview">
                                <div>
                                    <div className="RestOverview-img"></div>
                                </div>
                                <div className="pr-3">
                                    <Rating rating={5} />
                                    <div className="RestOverview-name">Restaurace na Kobylisích</div>
                                    <Link to="/" className="Link">Vybrat</Link>
                                </div>
                            </div>
                            <div className="RestOverview">
                                <div>
                                    <div className="RestOverview-img"></div>
                                </div>
                                <div className="pr-3">
                                    <Rating rating={5} />
                                    <div className="RestOverview-name">Restaurace na Kobylisích</div>
                                    <Link to="/" className="Link">Vybrat</Link>
                                </div>
                            </div>
                            <div className="RestOverview">
                                <div>
                                    <div className="RestOverview-img"></div>
                                </div>
                                <div className="pr-3">
                                    <Rating rating={5} />
                                    <div className="RestOverview-name">Restaurace na Kobylisích</div>
                                    <Link to="/" className="Link">Vybrat</Link>
                                </div>
                            </div>
                            <div className="RestOverview">
                                <div>
                                    <div className="RestOverview-img"></div>
                                </div>
                                <div className="pr-3">
                                    <Rating rating={5} />
                                    <div className="RestOverview-name">Restaurace na Kobylisích</div>
                                    <Link to="/" className="Link">Vybrat</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="my-4 text-center">
                        <button type="submit" className="Button">
                            <span className="Button-text">Pokračovat</span>
                        </button>
                    </div>
                </form>
            </section>
        );
    }
}
