import homefill from './home_FILL1.png'
import linkedin from './linkedin.png'
import github from './github.png'
const SideBar = ({showSideBar}) => {

    return (
        <>
        {showSideBar &&
        <div className="side-bar">
            <div className="sb-content">
                <div className='sb-home-wrapper'>
                    <img className='sb-home'  src={homefill}></img>
                    <div className='sb-home-txt'>Home</div>
                </div>
                <div className='sb-home-wrapper'>
                    <img className='sb-home' id='linkedin' src={linkedin}></img>
                    <div className='sb-home-txt'>LinkedIn</div>
                </div>
                <div className='sb-home-wrapper'>
                    <img className='sb-home' id='github' src={github}></img>
                    <div className='sb-home-txt'>GitHub</div>
                </div>
                <div className='line-break-sb'></div>
            </div>
        </div>
        }
        </>
    )
}



export default SideBar
