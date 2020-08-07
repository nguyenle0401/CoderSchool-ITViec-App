import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./pages/Login";
import Jobs from "./pages/Jobs";
import Detail from "./pages/Detail";
import { useSelector } from "react-redux"
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useHistory } from "react-router-dom";

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  let history = useHistory();
  const ProtectedRoute = (props) => {

    if (isAuthenticated === true) {
      return <Route {...props} />;
    } else {
      console.log("im here");
      return <Redirect to="/login" />;
    }
  };
  const FourOhFourPage = () => {
    return (
      <div>
        <h1>404 Not Found</h1>
      </div>
    );
  };

  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Jobs} />
        <Route exact path="/login" component={Login} />
         <ProtectedRoute
          path="/jobs/:id"
          render={(props) => <Detail jobtitle="haha" {...props} />}
        /> 
            <Route path="/jobs" component={Jobs} />
        <Route path="*" component={FourOhFourPage} />
      </Switch>
    </div>
  );
}

export default App;
