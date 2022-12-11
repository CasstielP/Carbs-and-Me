import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as videoActions from "../../store/video";
import { useHistory, Link, useParams } from "react-router-dom";
import VideoCard from "./videoCard";
import CommentList from "../comments";
import SideBar from "../sideBar";
import thumbup from './thumb_up.png'
const VideoDetailPage = ({showSideBar, setShowSideBar}) => {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state=> state.session.user)
  const video = useSelector(state=> state.video.singleVideo);
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    dispatch(videoActions.fetchSingleVideo(videoId))
    .then(()=>{
      setIsLoaded(true)
    })
  }, [dispatch, videoId]);

  const handleLike = () => {
    dispatch(videoActions.updateLikes(user.id, videoId))
  }

  if(isLoaded) {
    return (
      <>
      <div id='vdp-wrapper'>
      <SideBar showSideBar={showSideBar}/>
        <div>
        <video controls width="1000">
          <source src={video.url}></source>
        </video>
        <div className="vid-detail-header">
        <div id='vid-dh-title'>{video.title}</div>
        <button onClick={handleLike} className="like-bttn"><img id='thumb-up' src={thumbup}></img>{video?.likes?.length}k</button>
        </div>
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
