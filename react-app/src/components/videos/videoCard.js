import { Link } from "react-router-dom";


const VideoCard = ({video}) => {
    let end = new Date()
    let start = new Date(video.created_at)
    let elapsed = (end - start)/1000/60/60/24

    return(
        <>
        <Link style={{ textDecoration: "none", color: "black" }} to={`/videos/${video.id}`}>
            <div className="video-card-container">
                <video controls width='350'>
                    <source src={video.url}></source>
                </video>
                <div>{video.title}</div>
                <div>{elapsed.toFixed()} days ago</div>
            </div>
        </Link>


        </>
    )
}


export default VideoCard
