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
                        <Link to="/nova-udalost/krok-2" className="Button">
                            <span className="Button-text">Pokračovat</span>
                        </Link>
                    </div>
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
