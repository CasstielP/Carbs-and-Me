import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import * as videoActions from "../store/video";
import UserVideoCard from "./videos/userVideoCard";
import VideoCard from "./videos/videoCard";
import CommentCard from "./comments/commentCard";
import * as commentActions from '../store/comment'
import banner from './banner.jpg'
import SideBar from "./sideBar";
function User({showSideBar, setShowSideBar}) {
  // const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector(state=>state.session.user)
  const userVideos = useSelector(state =>(state.video.userVideos));
  // const allVidArr = Object.values(allVideos)
  const [isLoaded, setIsLoaded] = useState(false)
  const singleVideo = useSelector(state=>state.video.singleVideo)
  // const userVideos = allVidArr.filter(video => video.user_id == userId);
  useEffect(() => {
    dispatch(videoActions.fetchUserVideos(userId))
  }, []);





  return (
    <>
    <div id='up-sb-wrapper'>
      <SideBar showSideBar={showSideBar}/>
      <div className="video-container">
      <img id='banner' src={banner}></img>
        {Object.values(userVideos).reverse().map((video) => (
          <UserVideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>

    </>
  );
}
export default User;
