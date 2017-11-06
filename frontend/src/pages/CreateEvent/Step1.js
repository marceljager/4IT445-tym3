import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Rating from '../../components/Rating';

export class Step1Raw extends Component {
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

                <div className="NewEvent">
                    <div className="NewEvent-box">
                        <div className="NewEvent-step">
                            <b>Krok 1</b> ze 3
                        </div>

                        <div className="Input">
                            <label htmlFor="" className="Input-label--big">Kam půjdeme?</label>
                            <input type="text" className="Input-input"/>
                        </div>

                        <div className="Separator">
                            <span className="Separator-text">Doporučené restaurace v okolí</span>
                        </div>

                        <div className="NewEvent-restaurants">
                            <div className="RestOverview RestOverview--half">
                                <div>
                                    <div className="RestOverview-img"></div>
                                </div>
                                <div>
                                    <Rating rating={5} number={3} />
                                    <div className="RestOverview-name">Restaurace na Kobylisích</div>
                                    <Link to="/" className="Link">Vybrat</Link>
                                </div>
                            </div>
                            <div className="RestOverview RestOverview--half">
                                <div>
                                    <div className="RestOverview-img"></div>
                                </div>
                                <div>
                                    <Rating rating={5} number={3} />
                                    <div className="RestOverview-name">Restaurace na Kobylisích</div>
                                    <Link to="/" className="Link">Vybrat</Link>
                                </div>
                            </div>
                            <div className="RestOverview RestOverview--half">
                                <div>
                                    <div className="RestOverview-img"></div>
                                </div>
                                <div>
                                    <Rating rating={5} number={3} />
                                    <div className="RestOverview-name">Restaurace na Kobylisích</div>
                                    <Link to="/" className="Link">Vybrat</Link>
                                </div>
                            </div>
                            <div className="RestOverview RestOverview--half">
                                <div>
                                    <div className="RestOverview-img"></div>
                                </div>
                                <div>
                                    <Rating rating={5} number={3} />
                                    <div className="RestOverview-name">Restaurace na Kobylisích</div>
                                    <Link to="/" className="Link">Vybrat</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link to="/" className="Button">
                        <span className="Button-text">Pokračovat</span>
                    </Link>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    const { userData } = state;

    return {
        user: userData.user,
    };
};

export const Step1 = connect(mapStateToProps)(Step1Raw);
