import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import RecommendedEvents from '../components/RecommendedEvents';

export class HomeRaw extends Component {
    render() {
        /* const { user } = this.props; */

        return (
            <div>
                {/* <h1>Home</h1> */}
                {/* {user.email && */}
                {/* <div>Přihlášen: {user.firstName} {user.lastName}</div> */}
                {/* } */}
                {/* <Link to="/">Login</Link> */}

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
                                    nebo <Link to="/" className="Link">vytvoř novou akci</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <div className="row">
                        <div className="col d-flex">
                            <div className="RecommendedEvents pt-5">
                                <h4 className="mb-4"><strong>Doporučené</strong> akce</h4>
                                <RecommendedEvents />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">

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
