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
import UploadIcon from '../img/icons/upload.svg';
import Logo from '../img/logo.svg';
import noPhoto from '../img/icons/no-photo.svg';

export class LoginRaw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: this.props.match.path === '/registrace' ? 'register' : 'login',
            loginEmail: '',
            loginPassword: '',
            registerEmail: '',
            registerPassword: '',
            file: '',
            imagePreviewUrl: ''
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

    handleLogin = (e) => {
        axios.post(`${API_URL}/customers/login`, {
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

    handleRegister = (e) => {
        console.log('handle uploading-', this.state.file);

        axios.post(`${API_URL}/customers`, {
            email: this.state.registerEmail,
            password: this.state.registerPassword,
            username: this.state.registerName
        })
            .then((response) => {
                this.setState({
                    loginEmail: this.state.registerEmail,
                    loginPassword: this.state.registerPassword
                });
                this.switchCard('login');
                console.log(response);
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

    handleRegisterPasswordChange = (e) => {
        this.setState({
            registerPassword: e.target.value
        });
    };

    handleEmailChange = (e) => {
        this.setState({
            registerEmail: e.target.value
        });
    };

    handleNameChange = (e) => {
        this.setState({
            registerName: e.target.value
        });
    };

    handleImageChange = (e) => {
        e.preventDefault();

        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file);
    };

    handleFbSubmit = (response) => {
        const user = response;
        user.picture = user.userID;
        this.props.logIn(user);
        this.props.history.push('/timeline');
    };

    switchCard = (card) => {
        const { history } = window;
        this.setState({ page: card });
        const pageUrl = card === 'login' ? '/' : '/registrace';
        history.replaceState({ page: 'register' }, 'Přihlašte se', pageUrl);
    };

    removeAvatar = () => {
        this.setState({
            imagePreviewUrl: null
        });
    };

    render() {
        const { imagePreviewUrl } = this.state;
        console.log(imagePreviewUrl);

        return (
            <div className={`Login Login--${this.state.page}`}>
                <Link to="/landing" className="Login-logo">
                    <ReactSVG path={Logo} className="Login-logoImage" />
                </Link>
                <div className="Login-box">
                    <div className="Login-loginSide">
                        <div className="Tabs">
                            <button className={`Tabs-tab ${this.state.page === 'login' ? 'isActive' : ''}`} onClick={() => this.switchCard('login')}>
                                Přihlášení
                            </button>
                            <button className={`Tabs-tab ${this.state.page === 'register' ? 'isActive' : ''}`} onClick={() => this.switchCard('register')}>
                                Registrace
                            </button>
                        </div>
                        <form onSubmit={this.handleLogin}>
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
                    </div>
                    <div className="Login-registerSide">
                        <div className="Tabs">
                            <button className={`Tabs-tab ${this.state.page === 'login' ? 'isActive' : ''}`} onClick={() => this.switchCard('login')}>
                                Přihlášení
                            </button>
                            <button className={`Tabs-tab ${this.state.page === 'register' ? 'isActive' : ''}`} onClick={() => this.switchCard('register')}>
                                Registrace
                            </button>
                        </div>
                        <form onSubmit={this.handleRegister}>
                            <div className="Input mb-3">
                                <label htmlFor="registerName" className="Input-label">Vaše jméno</label>
                                <input type="text" id="registerName" value={this.state.registerName} onChange={this.handleNameChange} className="Input-input" />
                            </div>
                            <div className="Input mb-3">
                                <label htmlFor="registerEmail" className="Input-label">Váš email</label>
                                <input type="text" id="registerEmail" value={this.state.registerEmail} onChange={this.handleEmailChange} className="Input-input" />
                            </div>
                            <div className="Input mb-3">
                                <label htmlFor="registerPassword" className="Input-label">Vaše heslo</label>
                                <input type="password" id="registerPassword" value={this.state.registerPassword} onChange={this.handleRegisterPasswordChange} className="Input-input" />
                            </div>
                            {!imagePreviewUrl
                                ? <div className="DragDrop my-3">
                                    <ReactSVG path={UploadIcon} className="DragDrop-icon"/>
                                    <span className="DragDrop-text">Nahrajte profilový obrázek</span>
                                    <input className="DragDrop-input" type="file" onChange={this.handleImageChange}/>
                                </div>
                                : <div className="Login-userPhoto">
                                    <div className="Avatar Avatar--large mr-2">
                                        <div className="Avatar-imageContainer">
                                            <img src={imagePreviewUrl} alt="Nahraný obrázek" className="Avatar-photo"/>
                                        </div>
                                    </div>
                                    <button className="Button Button--red Button--small" onClick={this.removeAvatar}>
                                        Odebrat
                                    </button>
                                </div>
                            }

                            <div className="Login-buttonContainer">
                                <input type="submit" value="Registrovat se" className="Button Button--secondary mt-2" />
                            </div>
                        </form>
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
