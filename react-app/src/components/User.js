import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import * as videoActions from "../store/video";
import UserVideoCard from "./videos/userVideoCard";
import VideoCard from "./videos/videoCard";
import CommentCard from "./comments/commentCard";
import * as commentActions from '../store/comment'
import banner from './banner.jpg'
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

      <div className="video-container">
      <img id='banner' src={banner}></img>
      {/* <div>
      <NavLink to="/upload" exact={true} activeClassName="active">
              Upload Video
            </NavLink>
      </div> */}
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
