import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ReactSVG from 'react-svg';
import propTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import noPhoto from '../img/icons/no-photo.svg';

import { API_URL } from '../constants';

import Logo from '../img/logo.svg';

export class RegisterRaw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            registerEmail: '',
            registerPassword: '',
            file: '',
            imagePreviewUrl: ''
        };
    }

    handlePasswordChange = (e) => {
        this.setState({
            registerPassword: e.target.value
        });
    };

    handleEmailChange = (e) => {
        this.setState({
            registerEmail: e.target.value
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

    handleSubmit = (e) => {
        console.log('handle uploading-', this.state.file);

        axios.post(`${API_URL}/Users`, {
            email: this.state.registerEmail,
            password: this.state.registerPassword
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
        const { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (
                <div className="Login-avatarContainer">
                    <img className="Login-avatar" alt="avatar" src={imagePreviewUrl} />
                </div>
            );
        } else {
            $imagePreview = (
                <div className="Login-avatarContainer">
                    <img className="Login-avatar" alt="avatar" src={noPhoto} />
                </div>
            );
        }

        return (
            <div className="Login">
                <Link to="/landing" className="Login-logo">
                    <ReactSVG path={Logo} className="Login-logoImage" />
                </Link>
                <div className="Login-box">
                    <h3 className="Login-title">Registrace</h3>
                    <div className="mb-3">
                        {$imagePreview}
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="Input mb-3">
                            <label htmlFor="registerEmail" className="Input-label">Váš email</label>
                            <input type="text" id="registerEmail" value={this.state.registerEmail} onChange={this.handleEmailChange} className="Input-input" />
                        </div>
                        <div className="Input mb-3">
                            <label htmlFor="registerPassword" className="Input-label">Vaše heslo</label>
                            <input type="password" id="registerPassword" value={this.state.registerPassword} onChange={this.handlePasswordChange} className="Input-input" />
                        </div>
                        <div className="mb-3">
                            <input className="fileInput" type="file" onChange={this.handleImageChange} />
                        </div>
                        <div className="Login-buttonContainer">
                            <input type="submit" value="Registrovat se" className="Button Button--secondary mt-2" />
                        </div>
                    </form>
                    <div className="mt-3 text-center">
                        <Link to="/">Již mám účet</Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {

};

export const Register = connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(RegisterRaw));
