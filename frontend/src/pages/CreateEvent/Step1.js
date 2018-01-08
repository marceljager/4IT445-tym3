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
    constructor(props) {
        super(props);
        this.state = {
            restaurant: '',
            recRests: []
        };
    }

    componentDidMount() {
        this.initialize();
        this.loadData();
    }

    loadData = () => {
        axios.get(`${API_URL}/restaurants/recommended?count=4`)
            .then((recommended) => {
                console.log('response: ', recommended.data.data);
                this.setState({
                    recRests: recommended.data.data
                });
            });
    };

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

    handlePreferedRestaurant = (restaurant) => {
        const { changeInputValue } = this.props;
        const placeObj = restaurant;

        changeInputValue('restaurant', placeObj.name);
        changeInputValue('restaurantId', placeObj.id);

        this.props.history.push('/nova-udalost/krok-2');
    };

    handleSubmit = (e) => {
        e.preventDefault();

        let placeObj = {
            id: place.place_id,
            name: place.name,
            adress: place.formatted_address,
            GPS: `${place.geometry.location.lat()}, ${place.geometry.location.lng()}`,
            description: place.name,
            rating: 0,
            numberOfRatings: 0,
            recommended: 0
        };

        const possibleStats = {
            rating: 'rating',
            numberOfRatings: 'reviews',
            website: 'website',
            openHours: 'opening_hours',
            description: 'formatted_phone_number',
            picture: 'photos'
        };

        for (const key in possibleStats) {
            if (place[possibleStats[key]] !== undefined) {
                placeObj[key] = place[possibleStats[key]];

                if (key === 'numberOfRatings') {
                    placeObj[key] = place[possibleStats[key]].length;
                } else if (key === 'openHours') {
                    console.log(JSON.stringify(place[possibleStats[key]].weekday_text));
                    placeObj[key] = JSON.stringify(place[possibleStats[key]].weekday_text);
                } else if (key === 'picture') {
                    placeObj[key] = place[possibleStats[key]][0].getUrl({ maxWidth: 150, maxHeight: 100 });
                }
            }
        }

        console.log(placeObj);

        const { changeInputValue } = this.props;
        changeInputValue('restaurantId', placeObj.id);

        axios.put(`${API_URL}/restaurants`, placeObj)
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });

        this.props.history.push('/nova-udalost/krok-2');
    };

    render() {
        return (
            <section>
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
                                value={this.props.restaurant}
                                onChange={this.handleRestaurantChange}
                            />
                        </div>

                        <div className="Separator">
                            <span className="Separator-text">Doporučené restaurace v okolí</span>
                        </div>

                        <div className="NewEvent-restaurants">
                            {this.state.recRests.map(recRest => (
                                <div className="RestOverview">
                                    <div>
                                        <div className="RestOverview-img">
                                            <img src={recRest.picture} alt={recRest.name} />
                                        </div>
                                    </div>
                                    <div className="pr-3">
                                        {recRest.rating !== 0
                                            ? <Rating rating={recRest.rating} />
                                            : ''
                                        }
                                        <div className="RestOverview-name">{recRest.name}</div>
                                        <span className="Link" onClick={() => this.handlePreferedRestaurant(recRest)}>Vybrat</span>
                                    </div>
                                </div>
                            ))}
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
