import React, { useState, useEffect } from "react";
import { NavLink, Button, Form } from "react-bootstrap";
import Moment from "react-moment";
import { useHistory, useLocation } from "react-router-dom";
import CircleLoader from "react-spinners/CircleLoader";

const apiAdress = process.env.REACT_APP_SERVER_URL;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Jobs() {
  let query = useQuery();
  let [jobList, setJobList] = useState([]);
  let [keyword, setKeyword] = useState(query.get("q"));
  let [originalList, setOriginalList] = useState([]);
  let history = useHistory();

  const getData = async () => {
    try {
      let url = `${apiAdress}/jobs`;
      console.log("url", url);
      let respone = await fetch(url);
      let result = await respone.json();
      setJobList(result);
      setOriginalList(result)
    } catch (err) {
      console.log("err", err.message);
    }
  };

  const searchByKeyword = (e) => {
    let filteredList = originalList;
    if (e) {
      e.preventDefault();
      console.log("keyword?", keyword);
      if (keyword !== '') history.push(`/jobs?q=${keyword}`)
      else history.push('/jobs')
    }

    if (keyword) {
      filteredList = originalList.filter((job) =>
        job.title.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    setJobList(filteredList);
  };

  const getDetail = (id) => {
    history.push(`/jobs/${id}`);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    searchByKeyword();
  }, [originalList]);



  const [loading, setLoading] = useState(false);

  if (jobList.length === 0) {
    return (
      <div className="sweet-loading style-loading">
        <CircleLoader
        //   css={overide}
          size={150}
          color={"green"}
          loading={loading}
        />
      </div>
    );
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

          <Form onSubmit={(e) => searchByKeyword(e)}>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button variant = "danger" type="submit" className = "mr-1">Search</Button>
          </Form>
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
                <img src={job.img} width="100px" />
                <div className="media-body mt-2 style-jobtitle">
                  <h3 className="title" onClick={() => getDetail(job.id)}>
                    {job.title}
                    <span className = "ml-3">
                    {job.isHotjob === true ? (
                    <Button variant="warning" className="">
                      Hot Job
                    </Button>
                  ) : (
                    ""
                  )}
                    </span>
                  </h3>
                  
                  <h5 className="d-flex align-items-start text-success ml-5">
                    {job.salary}$
                  </h5>
                  <span>
                    <h6 className="d-flex align-items-start ml-5 text-muted">
                      {job.city}
                    </h6>
                    <h6 className="d-flex align-items-start ml-5">Benefits:</h6>
                    <h6 className = "hihi">
                      <ul>
                        {job.benefits.map((benifit, indexBenifit) => (
                          <li>{benifit}</li>
                        ))}
                      </ul>
                    </h6>
                    <div className="content-footer d-flex align-items-start">
                      {job.tags.map((label) => (
                        <span
                          className="badge badge-secondary mr-2"
                          color={label.color}
                          key={label.id}
                        >
                          {label}
                        </span>
                      ))}
                    </div>

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
