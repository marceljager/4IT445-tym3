import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class Step1Raw extends Component {
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
                            <div className="mb-3">
                                <div className="Input">
                                    <label htmlFor="title" className="Input-label Input-label--big">Titulek</label>
                                    <input type="text" id="title" className="Input-input"/>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="Input">
                                    <label htmlFor="desc" className="Input-label Input-label--big">Popis</label>
                                    <span className="d-block mb-2">
                                        Potřebuješ inspiraci? Podívej se na <Link to="/" className="Link">příklady nejlepších akcí</Link>
                                    </span>
                                    <textarea name="desc" id="desc" className="Input-input Input-input--textarea"></textarea>
                                </div>
                            </div>

                            <Link to="/nova-udalost/krok-2" className="Button">
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

export const Step1 = connect(mapStateToProps)(Step1Raw);
