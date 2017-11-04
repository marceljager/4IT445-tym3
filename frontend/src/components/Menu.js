import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactSVG from 'react-svg';

import SearchBar from '../components/SearchBar';

import LogoImg from '../img/logo.svg';

export const MenuRaw = (props) => {
    const { user, location } = props;
    const MenuClass = `Menu ${location.pathname && location.pathname === '/' ? 'isHidden' : ''}`;

    return (
        <div className={MenuClass}>
            <div className="Menu-fixed">
                <div className="container">
                    <div className="row">
                        <div className="col-5 d-flex align-items-center">
                            <Link to="/landing" className="Menu-logo">
                                <ReactSVG path={LogoImg} className="Menu-logoIcon" />
                            </Link>
                            <SearchBar />
                        </div>
                        <div className="col-7 d-flex align-items-center justify-content-end">
                            {user.email &&
                                <div className="Menu-user">{user.firstName}</div>
                            }

                            {user.email &&
                                <ul className="Menu-navigationItemsContainer d-flex">
                                    <li className="Menu-navigationItem">
                                        <Link to="/" className="Menu-link isActive">Nová akce</Link>
                                    </li>
                                    <li className="Menu-navigationItem">
                                        <Link to="/timeline" className="Menu-link">Akce v okolí</Link>
                                    </li>
                                    <li className="Menu-navigationItem">
                                        <Link to="/" className="Menu-link">Upozornění</Link>
                                    </li>
                                    <li className="Menu-navigationItem">
                                        <Link to="/" className="Menu-link">Přátelé</Link>
                                    </li>
                                </ul>
                            }

                            {!user.email &&
                                <Link to="/" className="Button Button--secondary">Přihlásit se</Link>
                            }
                        </div>
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
