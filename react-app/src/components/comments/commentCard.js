import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as commentActions from '../../store/comment'
import DeleteCommentModal from "../deleteComment/deleteCommentModal"
const CommentCard = ({comment}) => {
const user = useSelector(state=> state.session.user)
const allUserComments = useSelector(state=>state.comment.userComments)
let commentId = comment.id
const allVideoComments = useSelector(state=> state.comment.videoComments)
let isCurrenOwner = false
let end = new Date();
let start = new Date(new Date(comment.created_at).toLocaleString('en-US', { timeZone: "UTC" }));

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

const handleCancel = async() => {
    setIsEditing(false)
}

    return (
        <>
        <div>
            <div className="single-comment-container">

            { !isEditing &&
            <>
            <div className="cm-fineprint">{elapsed}</div>
            <div id='comment-content'>{comment.content}</div>
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
            <div className="s-ce-buttons">
            <button className="s-ce-button" onClick={handleEdit}>Edit</button>
            {/* <button>Delete</button> */}
            <DeleteCommentModal comment={comment}/>
            </div>
            </>
        }
            </div>
        </div>
        </>
    )
}

export default CommentCard
