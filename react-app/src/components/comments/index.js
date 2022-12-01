import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as commentActions from "../../store/comment";
import { useHistory, Link } from "react-router-dom";
import CommentCard from "./commentCard";
import './comment.css'
const CommentList = ({ video }) => {
  const videoComments = useSelector((state) =>
    Object.values(state.comment.videoComments)
  );
  let isCurrenOwner = false
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([])
  const user = useSelector((state) => state.session.user);
  const [comment, setComment] = useState('')
  const [isopen, setIsOpen] = useState(true)
  let userId;
  let Errors=[]
  useEffect(() => {
    dispatch(commentActions.fetchAllComments(video.id));
  }, [dispatch, video.id]);

  if(user) {
    userId = user.id
    if(video.user_id === user.id) isCurrenOwner = true

  }
  const payload = {
    user_id: userId,
    video_id: video.id,
    content: comment
  }

  const handleSubmit= async(e)=> {
    e.preventDefault();
    setComment('')
    setErrors([])
    if(!comment)Errors.push('comment cannot be empty')
    setErrors(Errors)
    if(Errors.length) return
    await dispatch(commentActions.createCommentThunk(payload))
    window.alert('thank you for your feedback')

  }


  return (
    <>
      <div className="comment-container">
        <h2>Leave your comments</h2>
        {!isCurrenOwner &&
        user &&
          <div>
            <form onSubmit={handleSubmit}>
            <div className="error-list">
        {errors.map((error, ind) => (
          <div className="error-list" key={ind}>{error}</div>
        ))}
      </div>
      <div className="leave-cm-container">

                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}

                  placeholder="add a comment..."
                  className="comment-textarea"
                />
                 <div className="line-break"></div>
            <div className="ce-buttons">
            <button className="ce-button" type="submit">Submit</button>
            <button className="ce-button" type='button' onClick={()=>setComment('')}>Cancel</button>
                </div>
      </div>

            </form>
          </div>
        }
        {videoComments.reverse().map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  );
};

export default CommentList;
