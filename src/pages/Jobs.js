import React, { useState, useEffect } from "react";
import { NavLink, Button } from "react-bootstrap";
import Moment from "react-moment";
import { useHistory, useLocation, useParams } from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";
import jobs6 from "../db.json";

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
  console.log(originalJobs);
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
  };

  const handleSearch = (e) => {
    setSearching(true);
    let filteredJobs = originalJobs;
    if (e) {
      e.preventDefault();
      history.push(`/jobs/?${QUERYSTR_PREFIX}=${encodeURIComponent(keyword)}`);
    }
    if (keyword) {
      filteredJobs = originalJobs.filter((job) =>
        job.title.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    console.log(filteredJobs);
    setJobList(filteredJobs);
    setTimeout(() => setSearching(false), 5);
  };

  const getDetail = (id) => {
    history.push(`/jobs/${id}`);
  };

  useEffect(() => {
    getData();
  }, []);
  const [loading, setLoading] = useState(false);
  
  if (jobList.length === 0) {
    return    <div className="sweet-loading style-loading">
    <CircleLoader
    //   css={overide}
      size={150}
      color={"green"}
      loading={loading}
    />
  </div>
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

          <input
            className="ml-2 mr-1 m"
            type="text"
            onChange={(e) => inputChange(e.target.value)}
          ></input>
          <Button
            className="mr-1 m"
            variant="danger"
            onClick={(e) => handleSearch(e)}
          >
            Search
          </Button>
          <NavLink className="btn btn-outline-danger my-2 my-sm-0" to="/login">
            Sign Out
          </NavLink>
        </div>
      </nav>

      <ul className="list-group">
        {jobList.map((job) => {
          return (
            <li className="list-group-item style-card" key={job.id}>
              <div className="media">
                <img src={job.img} width="200px" />
                <div className="media-body d-flex flex-column align-items-start justify-content-around mt-2">
                  <h3 className="title" onClick={() => getDetail(job.id)}>
                    {job.title}
                  </h3>
                  {job.isHotjob === true ? (
                    <Button variant="warning" className="ml-auto">
                      Hot Job
                    </Button>
                  ) : (
                    ""
                  )}
                  <h5 className="d-flex align-items-start text-success ml-5">
                    {job.salary}$
                  </h5>
                  <span>
                    <h6 className="d-flex align-items-start ml-5 text-muted">
                      {job.city}
                    </h6>
                    <h6 className="d-flex align-items-start ml-5">Benefits:</h6>
                    <h6>
                      {" "}
                      <ul>
                        {job.benefits.map((benifit, indexBenifit) => (
                          <li>{benifit}</li>
                        ))}
                      </ul>
                    </h6>

                    <div className="d-flex align-items-start style-login  ml-5">
                      <span className="ml-auto text-primary ">
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
