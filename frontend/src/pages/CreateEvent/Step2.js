import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class Step2Raw extends Component {
    render() {
        return (
            <section className="NewEvent">
                <div>
                    <div className="NewEvent-head">
                        <div className="container">
                            <div className="text-center">
                                <h1>Vytvoř novou akci</h1>
                                <p className="NewEvent-headParagraph">a my ti ji pomůžeme zrealizovat</p>
                            </div>
                        </div>
                    </div>

                    <div className="container mt-4">
                        <div className="NewEvent-content">
                            <span className="NewEvent-step">
                                <b>Krok 1 ze 3</b>
                            </span>

                            <div>
                                <span className="NewEvent-title">
                                    Step1 title
                                </span>
                            </div>

                            <div>
                                <p>Step1 description. Step1 description. Step1 description. Step1 description. Step1 description. Step1 description. Step1 description. Step1 description. Step1 description. Step1 description. Step1 description. Step1 description. </p>
                            </div>

                            <hr className="my-5"/>

                            <span className="NewEvent-step">
                                <b>Krok 2 ze 3</b>
                            </span>
                            <div className="mb-3">
                                <div className="Input">
                                    <label htmlFor="location" className="Input-label Input-label--big">Kam půjdete?</label>
                                    <input type="text" id="location" className="Input-input"/>
                                </div>
                            </div>

                            <div className="mb-3">
                                <h6>Doporučené restaurace v okolí</h6>

                                <div className="mb-2">
                                    <span><Link to="/" className="Link">Na knížecí <span className="Link-highlight">4.3* ($$)</span></Link>, </span>
                                    <span><Link to="/" className="Link">Moravanka <span className="Link-highlight">4.1* ($$)</span></Link>, </span>
                                    <span><Link to="/" className="Link">Kobylisy <span className="Link-highlight">5* ($$$)</span></Link></span>
                                </div>

                                <div>
                                    <a href="www.maps.google.com" className="Link" target="_blank">Zobrazit mapu</a>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="Input">
                                    <label htmlFor="note" className="Input-label Input-label--big">Poznámka k restauraci</label>
                                    <input type="text" id="note" className="Input-input"/>
                                </div>
                            </div>

                            <Link to="/nova-udalost/krok-3" className="Button">
                                <span className="Button-text">Další</span>
                            </Link>
                        </div>
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

export const Step2 = connect(mapStateToProps)(Step2Raw);
