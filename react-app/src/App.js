import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/navigation/index';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import UploadVideo from './components/UploadPage';
import VideoList from './components/videos';
import VideoDetailPage from './components/videos/videoDetailPage';
import EditVideoPage from './components/editVideo';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const [showSideBar, setShowSideBar] = useState(true)



  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar showSideBar={showSideBar} setShowSideBar={setShowSideBar}/>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm showSideBar={showSideBar} setShowSideBar={setShowSideBar}/>
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm showSideBar={showSideBar} setShowSideBar={setShowSideBar}/>
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User showSideBar={showSideBar} setShowSideBar={setShowSideBar}/>
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <VideoList showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
        </Route>
        <Route path='/upload' exact={true}>
          <UploadVideo showSideBar={showSideBar} setShowSideBar={setShowSideBar}/>
        </Route>
        <Route path='/videos/:videoId' exact={true}>
          <VideoDetailPage showSideBar={showSideBar} setShowSideBar={setShowSideBar}/>
        </Route>
        {/* <Route path='/edit/videos/:videoId'>
          <EditVideoPage />
        </Route> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
