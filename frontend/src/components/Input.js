import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';

import { changeInputValue } from '../actions/event';

class InputRaw extends Component {
    onInputChange = (event) => {
        const { id, changeInputValue } = this.props;
        changeInputValue(id, event.target.value);
    };

    render() {
        const { value, id, label, type, name, inpValue, checkedValue } = this.props;

        if (type === 'text') {
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

        if (type === 'textarea') {
            return (
                <textarea
                    value={value[id]}
                    id={id}
                    className="Input-input Input-input--textarea"
                    onChange={this.onInputChange}
                />
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
                        onChange={this.onInputChange}
                    />
                    <div className="Radio-content">
                        <div className="Radio-radioBox">
                            {label}
                        </div>
                    </div>
                </label>
            );
        }
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
    inpValue: propTypes.bool
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

