import React, { Component } from 'react';
import { FormattedRelative } from 'react-intl';
import { connect } from 'react-redux';

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
                <div className="Avatar">
                    <img src={`https://graph.facebook.com/${user.picture}/picture`} alt={user.name} />
                </div>
                <div className="Comments-text">
                    <div className="Comments-top">
                        <span className="Comments-name">{user.name}</span>
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
                <div className="Avatar">
                    <img src={`https://graph.facebook.com/${comment.avatar}/picture`} alt={comment.author} />
                </div>
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
                    <form onSubmit={e => e.preventDefault()} className="Comments-addContainer">
                        <div className="Comments-avatarContainer">
                            <div className="Avatar">
                                <img src={`https://graph.facebook.com/${user.picture}/picture`} alt={user.name} />
                            </div>
                        </div>
                        <div className="Input mb-2">
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
