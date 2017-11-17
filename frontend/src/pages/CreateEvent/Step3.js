import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    storeNewEventType,
    clearNewEvent
} from '../../actions/event';

export class Step3Raw extends Component {
    componentDidMount = () => {
        if (this.props.eventRestaurant === '') {
            this.props.history.goBack();
            this.props.history.push('/nova-udalost/krok-1');
        }

        if (this.props.eventName === '' || this.props.eventDescription === '') {
            this.props.history.goBack();
            this.props.history.push('/nova-udalost/krok-2');
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props);
        this.props.onSubmitClear();
        this.props.history.push('/nova-udalost/krok-1');
    };

    handleTypeChange = (e) => {
        this.props.onHandleTypeChange(e.target.value);
    };

    render() {
        return (
            <section>
                <div className="SubHead">
                    <div className="SubHead-head">
                        <div className="SubHead-overlay"></div>
                        <div className="SubHead-content">
                            <div className="container">
                                <div className="text-center">
                                    <h1 className="SubHead-title">Vytvoř novou akci</h1>
                                    <p className="SubHead-text">a my ti ji pomůžeme zrealizovat</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <form onSubmit={this.handleSubmit} className="NewEvent">
                    <div className="NewEvent-box">
                        <div className="NewEvent-step">
                            <strong>Krok 1</strong> ze 3{' '}
                            <Link to="/nova-udalost/krok-1">Upravit</Link>
                        </div>
                        <label className="NewEvent-label">
                            Restaurace:
                        </label>

                        <p>
                            {this.props.eventRestaurant}
                        </p>

                        <hr className="my-4" />

                        <div className="NewEvent-step">
                            <strong>Krok 2</strong> ze 3{' '}
                            <Link to="/nova-udalost/krok-2">Upravit</Link>
                        </div>
                        <label className="NewEvent-label">
                            Název
                        </label>

                        <p>
                            {this.props.eventName}
                        </p>

                        <label className="NewEvent-label">
                            Popis
                        </label>

                        <p>
                            {this.props.eventDescription}
                        </p>

                        <hr className="my-4" />

                        <div className="NewEvent-step">
                            <strong>Krok 3</strong> ze 3
                        </div>

                        <h5>Pozvěte přátele</h5>

                        <div className="d-flex my-3">
                            <div className="mr-2">
                                <label className="Radio" htmlFor="public">
                                    <input
                                        className="Radio-input"
                                        id="public"
                                        name="actionType"
                                        type="radio"
                                        value="public"
                                        checked={this.props.eventType === 'public'}
                                        onChange={this.handleTypeChange}
                                    />
                                        <div className="Radio-content">
                                            <div className="Radio-radioBox">
                                                Veřejná akce
                                            </div>
                                        </div>
                                </label>
                            </div>

                            <div>
                                <label className="Radio" htmlFor="private">
                                    <input
                                        className="Radio-input"
                                        id="private"
                                        name="actionType"
                                        value="private"
                                        type="radio"
                                        checked={this.props.eventType === 'private'}
                                        onChange={this.handleTypeChange}
                                    />
                                    <div className="Radio-content">
                                        <div className="Radio-radioBox">
                                            Akce s přáteli
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                         <div className="d-flex justify-content-between mb-3">
                             <div>
                                 <div className="Avatar mr-3">
                                     <img src="https://graph.facebook.com/1702981537/picture" alt="Roman Fausek" />
                                 </div>
                                 <span>Roman Fausek</span>
                             </div>
                             <div>
                                 <Link to="/" className="Button">
                                     <span className="Button-text">Pozvat</span>
                                 </Link>
                             </div>
                         </div>
                         <div className="d-flex justify-content-between mb-3">
                             <div>
                                 <div className="Avatar mr-3">
                                     <img src="https://graph.facebook.com/1702981537/picture" alt="Roman Fausek" />
                                 </div>
                                 <span>Roman Fausek</span>
                             </div>
                             <div>
                                 <Link to="/" className="Button">
                                     <span className="Button-text">Pozvat</span>
                                 </Link>
                             </div>
                         </div>
                         <div className="d-flex justify-content-between mb-3">
                             <div>
                                 <div className="Avatar mr-3">
                                     <img src="https://graph.facebook.com/1702981537/picture" alt="Roman Fausek" />
                                 </div>
                                 <span>Roman Fausek</span>
                             </div>
                             <div>
                                 <Link to="/" className="Button">
                                     <span className="Button-text">Pozvat</span>
                                 </Link>
                             </div>
                         </div>
                    </div>

                    <div className="my-4 text-center">
                        <button type="submit" className="Button">
                            <span className="Button-text">Vytvořit</span>
                        </button>
                    </div>
                </form>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        eventRestaurant: state.event.restaurant,
        eventName: state.event.name,
        eventDescription: state.event.description,
        eventType: state.event.type,
    };
};

const mapDispatchToProps = (dispatch) => ({
    onHandleTypeChange: (event) => dispatch(storeNewEventType(event)),
    onSubmitClear: () => dispatch(clearNewEvent())
});

export const Step3 = connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Step3Raw));
