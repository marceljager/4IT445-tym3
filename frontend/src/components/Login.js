import React, { Component } from 'react';
import axios from 'axios';

import { API_URL } from '../constants';

class Login extends Component {
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
        axios.post(API_URL, {
            loginEmail: this.state.loginEmail,
            loginPassword: this.state.loginPassword
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });

        e.preventDefault();
    };

    render() {
        return (
            <div>
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

export default Login;
