import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from 'Pages/Login';
import Chat from 'Pages/Chat';
import SocketTest from 'Pages/SocketTest';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/"
            // component={Login}
            render={(props) => {
              // console.log(props);
              // props.history.replace('/chat');
              return <SocketTest/>
              // return <Login />
            }}
          />
          <Route path="/chat" component={Chat} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
