import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { changeInputValue } from '../../actions/event';

import { API_URL } from '../../constants';

import Rating from '../../components/Rating';

const { google } = window;
let place = {};

class Step1 extends Component {
    componentDidMount() {
        this.initialize();
    }

    initialize = () => {
        const autocomplete = new google.maps.places.Autocomplete(document.getElementById('restaurant'));

        google.maps.event.addListener(autocomplete, 'place_changed', () => {
            place = autocomplete.getPlace();
            console.log(place);
            const { changeInputValue } = this.props;
            changeInputValue('restaurant', autocomplete.getPlace().name);
        });
    };

    handleRestaurantChange = (e) => {
        const { changeInputValue } = this.props;
        changeInputValue('restaurant', e.target.value);
    };

    handleSubmit = (e) => {
        e.preventDefault();

        let placeObj = {
            id: place.place_id,
            name: place.name,
            adress: place.formatted_address,
            GPS: `${place.geometry.location.lat()}, ${place.geometry.location.lng()}`
        };

        const possibleStats = {
            rating: 'rating',
            numberOfRatings: 'reviews',
            website: 'website',
            openHours: 'opening_hours',
            description: 'formatted_phone_number',
            picture: 'icon'
        };

        for (const key in possibleStats) {
            if (place[possibleStats[key]] !== undefined) {
                placeObj[key] = place[possibleStats[key]];

                if (key === 'numberOfRatings') {
                    placeObj[key] = place[possibleStats[key]].length;
                } else if (key === 'openHours') {
                    console.log(JSON.stringify(place[possibleStats[key]].weekday_text));
                    placeObj[key] = JSON.stringify(place[possibleStats[key]].weekday_text);
                }
            }
        }

        console.log(placeObj);

        axios.put(`${API_URL}/restaurants`, placeObj)
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });

        this.props.history.push('/nova-udalost/krok-2');
    };

    render() {
        const { restaurant } = this.props;

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
                            <label htmlFor="restaurant" className="Input-label--big">Kam půjdeme?</label>

                            <input
                                type="text"
                                id="restaurant"
                                className="Input-input"
                                value={restaurant}
                                onChange={this.handleRestaurantChange}
                            />
                        </div>

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

const mapStateToProps = (state) => {
    const { event } = state;

    return {
        restaurant: event.restaurant,
    };
};


const mapDispatchToProps = {
    changeInputValue
};

export default connect(mapStateToProps, mapDispatchToProps)(Step1);
