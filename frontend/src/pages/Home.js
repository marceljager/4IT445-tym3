import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactSVG from 'react-svg';

import RecommendedEvents from '../components/RecommendedEvents';

import Logo from '../img/logo-full.svg';

export const HomeRaw = () => (
    <div className="Home">
        <header className="Header">
            <div className="Header-overlay" />
            <div className="container">
                <div className="Header-content">
                    <div>
                        <ReactSVG path={Logo} className="Header-logo" />
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
            </div>
        </header>
        <div className="container">
            <div className="row">
                <div className="col d-flex flex-column">
                    <RecommendedEvents />
                </div>
            </div>
        </div>
    </div>
);

const mapStateToProps = (state) => {
    const { userData } = state;

    return {
        user: userData.user,
    };
};

export const Home = connect(mapStateToProps)(HomeRaw);
