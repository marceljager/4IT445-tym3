import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactSVG from 'react-svg';

import SearchBar from '../components/SearchBar';

import LogoImg from '../img/logo.svg';

const MenuRaw = (props) => {
    const { user, location } = props;
    const MenuClass = `Menu ${location.pathname === '/' ? 'isHidden' : ''} ${location.pathname === '/landing' ? 'Menu--transparent' : ''}`;

    return (
        <div className={MenuClass}>
            <div className="Menu-fixed">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="row">
                                <div className={`col-5 align-items-center${location.pathname === '/landing' ? ' d-none' : ' d-flex'}`}>
                                    <Link to={user.email ? '/timeline' : '/landing'} className="Menu-logo">
                                        <ReactSVG path={LogoImg} className="Menu-logoIcon" />
                                    </Link>
                                    <SearchBar />
                                </div>
                                <div className={`d-flex align-items-center justify-content-end${location.pathname === '/landing' ? ' col-12' : ' col-7'}`}>
                                    {user.email &&
                                        <div className="d-flex align-items-center">
                                            {user.picture &&
                                                <div className="Avatar">
                                                    <img src={`https://graph.facebook.com/${user.picture}/picture`} alt={user.name}/>
                                                </div>
                                            }
                                            <div className="Menu-user">{user.name}</div>
                                        </div>
                                    }

                                    {user.email &&
                                        <ul className="Menu-navigationItemsContainer d-flex">
                                            <li className="Menu-navigationItem">
                                                <Link to="/nova-udalost/krok-1" className={`Menu-link ${location.pathname.indexOf('nova-udalost') > 0 ? 'isActive' : ''}`}>Nová akce</Link>
                                            </li>
                                            <li className="Menu-navigationItem">
                                                <Link to="/timeline" className={`Menu-link ${location.pathname === '/timeline' ? 'isActive' : ''}`}>Akce v okolí</Link>
                                            </li>
                                            {/*
                                            <li className="Menu-navigationItem">
                                                <Link to="/friends" className={`Menu-link ${location.pathname === '/friends' ? 'isActive' : ''}`}>Přátelé</Link>
                                            </li>
                                            */}
                                        </ul>
                                    }

                                    {!user.email &&
                                        <Link to="/" className="Button Button--secondary Button--small">Přihlásit se</Link>
                                    }
                                </div>
                            </div>
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

const Menu = connect(mapStateToProps)(MenuRaw);
export default Menu;
