import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink, Link } from "react-router-dom";
import * as videoActions from "../store/video";
import UserVideoCard from "./videos/userVideoCard";
import VideoCard from "./videos/videoCard";
import CommentCard from "./comments/commentCard";
import * as commentActions from '../store/comment'
import banner from './banner.jpg'
import SideBar from "./sideBar";
import './user.css'
import verified from './videos/verified.png'
import profilepic from './videos/pp.jpg'
import EditVideoModal from "./editVideo/EditVideoModal";
import DeleteVideoModal from "./deleteVideo/deleteVideoModal";
import { getBackgoundColor, getInitials } from "./videos/videoCard";
import { toggleSubcription, checkSubStatus, getSingleUserThunk } from "../store/session";
function User({ showSideBar, setShowSideBar }) {
  // const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector(state => state.session.user)
  const isOwner = userId == user.id
  // const [subStatus, setSubStatus] = useState(null)
  const subStatus = useSelector(state=> state.session.subStatus)
  const userVideos = useSelector(state => (state.video.userVideos));
  // const allVidArr = Object.values(allVideos)
  const [isLoaded, setIsLoaded] = useState(false)
  const singleVideo = useSelector(state => state.video.singleVideo)
  // const userVideos = allVidArr.filter(video => video.user_id == userId);


  useEffect(() => {
    dispatch(videoActions.fetchUserVideos(userId))
    dispatch(getSingleUserThunk(userId))
  }, []);

  const handleSubscription = () =>{
    dispatch(toggleSubcription(userId))
    // console.log('substaatussubstaatussubstaatussubstaatus', subStatus)
  }


  const calVideoPostTime = (video) => {

    let end = new Date();
    let start = new Date(new Date(video.created_at).toLocaleString('en-US', { timeZone: "UTC" }));
    // let start = new Date(video.created_at)


    let elapsed = ((end - start));

    if (elapsed < 60000) {
      elapsed = `few seconds ago`
    }
    if (elapsed >= 60000 && elapsed < 3600000) {
      elapsed = ((end - start)) / 1000 / 60
      elapsed = elapsed < 2 ? `1 minute ago` : `${elapsed.toFixed()} minutes ago`
    }
    if (3600000 <= elapsed && elapsed < 86400000) {
      elapsed = ((end - start)) / 1000 / 60 / 60
      elapsed = elapsed < 2 ? `1 hour ago` : `${elapsed.toFixed()} hours ago`
    }
    if (elapsed >= 86400000) {
      elapsed = ((end - start)) / 1000 / 60 / 60 / 24
      if (elapsed >= 365.25) {
        elapsed /= 365.25 //convert to years
        elapsed = elapsed < 2 ? `${elapsed.toFixed()} year ago` : `${elapsed.toFixed()} years ago`
      } else {
        elapsed = elapsed < 2 ? `${elapsed.toFixed()} day ago` : `${elapsed.toFixed()} days ago`
      }
    }
    return elapsed
  }


  useEffect(()=> {
    dispatch(checkSubStatus(userId))
    console.log('useeffectuseeffectuseeffectuseeffectuseeffect', subStatus)
  }, [userId, dispatch])


  return (
    <>
      <div id='up-sb-wrapper'>
        <SideBar showSideBar={showSideBar} />
        <div className="video-container">
          <div className="profile-page">
            <img id='banner' src={banner}></img>

            <div className="channel_info_container">

            <div className="info_box_ls">

            </div>
            <div className="info_box_rs">
            <button onClick={handleSubscription}>{subStatus? 'subscribe' : 'subscribed!!'}</button>

            </div>
            </div>



            <div className="pf_pg_video_card_wrapper">
              {Object.values(userVideos).reverse().map((video) => (
                <div className="pf_pg_video_card_container" key={video.id} video={video}>
                  <NavLink
                    style={{ textDecoration: "none", color: "black" }}
                    to={`/videos/${video.id}`}
                  >
                    <img id="pf_pg_video_thumbnail" src={video.thumbnail} />
                  </NavLink>
                  <div className="video-card-info">

                    {/* <img className="vid-card-img" src={profilepic} ></img> */}

                    {
                video.user.profile_pic ? (
                  <img className="vid-card-img" src={video.user.profile_pic} ></img>

                ) : (
                  <div style={{backgroundColor: getBackgoundColor(), height: '40px',
                  width: '40px', borderRadius: '50%', display: 'flex', justifyContent: 'center',
                  alignItems: 'center', fontWeight: 'bold'}}>
                    {getInitials(video.user.firstname, video.user.lastname)}
                  </div>
                )
              }

                    <div className="vid-info-right">
                      <div className="video-title">{video.title}</div>
                      <div className="vid_card_name_wrapper">
                        <div>{video.user.firstname} {video.user.lastname}</div>
                        <img id='verified_check' src={verified} />
                      </div>
                      <div className="time-elapsed" video={video}>{calVideoPostTime(video)}</div>
                    </div>
                  </div>
                  { isOwner &&
                    <div className="auth-button">
                      <EditVideoModal videoId={video.id} />
                      {/* <button>Delete</button> */}
                      <DeleteVideoModal videoId={video.id} />
                    </div>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
export default User;
