import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as videoActions from "../store/video";
import VideoCard from "./videos/videoCard";
function User() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const { userId } = useParams();
  const allVideos = useSelector((state) =>
    Object.values(state.video.allVideos)
  );
  const userVideos = allVideos.filter((video) => video.userId === userId);
  console.log("fasdfasfdasdfasdfasdf", allVideos);
  useEffect(() => {
    dispatch(videoActions.fetchAllVideos());
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [dispatch, userId]);

  if (!user) {
    return null;
  }

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
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </>
  );
}
export default User;
