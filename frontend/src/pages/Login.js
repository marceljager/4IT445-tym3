import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ReactSVG from 'react-svg';
import propTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

import { API_URL } from '../constants';
import { logIn } from '../actions/user';

import FacebookIcon from '../img/icons/facebook.svg';
import Logo from '../img/logo.svg';

export class LoginRaw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginEmail: '',
            loginPassword: ''
        };
    }

    getUser = (id, token) => {
        axios.get(`${API_URL}/customers/${id}?access_token=${token}`)
            .then((response) => {
                const userData = response.data;
                userData.accessToken = token;
                localStorage.setItem('user', JSON.stringify(userData));
                this.props.logIn(userData);
                this.props.history.push('/timeline');
                return response.data;
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    };

    handleSubmit = (e) => {
        axios.post(`${API_URL}/customers/login`, {
            username: this.state.loginEmail,
            email: this.state.loginEmail,
            password: this.state.loginPassword
        })
            .then((response) => {
                const { userId, id } = response.data;
                this.getUser(userId, id);
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });

        e.preventDefault();
    };

    handlePasswordChange = (e) => {
        this.setState({
            loginPassword: e.target.value
        });
    };

    handleLoginChange = (e) => {
        this.setState({
            loginEmail: e.target.value
        });
    };

    handleFbSubmit = (response) => {
        const user = response;
        user.picture = user.userID;
        this.props.logIn(user);
        this.props.history.push('/timeline');
    };

    render() {
        return (
            <div className="Login">
                <Link to="/landing" className="Login-logo">
                    <ReactSVG path={Logo} className="Login-logoImage" />
                </Link>
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
                        <FacebookLogin
                            appId="816743241749139"
                            autoLoad={false}
                            fields="name, email, picture"
                            callback={this.handleFbSubmit}
                            cssClass="Button Button--facebook"
                            textButton="Přihlašte přes facebook"
                            icon={<div className="Button-iconContainer"><ReactSVG path={FacebookIcon} className="Button-icon" /></div>}
                        />
                    </div>
                    <div className="mt-3 text-center">
                        <Link to="/registrace">Založit účet</Link>
                    </div>
                </div>
            </div>
        );
    }
}

LoginRaw.propTypes = {
    logIn: propTypes.func.isRequired,
    history: propTypes.shape({
        push: propTypes.func
    })
};

LoginRaw.defaultProps = {
    history: {}
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    logIn,
};

export const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(LoginRaw));
