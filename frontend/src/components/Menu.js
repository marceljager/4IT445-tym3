import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SearchBar from '../components/SearchBar';

const logo = '';

export const MenuRaw = (props) => {
    const { user } = props;

    return (
        <div className="Menu">
            <Link to="/timeline" className="Menu-logo">
                <img src={logo} alt="EatWithMe" />
            </Link>
            <div className="Menu-search">
                <SearchBar />
            </div>
            <div className="Menu-right">
                {user.email
                    ? <div>{user.firstName} {user.lastName}</div>
                    : <Link to="/" className="Button">Přihlásit se</Link>
                }
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
