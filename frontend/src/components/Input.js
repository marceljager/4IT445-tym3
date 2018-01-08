import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import Datetime from 'react-datetime';
import moment from 'moment';

import { changeInputValue } from '../actions/event';

class InputRaw extends Component {
    onInputChange = (event) => {
        const { id, changeInputValue } = this.props;
        // console.log('event:', event);

        let datetime = moment(event).toDate();
        datetime = moment(datetime).format();

        if (event.target) {
            changeInputValue(id, event.target.value);
        } else {
            changeInputValue(id, datetime);
        }
    };

    onRadioChange = (event) => {
        const { name, changeInputValue } = this.props;
        changeInputValue(name, event.target.value);
    };

    render() {
        const { value, id, label, type, name, inpValue, checkedValue } = this.props;

        if (type === 'textarea') {
            return (
                <div className="Input mb-3">
                    {label &&
                        <label htmlFor={id}>{label}</label>
                    }
                    <textarea
                        value={value[id]}
                        id={id}
                        className="Input-input Input-input--textarea"
                        onChange={this.onInputChange}
                    />
                </div>
            );
        }

        if (type === 'radio') {
            return (
                <label className="Radio" htmlFor={id}>
                    <input
                        className="Radio-input"
                        id={id}
                        name={name}
                        type="radio"
                        value={inpValue}
                        defaultChecked={id === checkedValue}
                        onChange={this.onRadioChange}
                    />
                    <div className="Radio-content">
                        <div className="Radio-radioBox">
                            {label}
                        </div>
                    </div>
                </label>
            );
        }

        if (type === 'datetime') {
            return (
                <div className="Input mb-3">
                    {label &&
                        <label htmlFor={id}>{label}</label>
                    }
                    <Datetime
                        dateFormat="DD.MM.YYYY"
                        timeFormat="HH:mm"
                        inputProps={{ className: 'Input-input' }}
                        id={id}
                        onChange={this.onInputChange}
                    />
                </div>
            );
        }

        return (
            <div className="Input mb-3">
                {label &&
                    <label htmlFor={id}>{label}</label>
                }
                <input
                    type="text"
                    id={id}
                    className="Input-input"
                    value={value[id]}
                    onChange={this.onInputChange}
                />
            </div>
        );
    }
}

InputRaw.propTypes = {
    value: propTypes.shape({}).isRequired,
    id: propTypes.string.isRequired,
    label: propTypes.string,
    changeInputValue: propTypes.func.isRequired,
    type: propTypes.string.isRequired,
    name: propTypes.string,
    checkedValue: propTypes.string,
    inpValue: propTypes.string
};

InputRaw.defaultProps = {
    label: '',
    name: '',
    checkedValue: '',
    inpValue: false
};

const mapStateToProps = state => ({
    value: state.event
});

const mapDispatchToProps = {
    changeInputValue
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(InputRaw));

