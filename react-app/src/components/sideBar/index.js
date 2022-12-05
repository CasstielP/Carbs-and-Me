import homefill from "./home_FILL1.png";
import linkedin from "./linkedin.png";
import github from "./github.png";
import robinhold from "./robinhold.png";
import airbpib from "./airbpib.png";
import python from "./python.png";
import flask from "./flask.png";
import javascript from "./javascript.png";
import react from "./react.png";
import redux from "./redux.png";
import aws from "./aws.png";
import { NavLink } from "react-router-dom";

const SideBar = ({ showSideBar }) => {
  return (
    <>
      {showSideBar && (
        <div className="side-bar">
          <div className="sb-content">
            <NavLink style={{ textDecoration: "none", color: "black" }} to="/">
              <div className="sb-home-wrapper">
                <img className="sb-home" src={homefill}></img>
                <div className="sb-home-txt">Home</div>
              </div>
            </NavLink>
            <a
              href="https://www.linkedin.com/in/casstiel-pi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="sb-home-wrapper">
                <img className="sb-home" id="linkedin" src={linkedin}></img>
                <div className="sb-home-txt">LinkedIn</div>
              </div>
            </a>
            <a
              href="https://github.com/CasstielP/Captstone-Project"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="sb-home-wrapper">
                <img className="sb-home" id="github" src={github}></img>
                <div className="sb-home-txt">GitHub</div>
              </div>
            </a>

            {/* <div className='line-break-sb'></div>
                <div className='sb-sub-header'>Portfolio Projects</div>
                <div className='sb-home-wrapper'>
                <img className='sb-home' id='airbpib' src={airbpib}></img>
                <div className='sb-home-txt-1'>Airbpib</div>
                </div>
                <div className='sb-home-wrapper'>
                <img className='sb-home' id='robinhold' src={robinhold}></img>
                <div className='sb-home-txt-1'>Robinhold</div>
            </div> */}
            <div className="line-break-sb"></div>
            <div className="sb-sub-header">Technologies</div>

            <a
              href="https://www.python.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="sb-home-wrapper">
                <img className="sb-home" id="python" src={python}></img>
                <div className="sb-home-txt" id="python-t">
                  Python
                </div>
              </div>
            </a>
            <a
              href="https://flask.palletsprojects.com/en/2.2.x/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="sb-home-wrapper">
                <img className="sb-home" id="flask" src={flask}></img>
                <div className="sb-home-txt" id="flask-t">
                  Flask
                </div>
              </div>
            </a>

            <a
              href="https://developer.mozilla.org/en-US/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="sb-home-wrapper">
                <img className="sb-home" id="javascript" src={javascript}></img>
                <div className="sb-home-txt" id="javascript-t">
                  Javascript
                </div>
              </div>
            </a>
            <a
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="sb-home-wrapper">
                <img className="sb-home" id="react" src={react}></img>
                <div className="sb-home-txt" id="react-t">
                  React
                </div>
              </div>
            </a>

            <a
              href="https://redux.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="sb-home-wrapper">
                <img className="sb-home" id="redux" src={redux}></img>
                <div className="sb-home-txt" id="redux-t">
                  Redux
                </div>
              </div>
            </a>

            <a
              href="https://aws.amazon.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="sb-home-wrapper">
                <img className="sb-home" id="aws" src={aws}></img>
                <div className="sb-home-txt" id="aws-t">
                  AWS s3
                </div>
              </div>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
