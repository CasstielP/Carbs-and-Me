import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  let end = new Date();
  let end2 =  Date.now();

  // console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww', end)
  // console.log('dddddddddddddddddddddddddddddddddddddddd', end2)
  // console.log('dddddddddddddddddddddddddddddddddddddddd', end2-video.created_at)
  // console.log('//////////////////////', video.created_at)
  // console.log('===================', new Date(video.created_at))
  let start = new Date(video.created_at);
  let test  = end - start
  console.log('ppppppppppppppppppp', test)
  let elapsed = ((end - start)-(28800000));
  if(elapsed <= 0) {
    elapsed = 'this is strange'
  }
  if(elapsed < 60000 && elapsed >0) {
    elapsed = `few seconds ago`
}
  if(elapsed >= 60000   && elapsed < 3600000) {
    elapsed = ((end - start)-(28800000))/1000/60
    elapsed = elapsed<2 ? `1 minute ago` : `${elapsed.toFixed()} minutes ago`
  }
  if (3600000 <= elapsed && elapsed <86400000) {
    elapsed = ((end - start)-(28800000))/1000/60/60
    elapsed = elapsed<2 ? `1 hour ago` : `${elapsed.toFixed()} hours ago`
  }
 if( elapsed >= 86400000) {
    elapsed = ((end - start)-(28800000)) / 1000 / 60 / 60/24
    elapsed = elapsed<2 ? `${elapsed.toFixed()} day ago` : `${elapsed.toFixed()} days ago`
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
