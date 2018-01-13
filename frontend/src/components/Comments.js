import React, { Component } from 'react';
import { FormattedRelative } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import axios from 'axios';

import { API_URL } from '../constants';

import Avatar from './Avatar';

class CommentsRaw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            newComments: [],
            commentText: ''
        };
    }

    componentDidMount() {
        this.getCommentsData();
    }

    getCommentsData = () => {
        const { eventId } = this.props.match.params;
        axios.get(`${API_URL}/eventComments?filter[where][eventID]=${eventId}`)
            .then((response) => {
                console.log('comments', response);
                this.setState({
                    comments: response.data
                });
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    };

    handleTextChange = (e) => {
        this.setState({
            commentText: e.target.value
        });
    };

    uploadComment = () => {
        const { id, accessToken } = this.props.user;

        const { eventId } = this.props.match.params;
        const newComment = {
            text: this.state.commentText,
            eventID: eventId,
            customerID: parseInt(id, 10),
            date: Date.now()
        };
        console.log(newComment);

        axios.put(`${API_URL}/eventComments?access_token=${accessToken}`, newComment)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    };

    handleSendComment = (e) => {
        if (e.key === 'Enter') {
            e.target.value = '';

            const newComment = {
                date: Date.now(),
                text: this.state.commentText
            };

            this.uploadComment();
            this.setState(prevState => ({
                newComments: [newComment, ...prevState.newComments],
                commentText: ''
            }));
        }
    };

    render() {
        const { user } = this.props;

        const yourComments = this.state.newComments.map((comment, index) => (
            <div key={index.toString()} className="Comments-item">
                <Avatar user={user} />
                <div className="Comments-text">
                    <div className="Comments-top">
                        <span className="Comments-name">{user.username}</span>
                        <span className="Comments-time">
                            <FormattedRelative value={comment.date} />
                        </span>
                    </div>
                    <div className="Comments-comment">
                        {comment.text}
                    </div>
                </div>
            </div>
        ));

        const comments = this.state.comments.map((comment, index) => {
            const author = {
                id: comment.customerID,
                username: comment.customerName,
                picture: comment.photo
            };

            return (
                <div key={index.toString()} className="Comments-item">
                    <Avatar user={author} />
                    <div className="Comments-text">
                        <div className="Comments-top">
                            <span className="Comments-name">{comment.customerName}</span>
                            <span className="Comments-time">
                                <FormattedRelative value={comment.date} />
                            </span>
                        </div>
                        <div className="Comments-comment">
                            {comment.text}
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="Comments">
                {this.props.user.email &&
                    <form onSubmit={e => e.preventDefault()} className="Comments-addContainer mb-3">
                        <div className="Comments-avatarContainer">
                            <Avatar user={user} />
                        </div>
                        <div className="Input">
                            <input type="text" className="Input-input" onChange={this.handleTextChange} onKeyPress={this.handleSendComment} placeholder="Přidat komentář..." />
                        </div>
                    </form>
                }
                <div className="Comments-container">
                    {yourComments}
                    {comments}
                </div>
            </div>
        );
    }
}

CommentsRaw.propTypes = {
    user: propTypes.shape({
        email: propTypes.string
    }),
    match: propTypes.shape({
        params: propTypes.shape({
            eventId: propTypes.string
        })
    }),
    data: propTypes.arrayOf(
        propTypes.shape({
            photo: propTypes.string,
            author: propTypes.string,
            date: propTypes.instanceOf(Date),
            text: propTypes.string
        })
    )
};

CommentsRaw.defaultProps = {
    user: {
        email: ''
    },
    match: {
        params: {
            eventId: 0
        }
    },
    data: []
};

const mapStateToProps = (state) => {
    const { userData } = state;

    return {
        user: userData.user,
    };
};

const Comments = connect(mapStateToProps)(withRouter(CommentsRaw));
export default Comments;
