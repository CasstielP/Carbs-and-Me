import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as videoActions from "../../store/video";
import { useHistory, Link, useParams } from "react-router-dom";
import VideoCard from "./videoCard";
import CommentList from "../comments";
import SideBar from "../sideBar";

const VideoDetailPage = ({showSideBar, setShowSideBar}) => {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const video = useSelector(state=> state.video.singleVideo);
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    dispatch(videoActions.fetchSingleVideo(videoId))
    .then(()=>{
      setIsLoaded(true)
    })
  }, [dispatch, videoId]);

  if(isLoaded) {
    return (
      <>
      <div id='vdp-wrapper'>
      <SideBar showSideBar={showSideBar}/>
        <div>
        <video controls width="1000">
          <source src={video.url}></source>
        </video>
        <h2>{video.title}</h2>
        <div className="vid-des">
        <p id="des-p">{video.description}</p>
        </div>

        <CommentList video={video} />
        </div>
      </div>
      </>
    );
  } else {
    return 'loading...'
  }
};

export default VideoDetailPage;
