import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ReactSVG from 'react-svg';

import { API_URL } from '../constants';
import { logIn } from '../actions/user';

import FacebookIcon from '../img/icons/facebook.svg';

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
                console.log(response);
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
            <div className="Login">
                <div className="Login-logo">
                    Logo
                </div>
                <div className="Login-box">
                    <h3 className="Login-title">Přihlášení</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="Input mb-3">
                            <label htmlFor="login" className="Input-label">Váš email</label>
                            <input type="text" id="login" value={this.state.loginEmail} onChange={this.handleLoginChange} className="Input-input" />
                        </div>
                        <div className="Input mb-3">
                            <label htmlFor="password" className="Input-label">Vaše heslo</label>
                            <input type="password" id="password" value={this.state.loginPassword} onChange={this.handlePasswordChange} className="Input-input" />
                        </div>
                        <div className="Login-buttonContainer">
                            <input type="submit" value="Přihlásit se" className="Button Button--secondary mt-2" />
                        </div>
                    </form>
                    <div className="Separator">
                        <span className="Separator-text">Nebo se</span>
                    </div>
                    <div className="Login-facebookContainer">
                        <button className="Button Button--facebook">
                            <div className="Button-iconContainer">
                                <ReactSVG path={FacebookIcon} callback={svg => console.log(svg)} className="Button-icon" />
                            </div>
                            <span className="Button-text">Přihlašte přes Facebook</span>
                        </button>
                    </div>
                </div>
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
