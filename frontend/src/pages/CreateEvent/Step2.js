import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../../components/Input';

import { changeInputValue } from '../../actions/event';

class Step2 extends Component {
    componentDidMount = () => {
        if (this.props.restaurant === '') {
            this.props.history.goBack();
            this.props.history.push('/nova-udalost/krok-1');
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.history.push('/nova-udalost/krok-3');
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
                            <strong>Krok 2</strong> ze 3
                        </div>

                        <Input
                            id="name"
                            label="Název akce"
                            type="text"
                        />

                        <Input
                            id="description"
                            label="Popis akce"
                            type="textarea"
                        />

                        <Input
                            type="mask"
                            mask="99-99-9999 99:99"
                            label="Začátek akce"
                            id="actionStart"
                        />

                        <Input
                            type="mask"
                            mask="99-99-9999 99:99"
                            label="Konec akce"
                            id="actionEnd"
                        />
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
    const { event } = state;

    return {
        restaurant: event.restaurant,
    };
};


const mapDispatchToProps = {
    changeInputValue
};

export default connect(mapStateToProps, mapDispatchToProps)(Step2);
