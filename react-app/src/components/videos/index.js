import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as videoActions from '../../store/video'
import { useHistory, Link } from 'react-router-dom';
import VideoCard from './videoCard';
import './Video.css'
import SideBar from '../sideBar';
const VideoList = ({showSideBar, setShowSideBar}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const videos = useSelector(state=>Object.values(state.video.allVideos))
    const singleVid = useSelector(state=>(state.video.singleVideo))

    useEffect(()=> {
        dispatch(videoActions.fetchAllVideos())
    }, [])



    return (
        <>

        <div className='main-page-wrapper'>
            <SideBar showSideBar={showSideBar}  setShowSideBar={setShowSideBar} />
        <div className='video-container'>
            { videos.reverse().map((video)=>
                <VideoCard key={video.id} video={video} />
            )
            }
        </div>
        </div>

        </>
    )
}


export default VideoList
