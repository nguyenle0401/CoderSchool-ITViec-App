import React, { useState, useEffect } from "react";
import { NavLink} from "react-bootstrap";
import Moment from "react-moment";
import { useHistory, useLocation, useParams } from "react-router-dom";

import jobs6 from "../db.json"

const QUERYSTR_PREFIX = "q";
const apiAdress = process.env.REACT_APP_SERVER_URL;


function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  
export default function Jobs() {
  let [jobList, setJobList] = useState([]);
  let [searching, setSearching] = useState(null);
  let history = useHistory();
  let query = useQuery();
  let originalJobs = jobs6.jobs;
  console.log(originalJobs)
  let [keyword, setKeyword] = useState(query.get(QUERYSTR_PREFIX));
//   if(keyword){
    //   if(!searching){
    //     history.push("/jobs")
    //   }
    //   else {

//   }
 
  const getData = async () => {
    try {
      let url = `${apiAdress}/jobs`;
      console.log("url", url);
      let respone = await fetch(url);
      let result = await respone.json();
      setJobList(result);
    } catch (err) {
      console.log("err", err.message);
    }
  };

  const inputChange = (value) => {
      setKeyword(value);
  }

  const handleSearch = (e) => {
    setSearching(true);
    let filteredJobs = originalJobs;
    if (e) {
      e.preventDefault();
      history.push(`/jobs/?${QUERYSTR_PREFIX}=${encodeURIComponent(keyword)}`);
    }
    if (keyword) {
      filteredJobs = originalJobs.filter(job =>
        job.title.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    console.log(filteredJobs)
    setJobList(filteredJobs);
    setTimeout(() => setSearching(false), 5);
  };

  const getDetail = (id) => {
    history.push(`/jobs/${id}`);
  };

  useEffect(() => {
    getData();
  }, []);



  if (jobList.length === 0) {
    return <h1>Loading</h1>;
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark position-fixed style-nav">
        <NavLink className="navbar-brand" to="/#">
          <img
            class="logo-itviec"
            alt="itviec"
            src="https://itviec.com/assets/logo-itviec-65afac80e92140efa459545bc1c042ff4275f8f197535f147ed7614c2000ab0f.png"
            width="108"
            height="42"
          />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item ">
              <NavLink className="nav-link style-color-nav" to="/#">
                All jobs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link style-color-nav" to="/#">
                Employers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link style-color-nav" to="/#">
                IT Companies
              </NavLink>
            </li>
          </ul>
          <NavLink className="btn btn-outline-info my-2 my-sm-0" to="/login">
            Sign In
          </NavLink>
          <NavLink
            className="btn btn-outline-info my-2 my-sm-0 ml-3"
            to="/register"
          >
            Sign Up
          </NavLink>
          <input type = "text" onChange= {(e)=> inputChange(e.target.value)}></input> 
          <button onClick = {(e)=> handleSearch(e)}>Search</button>
        </div>
      </nav>

      <ul className="list-group">
        {jobList.map((job) => {
          return (
            <li className="list-group-item style-card" key={job.id}>
              <div className="media">
                <img src={job.img} width="200px"/>
                <div className="media-body d-flex flex-column align-items-start justify-content-around mt-2">
                  <h3 className="title" onClick={() => getDetail(job.id)}>{job.title}</h3>
                  {job.isHotjob === true?
                  <h3>Hot Job</h3> : ""}
                  <h5 className="mt-0 d-flex align-items-start">
                    {job.salary}
                  </h5>
                  <span>
                    <ul className="d-flex align-items-start">
                      {job.benefits}{" "}
                    </ul>

                    <div className="d-flex align-items-start style-login mr-2">
                      <span className="ml-auto">
                        <Moment fromNow>{job.time}</Moment>
                      </span>
                    </div>
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
