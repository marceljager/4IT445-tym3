import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SearchBar from '../components/SearchBar';

const logo = '';

export const MenuRaw = (props) => {
    const { user } = props;

    return (
        <div className="Menu">
            <div className="container">
                <div className="row">
                    <div className="col-5 d-flex justify-content-between align-items-center">
                        <Link to="/timeline" className="Menu-logo">
                            <img src={logo} alt="EatWithMe" />
                        </Link>
                        <SearchBar />
                    </div>
                    <div className="col-7 d-flex align-items-center justify-content-end">
                        {user.email &&
                            <ul className="Menu-navigationItemsContainer d-flex">
                                <li className="Menu-navigationItem">
                                    <Link to="/" className="Menu-link isActive">Nová akce</Link>
                                </li>
                                <li className="Menu-navigationItem">
                                    <Link to="/" className="Menu-link">Akce v okolí</Link>
                                </li>
                                <li className="Menu-navigationItem">
                                    <Link to="/" className="Menu-link">Upozornění</Link>
                                </li>
                                <li className="Menu-navigationItem">
                                    <Link to="/" className="Menu-link">Přátelé</Link>
                                </li>
                            </ul>
                        }

                        {user.email
                            ? <div>{user.firstName} {user.lastName}</div>
                            : <Link to="/" className="Button Button--secondary">Přihlásit se</Link>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const { userData } = state;

    return {
        user: userData.user,
    };
};

export const Menu = connect(mapStateToProps)(MenuRaw);
