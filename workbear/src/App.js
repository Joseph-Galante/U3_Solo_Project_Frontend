//=============== SETUP ===============//

// react
import { useState, useEffect, useContext } from 'react';

// react router
import { Route, Redirect } from 'react-router-dom';

// pages
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';

// components
import NavBar from './components/NavBar';
import Messages from './components/Messages';

// contexts
import { UserContext } from './contexts/UserContext';
import { MessageContext } from './contexts/MessageContext';


//=============== APP ===============//

function App() {
  // contexts
  const { userState, verifyUser } = useContext(UserContext);
  const [ user, setUser ] = userState;
  const { messageState, clearMessage } = useContext(MessageContext);
  const [ message, setMessage ] = messageState;


  // states


  // functions
  useEffect(verifyUser, []);
  useEffect(clearMessage, []);

  return (
    <div className="App">

      <NavBar />
      <Messages />

      {/* ===============  ROUTES  ===============  */}

      <Route exact path="/" render={() => <Home />} />

      <Route exact path="/signup" render={() => {if (user.id) {return <Redirect to="/profile"/>} else {return <Signup setUser={setUser}/>}}}/>

      <Route exact path="/login" render={() => {if (user.id) {return <Redirect to="/profile"/>} else {return <Login setUser={setUser}/>}}}/>

      <Route exact path="/profile" render={() => {if (user.id) {return <Profile />} else {return <Redirect to="/login"/>}}}/>

    </div>
  );
}

export default App;
