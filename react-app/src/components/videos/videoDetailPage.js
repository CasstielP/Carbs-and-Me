import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as videoActions from "../../store/video";
import { useHistory, Link, useParams } from "react-router-dom";
import VideoCard from "./videoCard";
import CommentList from "../comments";

const VideoDetailPage = () => {
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
        <h1>video detail page</h1>
        <div>
        <video controls width="1000">
          <source src={video.url}></source>
        </video>
        <div>{video.title}</div>
        </div>
        <CommentList video={video} />
      </>
    );
  } else {
    return 'loading...'
  }
};

export default VideoDetailPage;
