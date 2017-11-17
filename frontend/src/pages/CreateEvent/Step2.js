import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class Step2Raw extends Component {
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
                            <strong>Krok 1</strong> ze 3{' '}
                            <Link to="/nova-udalost/krok-1">Upravit</Link>
                        </div>
                        <label className="NewEvent-label">
                            Restaurace:
                        </label>

                        <p>
                            Restaurace na koby
                        </p>

                        <hr className="my-4" />

                        <div className="NewEvent-step">
                            <strong>Krok 2</strong> ze 3
                        </div>

                        <div className="Input mb-3">
                            <label htmlFor="title" className="Input-label--big">Název akce</label>
                            <input type="text" id="title" className="Input-input"/>
                        </div>

                        <div className="Input">
                            <label htmlFor="description" className="Input-label--big">Popis akce</label>
                            <textarea type="text" id="description" className="Input-input Input-input--textarea" />
                        </div>
                    </div>

                    <div className="my-4 text-center">
                        <Link to="/nova-udalost/krok-3" className="Button">
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

export const Step2 = connect(mapStateToProps)(Step2Raw);
