import React, {useState} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Jobs from "./pages/Jobs";
import Detail from "./pages/Detail";
import { Switch, Route, Redirect, Link } from "react-router-dom";


function App() {
  let [user, setUser] = useState({ isAuthenticated: true});
  const ProtectedRoute = (props) => {
      if(user.isAuthenticated === true){
        return <Route {...props}/>
      }else{
        console.log("im here");
        return <Redirect to ="/login" />
      }
  }

  return (
    <div className="App">
      <Link to="/jobs">Click here to go to Jobs</Link>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/login" component={Login}/>
        <Route exact path="/jobs" component={Jobs} />

        {/* <Route 
        exact 
        path="/jobs/:id" 
        render = {(props) => <Detail jobtitle = "haha" props = {props}/>}/> */}

        <ProtectedRoute
          path="/jobs/:id" 
          render = {(props) => <Detail jobtitle = "haha" {...props}/>}
        />

      </Switch>
    </div>
  );
}

export default App;

