import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class HomeRaw extends Component {
    render() {
        const { user } = this.props;

        return (
            <div>
                {/*<h1>Home</h1>*/}
                {/*{user.email &&*/}
                {/*<div>Přihlášen: {user.firstName} {user.lastName}</div>*/}
                {/*}*/}
                {/*<Link to="/">Login</Link>*/}

                <header className="Header">
                    <div className="Header-overlay"></div>
                    <div className="container">
                        <div className="Header-content">
                            <h1>Najez se v příjemné společnosti</h1>
                            <p>Pozvi přátele na oběd nebo se připoj k jedné z více než 120 akcí v okolí.</p>

                            <Link to="/" className="Button Button--big">
                                <span className="Button-text">
                                    objev akce v okolí
                                </span>
                            </Link>

                            <div>
                                <p>
                                    nebo <Link to="/" className="Header-link">vytvoř novou akci</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </header>

                <Link to="/" className="Button Button--transparent">
                    <span className="Button-text">
                        Přihlásit se
                    </span>
                </Link>
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
