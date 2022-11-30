import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as commentActions from "../../store/comment";
import { useHistory, Link } from "react-router-dom";
import CommentCard from "./commentCard";

const CommentList = ({ video }) => {
  const videoComments = useSelector((state) =>
    Object.values(state.comment.videoComments)
  );
  let isCurrenOwner = false
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [comment, setComment] = useState('')
  const [isopen, setIsOpen] = useState(true)
  let userId;
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
    await dispatch(commentActions.createCommentThunk(payload))
    window.alert('thank you for your feedback')

  }


  return (
    <>
      <div>Comment List</div>
      <div className="comment-container">
        {!isCurrenOwner &&
        user &&
          <div>
            <h2>Comments</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
            <button type="submit">Submit</button>
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
