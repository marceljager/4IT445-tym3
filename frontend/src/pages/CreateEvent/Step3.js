import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { API_URL } from '../../constants';

import Input from '../../components/Input';

import { changeInputValue, clearEventValues } from '../../actions/event';

class Step3 extends Component {
    componentDidMount = () => {
        if (this.props.restaurant === '') {
            this.props.history.goBack();
            this.props.history.push('/nova-udalost/krok-1');
        } else if (this.props.name === '' || this.props.desc === '') {
            this.props.history.goBack();
            this.props.history.push('/nova-udalost/krok-2');
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();

        let dates = {
            actionStart: 0,
            actionEnd: 0
        };

        for (const key in dates) {
            const date = this.props[key];
            const day = date.substring(0, 2);
            const month = date.substring(3, 5);
            const year = date.substring(6, 10);
            const hours = date.substring(11, 13);
            const minutes = date.substring(14, 16);

            dates[key] = `${year}-${month}-${day}T${hours}:${minutes}:00.000Z`;
            // 2017-12-01T20:57:48.537Z
        }

        axios.post(`${API_URL}/events`, {
            name: this.props.name,
            private: this.props.private,
            dateFrom: dates.actionStart,
            dateTo: dates.actionEnd,
            dateText: this.props.desc,
            place: this.props.restaurant
        }).then((response) => {
            console.log(response);
            const eventId = response.data.id;
            axios.post(`${API_URL}/attendances`, {
                eventID: eventId,
                customerID: this.props.user.id
            }).then((response) => {
                console.log(response);
                this.props.clearEventValues();
                this.props.history.push(`/detail-akce/${eventId}`);
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
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
                            {this.props.restaurant}
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
                            {this.props.name}
                        </p>

                        <label className="NewEvent-label">
                            Popis
                        </label>

                        <p>
                            {this.props.desc}
                        </p>

                        <label className="NewEvent-label">
                            Začátek
                        </label>

                        <p>
                            {this.props.actionStart}
                        </p>

                        <label className="NewEvent-label">
                            Konec
                        </label>

                        <p>
                            {this.props.actionEnd}
                        </p>

                        <hr className="my-4" />

                        <div className="NewEvent-step">
                            <strong>Krok 3</strong> ze 3
                        </div>

                        <h5>Typ akce</h5>

                        <div className="d-flex my-3">
                            <div className="mr-2">
                                <Input
                                    id="public"
                                    inpValue="false"
                                    name="type"
                                    type="radio"
                                    label="Veřejná akce"
                                    checkedValue="public"
                                />
                            </div>

                            <div>
                                <Input
                                    id="private"
                                    inpValue="true"
                                    name="type"
                                    type="radio"
                                    label="Akce s přáteli"
                                />
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
    const { event } = state;
    const { userData } = state;

    return {
        restaurant: event.restaurant,
        name: event.name,
        desc: event.description,
        actionStart: event.actionStart,
        actionEnd: event.actionEnd,
        private: event.private,
        user: userData.user,
    };
};


const mapDispatchToProps = {
    changeInputValue,
    clearEventValues
};

export default connect(mapStateToProps, mapDispatchToProps)(Step3);
