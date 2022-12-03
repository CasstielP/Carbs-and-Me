import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  let end = new Date();
  let start = new Date(video.created_at);

  let elapsed = ((end - start)-(28800000));
  if(elapsed < 60000) {
    elapsed = `few seconds ago`
}
  if(60000 <= elapsed && elapsed < 3600000) {
    elapsed = ((end - start)-(28800000))/1000/60
    elapsed = elapsed===1 ? `${elapsed.toFixed()} minute ago` : `${elapsed.toFixed()} minutes ago`
  }
  if (3600000 <= elapsed && elapsed <86400000) {
    elapsed = ((end - start)-(28800000))/1000/60/60
    elapsed = elapsed===1 ? `${elapsed.toFixed()} hour ago` : `${elapsed.toFixed()} hours ago`
  }
 if( elapsed >= 86400000) {
    elapsed = ((end - start)-(28800000)) / 1000 / 60 / 60/24
    elapsed = elapsed===1 ? `${elapsed.toFixed()} day ago` : `${elapsed.toFixed()} days ago`
}
  return (
    <>
      <div className="video-card-container">
        <div>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/videos/${video.id}`}
          >
            <video className="video-box" controls width="350">
              <source src={video.url}></source>
            </video>
          </Link>
        </div>
        <div className="video-card-info">
          <div className="video-title">{video.title}</div>
          <div className="time-elapsed">{elapsed}</div>
          <div className="auth-button">
          {/* <button>Edit</button>
          <button>Delete</button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
