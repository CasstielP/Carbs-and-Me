import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as videoActions from "../../store/video";

const VideoFeed = () => {
    const feedVids = useSelector(state=> state.video.allVideos)
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(videoActions.fetchAllVideos())
    }, [])

    return (
        <div className="feed-container"></div>

    )
}


export default VideoFeed
