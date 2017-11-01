import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class Step3Raw extends Component {
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

                            <div>
                                <span className="NewEvent-title">
                                    Kam půjdete?
                                </span>
                            </div>

                            <div>
                                <span>Restaurace Kobylisy</span>
                                <Link to="/nova-udalost/krok-2" className="Link">(změnit)</Link>
                            </div>

                            <div>
                                <p>Sezení venku</p>
                            </div>

                            <hr className="my-5"/>

                            <span className="NewEvent-step">
                                <b>Krok 3 ze 3</b>
                            </span>

                            <span className="NewEvent-title">
                                Kdo půjde s Vámi?
                            </span>

                            <div className="d-flex my-3">
                                <div className="mr-2">
                                    <Link to="/" className="Button Button--secondary">
                                        <span className="Button-text">Veřejná akce</span>
                                    </Link>
                                </div>

                                <div>
                                    <Link to="/" className="Button Button--secondary">
                                        <span className="Button-text">Akce s přáteli</span>
                                    </Link>
                                </div>
                            </div>

                            <h5>Pozvěte přátelé</h5>
                            <div>
                                <div className="d-flex justify-content-between mb-3">
                                    <div>
                                        <div className="NewEvent-userPhoto"></div>
                                        <span>Roman Fausek</span>
                                    </div>
                                    <div>
                                        <Link to="/" className="Button">
                                            <span className="Button-text">Pozvat</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <div>
                                        <div className="NewEvent-userPhoto"></div>
                                        <span>Roman Fausek</span>
                                    </div>
                                    <div>
                                        <Link to="/" className="Button">
                                            <span className="Button-text">Pozvat</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <div>
                                        <div className="NewEvent-userPhoto"></div>
                                        <span>Roman Fausek</span>
                                    </div>
                                    <div>
                                        <Link to="/" className="Button">
                                            <span className="Button-text">Pozvat</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <Link to="/" className="Button">
                                <span className="Button-text">Vytvořit akci</span>
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

export const Step3 = connect(mapStateToProps)(Step3Raw);
