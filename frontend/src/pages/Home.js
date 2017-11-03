import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import RecommendedEvents from '../components/RecommendedEvents';
import TodayEvents from '../components/TodayEvents';

export class HomeRaw extends Component {
    render() {
        /* const { user } = this.props; */
        return (
            <div>
                <header className="Header">
                    <div className="Header-overlay"></div>
                    <div className="container">
                        <div className="Header-content">
                            <h1 className="mb-3">Najez se v příjemné společnosti</h1>
                            <p>Pozvi přátele na oběd nebo se připoj k jedné z více než 120 akcí v okolí.</p>

                            <Link to="/" className="Button Button--secondary Button--big mt-3">
                                <span className="Button-text">
                                    Objev akce v okolí
                                </span>
                            </Link>

                            <div className="mt-2">
                                <p>
                                    nebo <Link to="/nova-udalost/krok-1" className="Link">vytvoř novou akci</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container mb-5">
                    <div className="row">
                        <div className="col d-flex flex-column pt-5">
                            <h4 className="mb-4"><strong>Doporučené</strong> akce</h4>
                            <RecommendedEvents />
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-8">
                            <div className="row">
                                <h4 className="my-4"><strong>Dnes</strong> na programu</h4>
                                <TodayEvents />
                            </div>
                            <div className="row">
                                <h4 className="my-4"><strong>Zítřejší</strong> akce</h4>
                                <TodayEvents />
                            </div>
                        </div>
                        <div className="col-4">
                            <h6 className="mt-4">Vyhledat</h6>
                            <div className="Input">
                                <input type="text" className="Input-input" title="Vyhledat" placeholder="Najít restauraci nebo akci" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { userData } = state;

    return {
        user: userData.user,
    };
};

export const Home = connect(mapStateToProps)(HomeRaw);
