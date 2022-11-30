import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as commentActions from '../../store/comment'
import DeleteCommentModal from "../deleteComment/deleteCommentModal"
const CommentCard = ({comment}) => {
const user = useSelector(state=> state.session.user)
let commentId = comment.id
// const currentComment = useSelector(state=> state.comment.singleComment)
let isCurrenOwner = false
if(user) {
      if(comment.user_id === user.id) isCurrenOwner = true
}
const [isEditing, setIsEditing] = useState(false)
const [editComment, setEditComment] = useState('')
const dispatch = useDispatch()

useEffect(()=> {
    // dispatch(commentActions.fetchSingleComment(comment.id))
    setEditComment(comment.content)
},[dispatch, comment.content])

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
}

const handleCancel = async() => {
    setIsEditing(false)
}

    return (
        <>
        <div>
            { !isEditing &&
                <div>{comment.content}</div>
            }
            { isEditing &&
            <div>
            <form onSubmit={handleSubmit}>
                <textarea
                  type="text"
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  required
                />
            <button type="submit">Submit</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
            </form>
            </div>
            }
        {
            isCurrenOwner &&
            <>
            <button onClick={handleEdit}>Edit</button>
            {/* <button>Delete</button> */}
            <DeleteCommentModal commentId={commentId}/>
            </>
        }
        </div>
        </>
    )
}

export default CommentCard
