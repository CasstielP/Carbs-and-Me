import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as videoActions from "../store/video";
import UserVideoCard from "./videos/userVideoCard";
import VideoCard from "./videos/videoCard";
function User() {
  // const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector(state=>state.session.user)
  const allVideos = useSelector((state) =>(state.video.allVideos));
  const allVidArr = Object.values(allVideos)
  const [isLoaded, setIsLoaded] = useState(false)
  const userVideos = allVidArr.filter(video => video.user_id == userId);

  useEffect(() => {
    dispatch(videoActions.fetchAllVideos())
  }, [dispatch]);





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

      <div className="video-container">
        {userVideos.map((video) => (
          <UserVideoCard key={video.id} video={video} />
        ))}
      </div>
    </>
  );
}
export default User;
