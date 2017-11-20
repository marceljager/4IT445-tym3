import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
    storeNewEventName,
    storeNewEventDescription
} from '../../actions/event';

export class Step2Raw extends Component {
    componentDidMount = () => {
        if (this.props.eventRestaurant === '') {
            this.props.history.goBack();
            this.props.history.push('/nova-udalost/krok-1');
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.history.push('/nova-udalost/krok-3');
    };

    handleNameChange = (e) => {
        this.props.onHandleNameChange(e.target.value);
    };

    handleDescChange = (e) => {
        this.props.onHandleDescriptionChange(e.target.value);
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
                            <strong>Krok 2</strong> ze 3
                        </div>

                        <div className="Input mb-3">
                            <label htmlFor="title" className="Input-label--big">Název akce</label>
                            <input type="text" value={this.props.eventName} onChange={this.handleNameChange} id="title" className="Input-input"/>
                        </div>

                        <div className="Input">
                            <label htmlFor="description" className="Input-label--big">Popis akce</label>
                            <textarea type="text" value={this.props.eventDescription} onChange={this.handleDescChange} id="description" className="Input-input Input-input--textarea" />
                        </div>
                    </div>

                    <div className="my-4 text-center">
                        <button type="submit" className="Button">
                            <span className="Button-text">Pokračovat</span>
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
        eventDescription: state.event.description
    };
};

const mapDispatchToProps = (dispatch) => ({
    onHandleNameChange: (event) => dispatch(storeNewEventName(event)),
    onHandleDescriptionChange: (event) => dispatch(storeNewEventDescription(event)),
});

export const Step2 = connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Step2Raw));
