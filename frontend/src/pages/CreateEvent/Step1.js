import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Geosuggest from 'react-geosuggest';

import Rating from '../../components/Rating';
import Input from '../../components/Input';
import {MAPS_KEY} from "../../constants";

export class Step1 extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.history.push('/nova-udalost/krok-2');
    };

    onSuggestSelect = (suggest) => {
        console.log(suggest);
        console.log(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${suggest.placeId}&key=${MAPS_KEY}`);

        axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${suggest.placeId}&key=${MAPS_KEY}`, {

        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
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
                            <label htmlFor="place" className="Input-label--big">Kam půjdeme?</label>
                            <Geosuggest
                                inputClassName="Input-input"
                                onSuggestSelect={this.onSuggestSelect}
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
