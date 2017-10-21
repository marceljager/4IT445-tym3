import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { API_URL } from '../constants';
import { logIn } from '../actions/user';

export class LoginRaw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginEmail: '',
            loginPassword: ''
        };
    }

    handleLoginChange = (e) => {
        this.setState({
            loginEmail: e.target.value
        });
    };

    handlePasswordChange = (e) => {
        this.setState({
            loginPassword: e.target.value
        });
    };

    handleSubmit = (e) => {
        axios.post(`${API_URL}/login.php`, {
            loginEmail: this.state.loginEmail,
            loginPassword: this.state.loginPassword
        })
            .then((response) => {
                const { user } = response.data;
                this.props.logIn(user);
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });

        e.preventDefault();
    };

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="login">
                        Email:
                    </label>
                    <input type="text" id="login" value={this.state.loginEmail} onChange={this.handleLoginChange} />

                    <label htmlFor="password">
                        Password:
                    </label>
                    <input type="password" id="password" value={this.state.loginPassword} onChange={this.handlePasswordChange} />

                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
    logIn,
};

export const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginRaw);
