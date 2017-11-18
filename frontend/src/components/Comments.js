import React, { Component } from 'react';
import { FormattedRelative } from 'react-intl';
import { connect } from 'react-redux';
import Avatar from './Avatar';

class CommentsRaw extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            commentText: ''
        };
    }

    handleTextChange = (e) => {
        this.setState({
            commentText: e.target.value
        });
    };

    handleSendComment = (e) => {
        if (e.key === 'Enter') {
            e.target.value = '';

            const newComment = {
                date: Date.now(),
                text: this.state.commentText
            };

            this.setState(prevState => ({
                comments: [newComment, ...prevState.comments],
                commentText: ''
            }));
        }
    };

    render() {
        const { user } = this.props;

        const yourComments = this.state.comments.map((comment, index) => (
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

        const comments = this.props.data.map((comment, index) => (
            <div key={index.toString()} className="Comments-item">
                <Avatar user={user} />
                <div className="Comments-text">
                    <div className="Comments-top">
                        <span className="Comments-name">{comment.author}</span>
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

        return (
            <div className="Comments">
                {this.props.user.email &&
                    <form onSubmit={e => e.preventDefault()} className="Comments-addContainer mb-3">
                        <div className="Comments-avatarContainer">
                            <Avatar user={user} />
                        </div>
                        <div className="Input">
                            <input type="text" className="Input-input" onChange={this.handleTextChange} onKeyPress={this.handleSendComment} placeholder="Přidat komentář..."/>
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

const mapStateToProps = (state) => {
    const { userData } = state;

    return {
        user: userData.user,
    };
};

const Comments = connect(mapStateToProps)(CommentsRaw);
export default Comments;
