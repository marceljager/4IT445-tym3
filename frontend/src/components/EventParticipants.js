import React from 'react';
import { connect } from 'react-redux';

import InviteModal from './InviteModal';
import Avatar from './Avatar';

const EventParticipantsRaw = (props) => {
    let participants = [];

    if (props.guests.length > 0) {
        participants = props.guests.map(guest => {
            if (props.user.id !== guest.id) {
                return <Avatar user={guest} key={guest.id} />
            }

            return null;
        });
    }

    return (
        <div className="EventDetail-avatarsContainer">
            {props.signedIn && <Avatar animated={true} user={props.signedIn} />}
            {participants}
            {participants.length > 5 &&
                <div className="Avatar">
                    +{participants.length - 5}
                </div>
            }
            <div className={(participants.length > 0 || props.signedIn) ? 'ml-2' : ''}>
                {props.user.id && <InviteModal guests={props.guests} />}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const { userData } = state;

    return {
        user: userData.user,
    };
};

const EventParticipants = connect(mapStateToProps)(EventParticipantsRaw);
export default EventParticipants;