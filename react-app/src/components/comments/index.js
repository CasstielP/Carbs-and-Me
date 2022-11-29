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
  if(video.user_id === user.id) isCurrenOwner = true
  const [comment, setComment] = useState('')

  useEffect(() => {
    dispatch(commentActions.fetchAllComments(video.id));
  }, [dispatch, video.id]);

  const payload = {
    user_id: user.id,
    video_id: video.id,
    content: comment
  }

  const handleSubmit= async(e)=> {
    e.preventDefault();
    const newComment = await dispatch(commentActions.createCommentThunk(payload))
    .then((newComment)=> {
        if(newComment) window.alert('thank you for your feedback')
    })
  }


  return (
    <>
      <div>Comment List</div>
      <div className="comment-container">
        {!isCurrenOwner && user &&
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
        {videoComments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  );
};

export default CommentList;
