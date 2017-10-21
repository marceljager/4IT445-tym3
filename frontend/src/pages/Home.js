import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class HomeRaw extends Component {
    render() {
        const { user } = this.props;

        return (
            <div>
                <h1>Home</h1>
                {user.email &&
                <div>Přihlášen: {user.firstName} {user.lastName}</div>
                }
                <Link to="/">Login</Link>
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