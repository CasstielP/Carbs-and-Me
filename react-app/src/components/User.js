import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import * as videoActions from "../store/video";
import UserVideoCard from "./videos/userVideoCard";
import VideoCard from "./videos/videoCard";
import CommentCard from "./comments/commentCard";
import * as commentActions from '../store/comment'
function User() {
  // const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector(state=>state.session.user)
  const userVideos = useSelector(state =>Object.values(state.video.userVideos));
  // const allVidArr = Object.values(allVideos)
  const [isLoaded, setIsLoaded] = useState(false)
  // const userVideos = allVidArr.filter(video => video.user_id == userId);
  const userComments = useSelector(state=>Object.values(state.comment.userComments))
  useEffect(() => {
    dispatch(videoActions.fetchUserVideos(userId))
    dispatch(commentActions.fetchUserComments(userId))
  }, [dispatch, userId]);





  return (
    <>
      <ul>
        <li>
          <strong>User Id</strong> {userId}
        </li>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
      </ul>
      <button>
      <NavLink to="/upload" exact={true} activeClassName="active">
              Upload Video
            </NavLink>
      </button>

      <div className="video-container">
        {userVideos.map((video) => (
          <UserVideoCard key={video.id} video={video} />
        ))}
      </div>
      {/* <div>
        <h2>Comments</h2>
        {userComments.reverse().map((comment)=> (
          <CommentCard key={comment.id} comment={comment}/>
        ))}

      </div> */}

    </>
  );
}
export default User;
