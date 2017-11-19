import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import ReactSVG from 'react-svg';

import SearchBar from '../components/SearchBar';

import LogoImg from '../img/logo.svg';
import Avatar from './Avatar';

import { logIn, logOut } from '../actions/user';

class MenuRaw extends Component {
    componentDidMount() {
        this.autoLogin();
    }

    autoLogin = () => {
        const user = localStorage.getItem('user');
        if (user) {
            const userData = JSON.parse(user);
            this.props.logIn(userData);
        }
    };

    logout = () => {
        localStorage.removeItem('user');
        this.props.logOut();
        this.props.history.push('/landing');
    };

    render() {
        const { user, location } = this.props;
        const MenuClass = `Menu ${location.pathname === '/' ? 'isHidden' : ''} ${location.pathname === '/landing' ? 'Menu--transparent' : ''}`;

        return (
            <div className={MenuClass}>
                <div className="Menu-fixed">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <div className="row">
                                    <div
                                        className={`col-5 align-items-center${location.pathname === '/landing' ? ' d-none' : ' d-flex'}`}
                                    >
                                        <Link to={user.email ? '/timeline' : '/landing'} className="Menu-logo">
                                            <ReactSVG path={LogoImg} className="Menu-logoIcon" />
                                        </Link>
                                        <SearchBar />
                                    </div>
                                    <div
                                        className={`d-flex align-items-center justify-content-end${location.pathname === '/landing' ? ' col-12' : ' col-7'}`}
                                    >
                                        {user.email &&
                                        <div className="d-flex align-items-center">
                                            <Avatar user={user} />
                                            <div className="Menu-user">{user.username}</div>
                                        </div>
                                        }

                                        {user.email &&
                                        <ul className="Menu-navigationItemsContainer d-flex">
                                            <li className="Menu-navigationItem">
                                                <Link
                                                    to="/nova-udalost/krok-1"
                                                    className={`Menu-link ${location.pathname.indexOf('nova-udalost') > 0 ? 'isActive' : ''}`}
                                                >
                                                    Nová akce
                                                </Link>
                                            </li>
                                            <li className="Menu-navigationItem">
                                                <Link
                                                    to="/timeline"
                                                    className={`Menu-link ${location.pathname === '/timeline' ? 'isActive' : ''}`}
                                                >
                                                    Akce v okolí
                                                </Link>
                                            </li>
                                            <li className="Menu-navigationItem">
                                                <button className="Button Button--logout Button--small Button--red" onClick={this.logout}>Odhlásit se</button>
                                            </li>
                                        </ul>
                                        }

                                        {!user.email &&
                                        <Link to="/" className="Button Button--secondary Button--small">
                                            Přihlásit se
                                        </Link>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

MenuRaw.propTypes = {
    logIn: propTypes.func.isRequired,
    logOut: propTypes.func.isRequired,
    user: propTypes.shape({
        email: propTypes.string
    }),
    location: propTypes.shape({
        pathname: propTypes.string
    }),
    history: propTypes.shape({
        push: propTypes.func
    })
};

MenuRaw.defaultProps = {
    user: {
        email: ''
    },
    location: {
        pathname: ''
    },
    history: {}
};

const mapStateToProps = (state) => {
    const { userData } = state;

    return {
        user: userData.user,
    };
};


const mapDispatchToProps = {
    logIn,
    logOut
};

const Menu = connect(mapStateToProps, mapDispatchToProps)(MenuRaw);
export default Menu;
