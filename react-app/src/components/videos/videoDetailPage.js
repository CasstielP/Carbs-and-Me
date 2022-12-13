import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as videoActions from "../../store/video";
import { useHistory, Link, useParams } from "react-router-dom";
import VideoCard from "./videoCard";
import CommentList from "../comments";
import SideBar from "../sideBar";
import thumbup from './thumb_up.png'
import thumbdown from './thumb_down.png'
const VideoDetailPage = ({showSideBar, setShowSideBar}) => {
  const { videoId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state=> state.session.user)
  const video = useSelector(state=> state.video.singleVideo);
  console.log(video.likes)
  const curUserLike = video?.likes?.filter(like=> like.userId == user.id)
  const curUserDisLike = video?.dislikes?.filter(dislike=> dislike.userId == user.id)
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    dispatch(videoActions.fetchSingleVideo(videoId))
    .then(()=>{
      setIsLoaded(true)
    })
  }, [dispatch, videoId]);

  const handleLike = () => {
    if(!user) {
      alert('You must be logged in first')
    } else {
      if(curUserDisLike.length){
        dispatch(videoActions.updateDisLikes(user.id, videoId))
        dispatch(videoActions.updateLikes(user.id, videoId))
      }else{
        dispatch(videoActions.updateLikes(user.id, videoId))
      }
    }
  }

  const handleDislike = () => {
    if(!user){
      window.alert('You must be Logged in first')
    } else {
      if(curUserLike.length){
        dispatch(videoActions.updateLikes(user.id, videoId))
        dispatch(videoActions.updateDisLikes(user.id, videoId))
      } else {
        dispatch(videoActions.updateDisLikes(user.id, videoId))
      }
    }
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
        <div className="like-btn-wrapper">
        <button onClick={handleLike} className="like-bttn"><img id='thumb-up' src={thumbup}></img>{video?.likes?.length}k</button>
        <button onClick={handleDislike} className="like-bttn"><img src={thumbdown} id='thumb-down'></img>{video?.dislikes?.length}</button>
        </div>
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
