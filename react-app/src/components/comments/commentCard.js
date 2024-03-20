import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import * as commentActions from '../../store/comment'
import DeleteCommentModal from "../deleteComment/deleteCommentModal"
import thumbup from '../videos/thumb_up.png'
import thumbdown from '../videos/thumb_down.png'
import morevert from './more_vert.png'
import editpic from './edit.png'
import './comment.css'
import {getBackgoundColor, getInitials} from '../videos/videoCard'

const CommentCard = ({ comment }) => {
    const user = useSelector(state => state.session.user)
    const allUserComments = useSelector(state => state.comment.userComments)
    let commentId = comment.id
    const [clickOptBtn, setClickOptBtn] = useState(false)
    const allVideoComments = useSelector(state => state.comment.videoComments)
    let isCurrenCmtOwner = false
    const userCmtLike = comment.likes.filter(like => like.userId == user.id)
    const userCmtDislike = comment.dislikes.filter(dislike => dislike.userId == user.id)
    let end = new Date();
    let start = new Date(new Date(comment.created_at).toLocaleString('en-US', { timeZone: "UTC" }));
    // let start = new Date(comment.created_at)

    const dropDownRef = useRef(null)


    let elapsed = ((end - start));

    if (elapsed < 60000) {
        elapsed = `few seconds ago`
    }
    if (elapsed >= 60000 && elapsed < 3600000) {
        elapsed = ((end - start)) / 1000 / 60
        elapsed = elapsed < 2 ? `1 minute ago` : `${elapsed.toFixed()} minutes ago`
    }
    if (3600000 <= elapsed && elapsed < 86400000) {
        elapsed = ((end - start)) / 1000 / 60 / 60
        elapsed = elapsed < 2 ? `1 hour ago` : `${elapsed.toFixed()} hours ago`
    }
    if (elapsed >= 86400000) {
        elapsed = ((end - start)) / 1000 / 60 / 60 / 24
        elapsed = elapsed < 2 ? `${elapsed.toFixed()} day ago` : `${elapsed.toFixed()} days ago`
    }

    if (user) {
        if (comment.user_id === user.id) isCurrenCmtOwner = true
    }
    const [isEditing, setIsEditing] = useState(false)
    const [editComment, setEditComment] = useState('')
    const dispatch = useDispatch()

    const handleClickOutside = (event) => {
        if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
            setClickOptBtn(false);
        }
    };

    useEffect(() => {
        // dispatch(commentActions.fetchAllComments(comment.video_id))
        setEditComment(comment.content)
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [dispatch, comment.content, comment.video_id])

    const handleEdit = async () => {
        setIsEditing(true)
        { console.log('gotheregotheregotheregotheregotheregotheregotheregothere', comment.content) }
        // dispatch(commentActions.fetchSingleComment())
        setEditComment(comment.content)
    }

    const handleSubmit = async () => {
        setIsEditing(false)
        const payload = {
            user_id: user.id,
            video_id: comment.video_id,
            content: editComment
        }
        dispatch(commentActions.editCommentThunk(payload, comment.id))
        window.alert('succcessfully edited comment!')
    }

    const handleLike = () => {
        if (!user) {
            alert('You must be logged in first')
        } else {
            if (userCmtDislike.length) {
                dispatch(commentActions.updateDisLikes(user.id, commentId, comment.video_id))
                dispatch(commentActions.updateLikes(user.id, commentId, comment.video_id))
            }
            else {
                dispatch(commentActions.updateLikes(user.id, commentId, comment.video_id))
            }
        }
    }

    const handleDislike = () => {
        if (!user) {
            window.alert('You must be logged in first')
        } else {
            if (userCmtLike.length) {
                dispatch(commentActions.updateLikes(user.id, commentId, comment.video_id))
                dispatch(commentActions.updateDisLikes(user.id, commentId, comment.video_id))
            } else {
                dispatch(commentActions.updateDisLikes(user.id, commentId, comment.video_id))
            }
        }

    }

    const handleCancel = async () => {
        setIsEditing(false)
    }

    const handleEditCmt = () => {
        setClickOptBtn((prev) => !prev)
    }

    return (
        <>
            <div>
                <div className="single-comment-container">
                    <div className="single_cmt_side_divider">
                        <>
                            <div className="cmt_left">
                                <NavLink to={`/users/${comment.user.id}`}>
                                    {
                                        comment.user.profile_pic ? (
                                            <div>
                                                <img className='cmt_pf_pic' src={comment.user.profile_pic}></img>
                                            </div>
                                        ) : (
                                            <div style={{
                                                backgroundColor: getBackgoundColor(), height: '40px',
                                                width: '40px', borderRadius: '50%', display: 'flex', justifyContent: 'center',
                                                alignItems: 'center', fontWeight: 'bold'
                                            }}>
                                                {getInitials(comment.user.firstname, comment.user.lastname)}
                                            </div>
                                        )

                                    }
                                </NavLink>
                            </div>
                            <div className="cmt_right">
                                <div className="cmt-info-wrapper">
                                    <div id='cmt-username'>@{comment.user.username}</div>
                                    <div className="cm-fineprint">{elapsed}</div>
                                </div>
                                <div className="cmt-content-wrapper">


                                    {isEditing &&



                                        <div className="cmt_editing_container">
                                            <form onSubmit={handleSubmit}>
                                                <div className="leave-cm-container"></div>
                                                <input
                                                    type="text"
                                                    value={editComment}
                                                    onChange={(e) => setEditComment(e.target.value)}
                                                    required
                                                    className="comment-textarea"

                                                />
                                                <button className="is-ce-button" type="submit">Submit</button>
                                                <button className="is-ce-button" type="button" onClick={handleCancel}>Cancel</button>
                                            </form>
                                        </div>

                                    }



                                    {!isEditing &&
                                        <div id='comment-content'>{comment.content}</div>

                                    }

                                    {!isEditing &&

                                        <div className="s-ce-buttons">
                                            {isCurrenCmtOwner &&
                                                <img id='cmt-morevert' src={morevert} onClick={handleEditCmt} />
                                            }
                                            {
                                                clickOptBtn &&
                                                <div className="edit-cmt-container" ref={dropDownRef}>
                                                    <div className="edit-cmt-col" onClick={handleEdit}><img className="edit-pic" src={editpic}></img>
                                                        <div id='edit-cmt-edit'>Edit</div>
                                                    </div>
                                                    <DeleteCommentModal comment={comment} />
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                                <div className="cmt-likebtn-wrapper">
                                    <div className="cmt-likebtn-container">
                                        <img onClick={handleLike} className="cmt-like-bttn" src={thumbup}></img><div>{comment.likes.length ? comment.likes.length : ''}</div>
                                    </div>
                                    <div className="cmt-likebtn-container">
                                        <img onClick={handleDislike} className="cmt-like-bttn" src={thumbdown}></img><div>{comment.dislikes.length ? comment.dislikes.length : ''}</div>
                                    </div>
                                </div>
                            </div>
                        </>
                    </div>
                    {/* {
                        isCurrenCmtOwner &&
                        <>

                        </>
                    } */}
                </div>
            </div>
        </>
    )
}

export default CommentCard
