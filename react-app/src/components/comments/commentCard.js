import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as commentActions from '../../store/comment'
import DeleteCommentModal from "../deleteComment/deleteCommentModal"
import thumbup from '../videos/thumb_up.png'
import thumbdown from '../videos/thumb_down.png'
import morevert from './more_vert.png'
import editpic from './edit.png'

const CommentCard = ({comment}) => {
const user = useSelector(state=> state.session.user)
const allUserComments = useSelector(state=>state.comment.userComments)
let commentId = comment.id
const [clickOptBtn, setClickOptBtn] = useState(false)
const allVideoComments = useSelector(state=> state.comment.videoComments)
let isCurrenOwner = false
let end = new Date();
let start = new Date(new Date(comment.created_at).toLocaleString('en-US', { timeZone: "UTC" }));
// let start = new Date(comment.created_at)


let elapsed = ((end - start));

  if(elapsed < 60000) {
    elapsed = `few seconds ago`
}
  if(elapsed >= 60000   && elapsed < 3600000) {
    elapsed = ((end - start))/1000/60
    elapsed = elapsed<2 ? `1 minute ago` : `${elapsed.toFixed()} minutes ago`
  }
  if (3600000 <= elapsed && elapsed <86400000) {
    elapsed = ((end - start))/1000/60/60
    elapsed = elapsed<2 ? `1 hour ago` : `${elapsed.toFixed()} hours ago`
  }
 if( elapsed >= 86400000) {
    elapsed = ((end - start)) / 1000/60/60/24
    elapsed = elapsed<2 ? `${elapsed.toFixed()} day ago` : `${elapsed.toFixed()} days ago`
}

if(user) {
      if(comment.user_id === user.id) isCurrenOwner = true
}
const [isEditing, setIsEditing] = useState(false)
const [editComment, setEditComment] = useState('')
const dispatch = useDispatch()

useEffect(()=> {
    // dispatch(commentActions.fetchAllComments(comment.video_id))
    setEditComment(comment.content)
},[dispatch, comment.content, comment.video_id])

const handleEdit = async()=> {
    setIsEditing(true)
    // dispatch(commentActions.fetchSingleComment())
    setEditComment(comment.content)
}

const handleSubmit = async() => {
    console.log('qqqqqqqqqqqqqqqqqqqqqqq', comment.id)
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
    dispatch(commentActions.updateLikes(user.id, commentId))
}

const handleCancel = async() => {
    setIsEditing(false)
}

const handleEditCmt = () => {
    if(clickOptBtn) setClickOptBtn(false)
    else setClickOptBtn(true)
}

    return (
        <>
        <div>
            <div className="single-comment-container">

            { !isEditing &&
            <>
            <div className="cmt-info-wrapper">
            <div id='cmt-username'>{comment.user.firstname}</div>
            <div className="cm-fineprint">{elapsed}</div>
            </div>
            <div className="cmt-content-wrapper">
            <div id='comment-content'>{comment.content}</div>
            <div className="s-ce-buttons">
             <img id='cmt-morevert' src={morevert} onClick={handleEditCmt}/>
             {
                clickOptBtn &&
            <div className="edit-cmt-container">
            <div className="edit-cmt-col" onClick={handleEdit}><img className="edit-pic" src={editpic}></img>
                <div id='edit-cmt-edit'>Edit</div>
            </div>
            <DeleteCommentModal comment={comment}/>
             </div>
             }
            </div>
            </div>
            <div className="cmt-likebtn-wrapper">
                <div className="cmt-likebtn-container">
                    <img onClick={handleLike} className="cmt-like-bttn" src={thumbup}></img><div>{comment.likes.length}k</div>
                </div>
                <img className="cmt-like-bttn" src={thumbdown}></img>
            </div>
            </>
            }
            { isEditing &&
            <div>
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
        {
            isCurrenOwner &&
            <>

            </>
        }
            </div>
        </div>
        </>
    )
}

export default CommentCard
