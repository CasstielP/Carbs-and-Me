import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  let end = new Date();
  let start = new Date(video.created_at);
  let elapsed = (end - start) / 1000 / 60 / 60 / 24;

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
          <div className="time-elapsed">{elapsed.toFixed()} days ago</div>
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
