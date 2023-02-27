import { Link, NavLink } from "react-router-dom";


const FeedVideoCard = ({video}) => {
    let end = new Date();
    let start = new Date(new Date(video.created_at).toLocaleString('en-US', { timeZone: "UTC" }));
    // let start = new Date(video.created_at)


    let elapsed = ((end - start));

    if(elapsed < 60000) {
      elapsed = `few seconds ago`
  }
    if(elapsed >= 60000   && elapsed < 3600000) {
      elapsed = ((end - start))/1000/60
      elapsed = elapsed<2 ? `1 minute ago` : `${elapsed.toFixed()} minutes ago`
    }
    if (3600000 <= elapsed && elapsed <86400000) {
      elapsed = ((end - start))/1000/60/60
      elapsed = elapsed<2 ? `1 hour ago` : `${elapsed.toFixed()} hours ago`
    }
   if( elapsed >= 86400000) {
      elapsed = ((end - start)) / 1000/60/60/24
      elapsed = elapsed<2 ? `${elapsed.toFixed()} day ago` : `${elapsed.toFixed()} days ago`
  }
    return (
        <>
        <div className="feed-vid-card">
                {/* <NavLink style={{ textDecoration: "none", color: "black" }}
            to={`/videos/${video.id}`} reloadDocument> */}
            <a href= {`/videos/${video.id}`}>
            <img className="feed-video-box" src={video.thumbnail} />
            </a>
                {/* </NavLink> */}
            <div className="feed-vid-info">
                <div id='feed-vid-title'>{video.title}</div>
                <div className="vid-btm-info"></div>
                <div id='feed-vid-owner'>{video.user.firstname} {video.user.lastname}</div>
                <div id='feed-vid-time'>{elapsed}</div>
            </div>
            </div>
        </>
    )
}

export default FeedVideoCard
