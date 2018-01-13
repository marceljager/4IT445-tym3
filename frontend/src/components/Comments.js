import React, { PureComponent } from 'react';
import { FormattedRelative } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import axios from 'axios';
import ReactSVG from 'react-svg';

import { API_URL, FRONTEND_URL as URL } from '../constants';

import Avatar from './Avatar';
import Emoji from './Emoji';

import CameraIcon from '../img/icons/camera.svg';
import SendIcon from '../img/icons/send.svg';

class CommentsRaw extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
            imagePreviewUrl: null,
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
        axios.get(`${API_URL}/eventComments?filter[where][eventID]=${eventId}&filter[order]=date%20DESC`)
            .then((response) => {
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

    uploadComment = (newComment) => {
        const { accessToken } = this.props.user;

        const localComment = {
            ...newComment,
            photo: this.state.imagePreviewUrl
        };

        this.setState(prevState => ({
            newComments: [localComment, ...prevState.newComments],
            commentText: '',
            file: null,
            imagePreviewUrl: null
        }));

        axios.put(`${API_URL}/eventComments?access_token=${accessToken}`, newComment)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    };

    uploadCommentWithImage = (newComment) => {
        const { accessToken } = this.props.user;

        const data = new FormData();
        const { file } = this.state;
        data.append('file', file);

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        };

        axios.post(`${API_URL}/assets/upload`, data, config)
            .then((response) => {
                const commentWithImage = {
                    ...newComment,
                    photo: response.data.filename
                };

                this.uploadComment(commentWithImage);
            })
            .catch((error) => {
                console.error('upload', error);
            });

        axios.put(`${API_URL}/eventComments?access_token=${accessToken}`, newComment)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('zapni si internet', error);
            });
    };

    handleSendComment = (e) => {
        if (this.state.commentText.trim().length > 2 && (e.key === 'Enter' || e.type === 'click')) {
            e.target.value = '';

            const { id } = this.props.user;
            const { eventId } = this.props.match.params;

            const newComment = {
                text: this.state.commentText,
                eventID: eventId,
                customerID: parseInt(id, 10),
                date: Date.now()
            };

            if (this.state.file) {
                this.uploadCommentWithImage(newComment);
            } else {
                this.uploadComment(newComment);
            }
        }
    };

    handleImageChange = (e) => {
        e.preventDefault();

        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file);
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
                        {comment.photo &&
                        <div className="Comments-photoContainer" style={{ backgroundImage: `url(${comment.photo})` }} />
                        }
                        <span><Emoji comment={comment} /></span>
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
                            {comment.photo &&
                                <div className="Comments-photoContainer" style={{backgroundImage: `url(${`${URL}/upload/avatars/${comment.photo}`})`}} />
                            }
                            <span><Emoji comment={comment} /></span>
                        </div>
                    </div>
                </div>
            );
        });

        const { imagePreviewUrl } = this.state;

        return (
            <div className="Comments">
                {this.props.user.email &&
                    <form onSubmit={e => e.preventDefault()} className="Comments-addContainer mb-3">
                        <div className="Comments-avatarContainer">
                            <Avatar user={user} />
                        </div>
                        <div className="Comments-inputContainer">
                            <div className="Input">
                                <div className="Comments-inputControls">
                                    <div className="Comments-uploadPhotoContainer">
                                        <ReactSVG path={CameraIcon} className="Comments-uploadIcon" />
                                        <input type="file" onChange={this.handleImageChange} className="Comments-uploadInput" />
                                    </div>
                                    <button className="Comments-send" onClick={this.handleSendComment}>
                                        <ReactSVG path={SendIcon} className="Comments-sendIcon" />
                                    </button>
                                </div>
                                <div className="Comments-input">
                                    {imagePreviewUrl &&
                                        <img src={imagePreviewUrl} alt="Nahraný obrázek" className="Comments-photoPreview" />
                                    }
                                    <input type="text" className="Input-input" onChange={this.handleTextChange} onKeyPress={this.handleSendComment} placeholder="Přidat komentář..." />
                                </div>
                            </div>
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
