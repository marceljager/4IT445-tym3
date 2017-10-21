import React from 'react';
import { connect } from 'react-redux';

import { addToFriends } from '../actions/user';

export const AddToFriendsButtonRaw = (props) => {
    const { addToFriends } = props;

    return (
        <button onClick={() => addToFriends(props.id)} className="Button">
            Add to friends
        </button>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    addToFriends,
};

export const AddToFriendsButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddToFriendsButtonRaw);
