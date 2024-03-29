import { Link, NavLink } from "react-router-dom";
import profilepic from './pp.jpg'
import verified from './verified.png'


export const getInitials = (firstName) => {
  return `${firstName?.[0].toUpperCase()}`
}

export const getBackgoundColor = () => {
  const colors = ['#32681f', '#aa47bd', '#bf360d', '#004c3e', '#00579c', '#679f39', '#ef6c00']
  const randomIdx = Math.floor(Math.random() * colors.length)
  const color = colors[randomIdx]
  return color
}

const VideoCard = ({ video }) => {
  let end = new Date();
  let start = new Date(new Date(video.created_at).toLocaleString('en-US', { timeZone: "UTC" }));
  // let start = new Date(video.created_at)
  let elapsed = ((end - start));

  let isDefaultPfp = video.user.profile_pic.startsWith('#')

  console.log('colorcolorcolorcolorcolor', video.user.profile_pic.startsWith('#'))

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


  return (
    <>
      <div className="video-card-container">
        <div>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/videos/${video.id}`}
          >
            {/* <video className="video-box" controls width="350">
              <source src={video.url}></source>
            </video> */}
            <img className="video-box" src={video.thumbnail} />
          </Link>
        </div>
        <div className="video-card-info">
          <NavLink style={{ textDecoration: "none", color: "black" }}
            to={`users/${video.user.id}`}
          >

            {
              isDefaultPfp?

              <div className="pfp_default" style={{backgroundColor: `${video.user.profile_pic}`}}>
                {getInitials(video.user.firstname)}
              </div>:
                <img className="vid-card-img" src={video.user.profile_pic} />
            }
          </NavLink>

          <div className="vid-info-right">
            <NavLink to={`/videos/${video.id}`}>
              <div className="video-title">{video.title}</div>
            </NavLink>
            <NavLink to={`/users/${video.user.id}`}>
              <div className="vid_card_name_wrapper">
                <div>{video.user.firstname} {video.user.lastname}</div>
                <img id='verified_check' src={verified} />
              </div>
            </NavLink>
            <div className="time-elapsed">{elapsed}</div>
          </div>

        </div>
      </div>
    </>
  );
};

export default VideoCard;
